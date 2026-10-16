import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  WATCH_DIR: path.join(__dirname, 'public'),
  MAX_WIDTH: 2560, // Increased for 2K displays
  QUALITY: 95      // Maximum professional quality
};

// State to prevent infinite loops (since writing a webp triggers the watcher too)
const processingFiles = new Set();

console.log('======================================================');
console.log('🤖 COLDUNE AUTO-WEBP ENGINE is now RUNNING in background!');
console.log('======================================================');
console.log(`\n👁️ Watching for new images in: ${CONFIG.WATCH_DIR}`);
console.log(`\n💡 How it works:\nJust copy and paste any JPG/PNG into ANY folder inside 'public/'.`);
console.log(`It will instantly generate a perfectly optimized .webp version right next to it, completely automatically!\n`);

// First, lets do an initial pass just in case they added stuff before starting the script
async function getAllFiles(dirPath, arrayOfFiles) {
  try {
    const files = await fs.promises.readdir(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    for (const file of files) {
      if ((await fs.promises.stat(path.join(dirPath, file))).isDirectory()) {
        arrayOfFiles = await getAllFiles(path.join(dirPath, file), arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
    return arrayOfFiles;
  } catch (err) {
    return arrayOfFiles || [];
  }
}

async function processImage(absolutePath) {
  if (processingFiles.has(absolutePath)) return;
  
  const ext = path.extname(absolutePath).toLowerCase();
  
  // Only process standard images
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  
  const dir = path.dirname(absolutePath);
  const fileName = path.basename(absolutePath, ext);
  const webpFile = path.join(dir, `${fileName}.webp`);

  processingFiles.add(absolutePath);
  processingFiles.add(webpFile);

  try {
    /* 
    try {
      await fs.promises.access(webpFile);
      processingFiles.delete(absolutePath);
      setTimeout(() => processingFiles.delete(webpFile), 5000);
      return;
    } catch (e) {
    }
    */

    // Wait a brief moment to ensure file is completely written to disk
    await new Promise(r => setTimeout(r, 500));

    const metadata = await sharp(absolutePath).metadata();
    let transform = sharp(absolutePath);
    
    if (metadata.width > CONFIG.MAX_WIDTH) {
      transform = transform.resize({
        width: CONFIG.MAX_WIDTH,
        withoutEnlargement: true
      });
    }

    await transform
      .webp({ quality: CONFIG.QUALITY, effort: 6 })
      .toFile(webpFile);

    const relInput = path.relative(__dirname, absolutePath);
    const relOutput = path.relative(__dirname, webpFile);
    console.log(`\n[AUTO-CONVERTED] 🎉 -> ${fileName}.webp generated successfully!`);
    console.log(`📍 Saved magically inside the exact same folder!`);
    
  } catch (err) {
    // If file is locked, we can ignore
  } finally {
    processingFiles.delete(absolutePath);
    // Keep webp in set for a few seconds to avoid watcher detecting its creation loop
    setTimeout(() => processingFiles.delete(webpFile), 5000);
  }
}

// 1. Initial Pass
(async () => {
  const allFiles = await getAllFiles(CONFIG.WATCH_DIR);
  for (const file of allFiles) {
    await processImage(file);
  }
})();

// 2. Continuous Native Watcher
fs.watch(CONFIG.WATCH_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;

  const absolutePath = path.join(CONFIG.WATCH_DIR, filename);
  
  // Sometimes fs.watch emits before file exists (during copy), so we check
  fs.stat(absolutePath, (err, stats) => {
    if (err) return; // File deleted or unavailable
    if (stats.isFile()) {
      processImage(absolutePath);
    }
  });
});
