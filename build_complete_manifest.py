import os
import subprocess
import json
import hashlib
from PIL import Image, ImageOps
import pillow_heif
import imageio_ffmpeg

pillow_heif.register_heif_opener()

BASE_DIR = r"d:\All site\shah\public"
OUT_IMG_DIR = os.path.join(BASE_DIR, "media", "images")
OUT_VID_DIR = os.path.join(BASE_DIR, "media", "videos")
OUT_THUMB_DIR = os.path.join(BASE_DIR, "media", "thumbnails")

os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_VID_DIR, exist_ok=True)
os.makedirs(OUT_THUMB_DIR, exist_ok=True)

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

def optimize_image(in_path, slug, title, cat, aspect_hint="3/4"):
    out_name = f"{slug}.webp"
    out_path = os.path.join(OUT_IMG_DIR, out_name)
    orig_sz = os.path.getsize(in_path)

    if not os.path.exists(out_path) or os.path.getsize(out_path) == 0:
        try:
            im = Image.open(in_path)
            im = ImageOps.exif_transpose(im)
            im = im.convert("RGB")
            
            max_dim = 1800
            w, h = im.size
            if max(w, h) > max_dim:
                if w > h:
                    new_w = max_dim
                    new_h = int(h * (max_dim / w))
                else:
                    new_h = max_dim
                    new_w = int(w * (max_dim / h))
                im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

            im.save(out_path, "WEBP", quality=82, method=4)
            opt_sz = os.path.getsize(out_path)
            pct = (1 - (opt_sz / orig_sz)) * 100
            print(f"Compressed image {slug}: {orig_sz/(1024*1024):.2f}MB -> {opt_sz/1024:.1f}KB (-{pct:.1f}%)")
        except Exception as e:
            print(f"Error optimizing {in_path}: {e}")
            return None

    try:
        with Image.open(out_path) as im:
            w, h = im.size
            calc_aspect = "16/9" if w > h * 1.3 else ("4/3" if w > h else ("2/3" if h > w * 1.4 else "3/4"))
    except:
        w, h = 1200, 1600
        calc_aspect = aspect_hint

    return {
        "id": slug,
        "orig": os.path.basename(in_path),
        "src": f"/media/images/{out_name}",
        "title": title,
        "cat": cat,
        "aspect": calc_aspect,
        "width": w,
        "height": h,
    }

def optimize_video(in_path, slug, title, desc, dur, cat="Cinematic Reels"):
    out_name = f"{slug}.mp4"
    out_path = os.path.join(OUT_VID_DIR, out_name)
    thumb_name = f"{slug}-thumb.webp"
    thumb_path = os.path.join(OUT_THUMB_DIR, thumb_name)

    orig_sz = os.path.getsize(in_path)

    # 1. Thumbnail
    if not os.path.exists(thumb_path) or os.path.getsize(thumb_path) == 0:
        cmd_thumb = [
            FFMPEG, "-y",
            "-ss", "00:00:01",
            "-i", in_path,
            "-vframes", "1",
            "-vf", "scale='min(720,iw)':-2",
            "-f", "image2",
            thumb_path
        ]
        subprocess.run(cmd_thumb, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if not os.path.exists(thumb_path) or os.path.getsize(thumb_path) == 0:
            cmd_thumb_fallback = [
                FFMPEG, "-y",
                "-ss", "00:00:00",
                "-i", in_path,
                "-vframes", "1",
                "-vf", "scale='min(720,iw)':-2",
                "-f", "image2",
                thumb_path
            ]
            subprocess.run(cmd_thumb_fallback, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # 2. Video Compression
    if not os.path.exists(out_path) or os.path.getsize(out_path) == 0:
        print(f"Compressing video {slug} ({orig_sz/(1024*1024):.2f}MB)...")
        cmd_vid = [
            FFMPEG, "-y",
            "-i", in_path,
            "-vf", "scale='min(1080,iw)':-2",
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-crf", "26",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            out_path
        ]
        subprocess.run(cmd_vid, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        opt_sz = os.path.getsize(out_path)
        pct = (1 - (opt_sz / orig_sz)) * 100
        print(f"Video {slug} done: {orig_sz/(1024*1024):.2f}MB -> {opt_sz/(1024*1024):.2f}MB (-{pct:.1f}%)")

    return {
        "id": slug,
        "orig": os.path.basename(in_path),
        "src": f"/media/videos/{out_name}",
        "poster": f"/media/thumbnails/{thumb_name}",
        "title": title,
        "desc": desc,
        "dur": dur,
        "cat": cat,
    }

master_images = []
master_videos = []

# --- A. NEW WEDDING PHOTOS ---
weeding_dir = os.path.join(BASE_DIR, "weeding")
if os.path.exists(weeding_dir):
    idx = 1
    for f in sorted(os.listdir(weeding_dir)):
        fp = os.path.join(weeding_dir, f)
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            item = optimize_image(fp, f"wedding-story-{idx:02d}", f"Sacred Vows & Rituals {idx}", "Wedding", "2/3")
            if item:
                master_images.append(item)
                idx += 1

# --- B. ROOT ORIGINAL PHOTOS ---
root_images = [
    ("IMG_0289.JPG", "hero-portrait", "Timeless Wedding Portrait", "Bridal Portrait", "2/3"),
    ("file_00000000597481fba7ecc469e1040bcf.png", "editorial-portrait-01", "The Art of Elegance", "Editorial", "2/3"),
    ("IMG_20260718_125741.jpg", "wedding-moment-01", "A Celebration in Udaipur", "Wedding", "3/4"),
    ("IMG_20260718_125847.jpg", "wedding-moment-02", "Intimate Wedding Vows", "Wedding", "3/4"),
    ("IMG_20260718_130055.jpg", "wedding-moment-03", "Golden Hour Radiance", "Pre-Wedding", "3/4"),
    ("IMG_4680.HEIC", "cinematic-landscape-01", "Vows by the Horizon", "Destination", "16/9"),
    ("IMG_4685.HEIC", "cinematic-landscape-02", "Twilight Serenade", "Destination", "16/9"),
    # Picsart Monochrome Series
    ("Picsart_26-07-01_17-02-23-648.jpg", "monochrome-01", "Soulful Silhouettes I", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-03-05-326.jpg", "monochrome-02", "Soulful Silhouettes II", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-04-19-580.jpg", "monochrome-03", "Grace in Stillness", "Bridal Portrait", "3/4"),
    ("Picsart_26-07-01_17-05-11-379.jpg", "monochrome-04", "Whispers of Forever", "Pre-Wedding", "3/4"),
    ("Picsart_26-07-01_17-05-49-520.jpg", "monochrome-05", "Poetry in Motion", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-08-51-882.jpg", "monochrome-06", "The Sacred Gaze", "Wedding", "3/4"),
    ("Picsart_26-07-01_17-27-49-001.jpg", "monochrome-07", "Eternal Romance", "Wedding", "3/4"),
    ("Picsart_26-07-01_17-29-03-546.jpg", "monochrome-08", "Fleeting Moments", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-32-28-101.jpg", "monochrome-09", "Candid Majesty", "Bridal Portrait", "3/4"),
    # 1.png Series
    ("1 (1).png", "story-01", "Velvet Night Prelude", "Pre-Wedding", "4/5"),
    ("1 (2).png", "story-02", "Gilded Whispers", "Editorial", "4/5"),
    ("1 (3).png", "story-03", "Artistic Composition III", "Editorial", "4/5"),
    ("1 (4).png", "story-04", "Warm Embrace", "Wedding", "4/5"),
    ("1 (6).png", "story-05", "Lumière & Shadow", "Editorial", "4/5"),
    ("1 (7).png", "story-06", "Crimson Splendor", "Wedding", "4/5"),
    ("1 (8).png", "story-07", "Royal Heritage", "Destination", "4/5"),
    ("1 (9).png", "story-08", "Vibrant Euphoria", "Wedding", "4/5"),
    ("1 (10).png", "story-09", "Golden Legacy", "Bridal Portrait", "4/5"),
    ("1 (11).png", "story-10", "Dusk to Dawn Celebration", "Destination", "4/5"),
]
for fn, slug, title, cat, aspect in root_images:
    fp = os.path.join(BASE_DIR, fn)
    if os.path.exists(fp):
        item = optimize_image(fp, slug, title, cat, aspect)
        if item:
            master_images.append(item)

# --- C. EVENT PHOTOS ---
event_dir = os.path.join(BASE_DIR, "event")
if os.path.exists(event_dir):
    idx = 1
    for f in sorted(os.listdir(event_dir)):
        if "copy" in f.lower(): continue
        fp = os.path.join(event_dir, f)
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            item = optimize_image(fp, f"event-moment-{idx:02d}", f"Grand Gala & Award Moments {idx}", "Events", "16/9")
            if item:
                master_images.append(item)
                idx += 1

print(f"Total Master Images: {len(master_images)}")

# --- D. WEDDING VIDEOS ---
if os.path.exists(weeding_dir):
    w_vids = [
        ("Video-54145.mp4", "wedding-film-01", "The Grand Wedding Symphony", "A celebration of sacred vows, laughter, and heirloom memories", "0:48"),
        ("Video-59191.mp4", "wedding-film-02", "Golden Hour Vows", "Intimate rituals and radiant emotions captured in timeless frames", "0:45"),
        ("Video-95215.mp4", "wedding-film-03", "Midnight Nuptials & Joy", "Vibrant celebration of dance, rituals, and family love", "0:38"),
    ]
    for fn, slug, t, d, dur in w_vids:
        fp = os.path.join(weeding_dir, fn)
        if os.path.exists(fp):
            item = optimize_video(fp, slug, t, d, dur, "Wedding Films")
            if item:
                master_videos.append(item)

# --- E. ROOT ORIGINAL VIDEOS & REELS ---
root_vids = [
    ("0928 (2).mp4", "film-01", "Symphony of Forever", "A cinematic tale of timeless love and grandeur", "0:14", "Wedding Films"),
    ("petal & co final.mp4", "film-02", "Petal & Co. Signature Reel", "Signature wedding cinema highlight showcase", "0:17", "Wedding Films"),
    ("petals_pilates_30sec_sequence_reel.mp4", "film-03", "Rhythm & Grace", "A rhythmic sequence captured with precision", "0:30", "Cinematic Reels"),
    ("Snapchat-986809368.mp4", "film-04", "The Golden Glow Reel", "Pure joy and spontaneous celebration", "0:19", "Cinematic Reels"),
    ("VID-20260609-WA0000.mp4", "film-05", "Intimate Vows & Laughter", "Unfiltered emotions from the heart of the ceremony", "0:31", "Wedding Films"),
    ("VID-20260619-WA0008.mp4", "film-06", "Midnight Revelry", "Electric energy and late-night celebrations", "0:25", "Cinematic Reels"),
    ("VID-20260709-WA0000.mp4", "film-07", "Royal Procession Story", "Grandeur and royal elegance in every frame", "0:42", "Wedding Films"),
    ("VID-20260926-WA0049(3).mp4", "film-08", "Fleeting Glimpses", "Intimate behind-the-scenes glances", "0:10", "Cinematic Reels"),
    ("Video-14870.mp4", "film-09", "The First Dance", "An unforgettable dance under twilight skies", "0:34", "Wedding Films"),
    ("Video-51630.mp4", "film-10", "Celebration in Motion", "Vibrant colors, dance and togetherness", "0:35", "Cinematic Reels"),
    ("Video-557.mp4", "film-11", "Pre-Wedding Moments", "Gentle laughter before the vows", "0:14", "Cinematic Reels"),
]
for fn, slug, t, d, dur, cat in root_vids:
    fp = os.path.join(BASE_DIR, fn)
    if os.path.exists(fp):
        item = optimize_video(fp, slug, t, d, dur, cat)
        if item:
            master_videos.append(item)

# --- F. EVENT VIDEOS ---
event_vid_dir = os.path.join(BASE_DIR, "event video")
if os.path.exists(event_vid_dir):
    e_vids = [
        ("MAX MUSIC SCHOOL AWARDS .mp4", "event-film-01", "Max Music School Awards Night", "Gala award ceremony highlights & live performances", "0:40"),
        ("MAX MUSIC SCHOOL ENTRY  2.mp4", "event-film-02", "Grand Entry & Stage Arrival", "Electrifying red carpet walk & audience reception", "0:45"),
        ("MAX MUSIC SCHOOL FINAL.02.mp4", "event-film-03", "The Grand Finale Celebration", "Full cinematic showcase of the musical celebration", "1:05"),
        ("MAX MUSIC SCHOOL TEASER .mp4", "event-film-04", "Music School Premiere Teaser", "High energy cinematic teaser and beats", "0:26"),
    ]
    for fn, slug, t, d, dur in e_vids:
        fp = os.path.join(event_vid_dir, fn)
        if os.path.exists(fp):
            item = optimize_video(fp, slug, t, d, dur, "Event Films")
            if item:
                master_videos.append(item)

# --- G. FOOD & COMMERCIAL VIDEOS ---
food_dir = os.path.join(BASE_DIR, "food")
if os.path.exists(food_dir):
    f_vids = [
        ("SAVORA CAFE.mp4", "food-film-01", "Savora Cafe Experience", "Artisan brew, warm ambiance, and sensory culinary delight", "0:22"),
        ("C2267.MP4", "food-film-02", "Culinary Craftsmanship I", "Gourmet plating & culinary perfection in motion", "0:05"),
        ("C2294.MP4", "food-film-03", "Flavors & Atmosphere II", "Exquisite cocktails & modern gastronomy experience", "0:18"),
        ("C2295.MP4", "food-film-04", "Art of Taste III", "Sensory slow-motion gastronomy and hospitality", "0:16"),
        ("C2299.MP4", "food-film-05", "Chef's Signature Cut", "Precision culinary prep and sizzling textures", "0:10"),
        ("AWARD TEMPLATE.mp4", "food-film-06", "Brand Award Reel", "Premium commercial brand presentation showcase", "0:40"),
    ]
    for fn, slug, t, d, dur in f_vids:
        fp = os.path.join(food_dir, fn)
        if os.path.exists(fp):
            item = optimize_video(fp, slug, t, d, dur, "Commercial & Food")
            if item:
                master_videos.append(item)

print(f"Total Master Videos: {len(master_videos)}")

manifest = {
    "images": master_images,
    "videos": master_videos,
}
manifest_path = os.path.join(BASE_DIR, "media", "manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

ts_path = r"d:\All site\shah\lib\mediaData.ts"
with open(ts_path, "w", encoding="utf-8") as f:
    f.write("// Complete Generated Media Manifest\n")
    f.write("export interface MediaImage {\n")
    f.write("  id: string;\n  orig: string;\n  src: string;\n  title: string;\n  cat: string;\n  aspect: string;\n  width: number;\n  height: number;\n}\n\n")
    f.write("export interface MediaVideo {\n")
    f.write("  id: string;\n  orig: string;\n  src: string;\n  poster: string;\n  title: string;\n  desc: string;\n  dur: string;\n  cat: string;\n}\n\n")
    f.write(f"export const MEDIA_IMAGES: MediaImage[] = {json.dumps(master_images, indent=2)};\n\n")
    f.write(f"export const MEDIA_VIDEOS: MediaVideo[] = {json.dumps(master_videos, indent=2)};\n")

print(f"\nALL DONE! Successfully indexed {len(master_images)} images and {len(master_videos)} videos in {ts_path}!")
