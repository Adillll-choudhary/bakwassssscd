import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VIDEO_DIR = 'public/work/videos';
const OUTPUT_DIR = 'public/work/optimized';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const videos = fs.readdirSync(VIDEO_DIR).filter(f => /\.(mp4|mov|webm)$/i.test(f));

console.log(`🎬 Found ${videos.length} videos to optimize...`);

videos.forEach(video => {
  const inputPath = path.join(VIDEO_DIR, video);
  const name = path.parse(video).name;

  console.log(`\n📦 Optimizing: ${video}`);

  // 1. Generate 1080p Desktop Version (VP9 + H.264)
  console.log('--- Generating 1080p versions...');
  try {
    // MP4 (H.264, CRF 26)
    execSync(`ffmpeg -i "${inputPath}" -vf scale=1920:-2 -c:v libx264 -crf 26 -preset fast -an "${path.join(OUTPUT_DIR, name)}_1080p.mp4" -y`);
    // WebM (VP9, CRF 30)
    execSync(`ffmpeg -i "${inputPath}" -vf scale=1920:-2 -c:v libvpx-vp9 -crf 30 -b:v 0 -an "${path.join(OUTPUT_DIR, name)}_1080p.webm" -y`);
  } catch (e) {
    console.error(`Failed 1080p for ${video}: ${e.message}`);
  }

  // 2. Generate 720p Tablet Version
  console.log('--- Generating 720p versions...');
  try {
    execSync(`ffmpeg -i "${inputPath}" -vf scale=1280:-2 -c:v libx264 -crf 28 -preset fast -an "${path.join(OUTPUT_DIR, name)}_720p.mp4" -y`);
  } catch (e) {
    console.error(`Failed 720p for ${video}: ${e.message}`);
  }

  // 3. Generate 360p Mobile Version
  console.log('--- Generating 360p versions...');
  try {
    execSync(`ffmpeg -i "${inputPath}" -vf scale=640:-2 -c:v libx264 -crf 30 -preset fast -an "${path.join(OUTPUT_DIR, name)}_360p.mp4" -y`);
  } catch (e) {
    console.error(`Failed 360p for ${video}: ${e.message}`);
  }

  // 4. Extract Poster Frame
  console.log('--- Extracting poster frame...');
  try {
    execSync(`ffmpeg -i "${inputPath}" -ss 00:00:00.500 -vframes 1 -vf scale=1280:-2 "${path.join(OUTPUT_DIR, name)}_poster.webp" -y`);
  } catch (e) {
    console.error(`Failed poster for ${video}: ${e.message}`);
  }
});

console.log('\n✅ Video optimization complete! Now update your data files to use the optimized sources.');
