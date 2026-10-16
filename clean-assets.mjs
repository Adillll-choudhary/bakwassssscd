import fs from 'fs';
import path from 'path';

const publicDir = './public';

function getFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFiles(publicDir);

console.log('Searching for redundant high-res PNG files...');

const pngFiles = allFiles.filter(f => f.toLowerCase().endsWith('.png'));

let deletedCount = 0;
let savedSpace = 0;

for (const pngFile of pngFiles) {
  const webpFile = pngFile.replace(/\.png$/i, '.webp');
  const webpAltFile = pngFile + '.webp';
  
  // Check if we have a webp counterpart
  if (fs.existsSync(webpFile) || fs.existsSync(webpAltFile)) {
    const stats = fs.statSync(pngFile);
    // If PNG is much larger than its webp version (usually the case for source high-res)
    // or if it's one of those upscayl ones.
    if (stats.size > 500000 || pngFile.includes('upscayl')) {
        console.log(`Deleting redundant PNG: ${pngFile} (${(stats.size/1024/1024).toFixed(2)} MB)`);
        savedSpace += stats.size;
        fs.unlinkSync(pngFile);
        deletedCount++;
    }
  }
}

console.log(`\nCleanup complete! Deleted ${deletedCount} files.`);
console.log(`Saved approx ${(savedSpace/1024/1024).toFixed(2)} MB of project space and final build weight.`);
