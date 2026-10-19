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

# Load existing manifest if present
manifest_path = os.path.join(BASE_DIR, "media", "manifest.json")
existing_manifest = {"images": [], "videos": []}
if os.path.exists(manifest_path):
    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            existing_manifest = json.load(f)
    except Exception as e:
        print("Could not load existing manifest:", e)

# Deduplicate images by hash
seen_hashes = {}

images_data = []
videos_data = []

def get_file_hash(fp):
    h = hashlib.md5()
    with open(fp, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def optimize_image(in_path, slug, title, cat, aspect_hint="3/4"):
    out_name = f"{slug}.webp"
    out_path = os.path.join(OUT_IMG_DIR, out_name)

    orig_sz = os.path.getsize(in_path)

    if not os.path.exists(out_path) or os.path.getsize(out_path) == 0:
        try:
            im = Image.open(in_path)
            im = ImageOps.exif_transpose(im)
            im = im.convert("RGB")
            
            # Max dimension 1800
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
    
    # Check dimensions
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

def optimize_video(in_path, slug, title, desc, dur, cat="Reels"):
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
        # Use fast preset, 720p or 1080p, CRF 26, faststart
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

print("=== 1. PROCESSING EXISTING MEDIA ===")
# Include existing images already processed
for img in existing_manifest.get("images", []):
    fp = os.path.join(OUT_IMG_DIR, os.path.basename(img["src"]))
    if os.path.exists(fp):
        images_data.append(img)
        # register hash of original if found
        orig_fp = os.path.join(BASE_DIR, img["orig"])
        if os.path.exists(orig_fp):
            try:
                seen_hashes[get_file_hash(orig_fp)] = img["id"]
            except:
                pass

for vid in existing_manifest.get("videos", []):
    fp = os.path.join(OUT_VID_DIR, os.path.basename(vid["src"]))
    if os.path.exists(fp):
        if "cat" not in vid:
            vid["cat"] = "Reels"
        videos_data.append(vid)

print(f"Retained {len(images_data)} existing images, {len(videos_data)} existing videos.")

print("\n=== 2. PROCESSING NEW WEDDING MEDIA (public/weeding) ===")
weeding_dir = os.path.join(BASE_DIR, "weeding")
if os.path.exists(weeding_dir):
    idx = 1
    vidx = 1
    for f in sorted(os.listdir(weeding_dir)):
        fp = os.path.join(weeding_dir, f)
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            h = get_file_hash(fp)
            if h in seen_hashes:
                print(f"Skipping duplicate wedding photo {f}")
                continue
            seen_hashes[h] = f
            slug = f"wedding-story-{idx:02d}"
            title = f"Sacred Union Story {idx}"
            data = optimize_image(fp, slug, title, "Wedding", "3/4")
            if data:
                # Add to start of images for high prominence
                images_data.insert(0, data)
                idx += 1
        elif f.lower().endswith('.mp4'):
            slug = f"wedding-film-{vidx:02d}"
            title = f"The Royal Wedding Highlight {vidx}"
            desc = "Emotional ceremonial moments captured in vivid cinematic detail"
            data = optimize_video(fp, slug, title, desc, "0:45", "Wedding")
            if data:
                videos_data.insert(0, data)
                vidx += 1

print("\n=== 3. PROCESSING EVENT MEDIA (public/event) ===")
event_dir = os.path.join(BASE_DIR, "event")
if os.path.exists(event_dir):
    idx = 1
    for f in sorted(os.listdir(event_dir)):
        if "copy" in f.lower():
            continue
        fp = os.path.join(event_dir, f)
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            h = get_file_hash(fp)
            if h in seen_hashes:
                print(f"Skipping duplicate event photo {f}")
                continue
            seen_hashes[h] = f
            slug = f"event-moment-{idx:02d}"
            title = f"Grand Gala & Award Moments {idx}"
            data = optimize_image(fp, slug, title, "Events", "16/9")
            if data:
                images_data.append(data)
                idx += 1

print("\n=== 4. PROCESSING EVENT VIDEOS (public/event video) ===")
event_vid_dir = os.path.join(BASE_DIR, "event video")
if os.path.exists(event_vid_dir):
    idx = 1
    titles = [
        ("MAX MUSIC SCHOOL AWARDS .mp4", "Max Music School Awards Night", "Gala award ceremony highlights & live performances"),
        ("MAX MUSIC SCHOOL ENTRY  2.mp4", "Grand Entry & Stage Arrival", "Electrifying red carpet walk & audience reception"),
        ("MAX MUSIC SCHOOL FINAL.02.mp4", "The Grand Finale Celebration", "Full cinematic showcase of the musical celebration"),
        ("MAX MUSIC SCHOOL TEASER .mp4", "Music School Premiere Teaser", "High energy cinematic teaser and beats"),
    ]
    for fn, t, d in titles:
        fp = os.path.join(event_vid_dir, fn)
        if os.path.exists(fp):
            slug = f"event-film-{idx:02d}"
            data = optimize_video(fp, slug, t, d, "0:45", "Events")
            if data:
                videos_data.append(data)
                idx += 1

print("\n=== 5. PROCESSING FOOD & COMMERCIAL VIDEOS (public/food) ===")
food_dir = os.path.join(BASE_DIR, "food")
if os.path.exists(food_dir):
    idx = 1
    food_titles = [
        ("SAVORA CAFE.mp4", "Savora Cafe Experience", "Artisan brew, warm ambiance, and sensory culinary delight"),
        ("C2267.MP4", "Culinary Craftsmanship I", "Gourmet plating & culinary perfection in motion"),
        ("C2294.MP4", "Flavors & Atmosphere II", "Exquisite cocktails & modern gastronomy experience"),
        ("C2295.MP4", "Art of Taste III", "Sensory slow-motion gastronomy and hospitality"),
        ("C2299.MP4", "Chef's Signature Cut", "Precision culinary prep and sizzling textures"),
        ("AWARD TEMPLATE.mp4", "Brand Award Reel", "Premium commercial brand presentation showcase"),
    ]
    for fn, t, d in food_titles:
        fp = os.path.join(food_dir, fn)
        if os.path.exists(fp):
            slug = f"food-film-{idx:02d}"
            data = optimize_video(fp, slug, t, d, "0:30", "Commercial")
            if data:
                videos_data.append(data)
                idx += 1

# Save manifest and TS
manifest = {
    "images": images_data,
    "videos": videos_data,
}
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

ts_path = r"d:\All site\shah\lib\mediaData.ts"
with open(ts_path, "w", encoding="utf-8") as f:
    f.write("// Complete Generated Media Manifest\n")
    f.write("export interface MediaImage {\n")
    f.write("  id: string;\n  orig: string;\n  src: string;\n  title: string;\n  cat: string;\n  aspect: string;\n  width: number;\n  height: number;\n}\n\n")
    f.write("export interface MediaVideo {\n")
    f.write("  id: string;\n  orig: string;\n  src: string;\n  poster: string;\n  title: string;\n  desc: string;\n  dur: string;\n  cat: string;\n}\n\n")
    f.write(f"export const MEDIA_IMAGES: MediaImage[] = {json.dumps(images_data, indent=2)};\n\n")
    f.write(f"export const MEDIA_VIDEOS: MediaVideo[] = {json.dumps(videos_data, indent=2)};\n")

print(f"\nSUCCESS: Generated {len(images_data)} total images and {len(videos_data)} total videos in {ts_path}!")
