import os
import subprocess
import json
from PIL import Image, ImageOps
import pillow_heif
import imageio_ffmpeg

pillow_heif.register_heif_opener()

PUBLIC_DIR = r"d:\All site\shah\public"
OUT_IMG_DIR = os.path.join(PUBLIC_DIR, "media", "images")
OUT_VID_DIR = os.path.join(PUBLIC_DIR, "media", "videos")
OUT_THUMB_DIR = os.path.join(PUBLIC_DIR, "media", "thumbnails")

os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_VID_DIR, exist_ok=True)
os.makedirs(OUT_THUMB_DIR, exist_ok=True)

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

# Define image mapping
IMAGE_MAPPING = [
    # Primary Hero & Main portraits
    ("IMG_0289.JPG", "hero-portrait", "Timeless Wedding Portrait", "Bridal Portrait", "2/3"),
    ("file_00000000597481fba7ecc469e1040bcf.png", "editorial-portrait-01", "The Art of Elegance", "Editorial", "2/3"),
    ("IMG_20260718_125741.jpg", "wedding-moment-01", "A Celebration in Udaipur", "Destination", "3/4"),
    ("IMG_20260718_125847.jpg", "wedding-moment-02", "Intimate Wedding Vows", "Wedding", "3/4"),
    ("IMG_20260718_130055.jpg", "wedding-moment-03", "Golden Hour Radiance", "Pre-Wedding", "3/4"),
    ("IMG_4680.HEIC", "cinematic-landscape-01", "Vows by the Horizon", "Destination", "16/9"),
    ("IMG_4685.HEIC", "cinematic-landscape-02", "Twilight Serenade", "Destination", "16/9"),
    # Picsart Editorial Monochrome collection
    ("Picsart_26-07-01_17-02-23-648.jpg", "monochrome-01", "Soulful Silhouettes I", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-03-05-326.jpg", "monochrome-02", "Soulful Silhouettes II", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-04-19-580.jpg", "monochrome-03", "Grace in Stillness", "Bridal Portrait", "3/4"),
    ("Picsart_26-07-01_17-05-11-379.jpg", "monochrome-04", "Whispers of Forever", "Pre-Wedding", "3/4"),
    ("Picsart_26-07-01_17-05-49-520.jpg", "monochrome-05", "Poetry in Motion", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-08-51-882.jpg", "monochrome-06", "The Sacred Gaze", "Wedding", "3/4"),
    ("Picsart_26-07-01_17-27-49-001.jpg", "monochrome-07", "Eternal Romance", "Wedding", "3/4"),
    ("Picsart_26-07-01_17-29-03-546.jpg", "monochrome-08", "Fleeting Moments", "Editorial", "3/4"),
    ("Picsart_26-07-01_17-32-28-101.jpg", "monochrome-09", "Candid Majesty", "Bridal Portrait", "3/4"),
    # Visual stories collection (1.png series)
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

# Define video mapping
VIDEO_MAPPING = [
    ("0928 (2).mp4", "film-01", "Symphony of Forever", "A cinematic tale of timeless love and grandeur", "0:14"),
    ("petal & co final.mp4", "film-02", "Petal & Co. Grand Reveal", "Signature cinematic wedding film highlight", "0:17"),
    ("petals_pilates_30sec_sequence_reel.mp4", "film-03", "Rhythm & Grace", "A rhythmic sequence captured with precision", "0:30"),
    ("Snapchat-986809368.mp4", "film-04", "The Golden Glow Reel", "Pure joy and spontaneous celebration", "0:19"),
    ("VID-20260609-WA0000.mp4", "film-05", "Intimate Vows & Laughter", "Unfiltered emotions from the heart of the ceremony", "0:31"),
    ("VID-20260619-WA0008.mp4", "film-06", "Midnight Revelry", "Electric energy and late-night celebrations", "0:25"),
    ("VID-20260709-WA0000.mp4", "film-07", "Royal Procession Story", "Grandeur and royal elegance in every frame", "0:42"),
    ("VID-20260926-WA0049(3).mp4", "film-08", "Fleeting Glimpses", "Intimate behind-the-scenes glances", "0:10"),
    ("Video-14870.mp4", "film-09", "The First Dance", "An unforgettable dance under twilight skies", "0:34"),
    ("Video-51630.mp4", "film-10", "Celebration in Motion", "Vibrant colors, dance and togetherness", "0:35"),
    ("Video-557.mp4", "film-11", "Pre-Wedding Moments", "Gentle laughter before the vows", "0:14"),
]

def optimize_images():
    print("--- OPTIMIZING IMAGES ---")
    results = []
    total_orig = 0
    total_opt = 0

    for orig_fn, slug, title, cat, aspect in IMAGE_MAPPING:
        in_path = os.path.join(PUBLIC_DIR, orig_fn)
        if not os.path.exists(in_path):
            print(f"Skipping {orig_fn} (not found)")
            continue
        
        orig_sz = os.path.getsize(in_path)
        total_orig += orig_sz

        out_name = f"{slug}.webp"
        out_path = os.path.join(OUT_IMG_DIR, out_name)

        im = Image.open(in_path)
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")

        # Resize if max dimension > 1800
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
        
        # Save as optimized webp
        im.save(out_path, "WEBP", quality=82, method=6)
        opt_sz = os.path.getsize(out_path)
        total_opt += opt_sz

        pct = (1 - (opt_sz / orig_sz)) * 100
        print(f"Image {orig_fn} -> {out_name}: {orig_sz/(1024*1024):.2f}MB -> {opt_sz/1024:.1f}KB (-{pct:.1f}%)")

        results.append({
            "id": slug,
            "orig": orig_fn,
            "src": f"/media/images/{out_name}",
            "title": title,
            "cat": cat,
            "aspect": aspect,
            "width": im.width,
            "height": im.height,
        })

    print(f"\nTotal Images: {total_orig/(1024*1024):.2f}MB -> {total_opt/(1024*1024):.2f}MB (-{(1 - total_opt/total_orig)*100:.1f}% reduction!)\n")
    return results

def optimize_videos():
    print("--- OPTIMIZING VIDEOS ---")
    results = []
    total_orig = 0
    total_opt = 0

    for orig_fn, slug, title, desc, dur in VIDEO_MAPPING:
        in_path = os.path.join(PUBLIC_DIR, orig_fn)
        if not os.path.exists(in_path):
            print(f"Skipping {orig_fn} (not found)")
            continue

        orig_sz = os.path.getsize(in_path)
        total_orig += orig_sz

        out_name = f"{slug}.mp4"
        out_path = os.path.join(OUT_VID_DIR, out_name)

        thumb_name = f"{slug}-thumb.webp"
        thumb_path = os.path.join(OUT_THUMB_DIR, thumb_name)

        # 1. Extract thumbnail at 1s (or 0.5s)
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
            # fallback at 00:00:00
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

        # 2. Compress video
        # Vertical video max width 720, height even, CRF 26, faststart
        cmd_vid = [
            FFMPEG, "-y",
            "-i", in_path,
            "-vf", "scale='min(720,iw)':-2",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "26",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            out_path
        ]
        subprocess.run(cmd_vid, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        opt_sz = os.path.getsize(out_path)
        total_opt += opt_sz

        pct = (1 - (opt_sz / orig_sz)) * 100
        print(f"Video {orig_fn} -> {out_name}: {orig_sz/(1024*1024):.2f}MB -> {opt_sz/(1024*1024):.2f}MB (-{pct:.1f}%)")

        results.append({
            "id": slug,
            "orig": orig_fn,
            "src": f"/media/videos/{out_name}",
            "poster": f"/media/thumbnails/{thumb_name}",
            "title": title,
            "desc": desc,
            "dur": dur,
        })

    print(f"\nTotal Videos: {total_orig/(1024*1024):.2f}MB -> {total_opt/(1024*1024):.2f}MB (-{(1 - total_opt/total_orig)*100:.1f}% reduction!)\n")
    return results

if __name__ == "__main__":
    imgs = optimize_images()
    vids = optimize_videos()

    manifest = {
        "images": imgs,
        "videos": vids,
    }

    manifest_path = os.path.join(PUBLIC_DIR, "media", "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    ts_path = r"d:\All site\shah\lib\mediaData.ts"
    os.makedirs(os.path.dirname(ts_path), exist_ok=True)
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write("// Generated media manifest\n")
        f.write("export interface MediaImage {\n")
        f.write("  id: string;\n  orig: string;\n  src: string;\n  title: string;\n  cat: string;\n  aspect: string;\n  width: number;\n  height: number;\n}\n\n")
        f.write("export interface MediaVideo {\n")
        f.write("  id: string;\n  orig: string;\n  src: string;\n  poster: string;\n  title: string;\n  desc: string;\n  dur: string;\n}\n\n")
        f.write(f"export const MEDIA_IMAGES: MediaImage[] = {json.dumps(imgs, indent=2)};\n\n")
        f.write(f"export const MEDIA_VIDEOS: MediaVideo[] = {json.dumps(vids, indent=2)};\n")
    print(f"Generated manifest at {manifest_path} and {ts_path}")
