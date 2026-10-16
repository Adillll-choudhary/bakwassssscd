import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');

async function getAllFiles(dirPath, arrayOfFiles) {
  const files = await fs.readdir(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  for (const file of files) {
    if ((await fs.stat(path.join(dirPath, file))).isDirectory()) {
      arrayOfFiles = await getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  }

  return arrayOfFiles;
}

async function optimize() {
  console.log('🚀 Starting Image Optimization...');
  const files = await getAllFiles(PUBLIC_DIR);
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const fileName = path.basename(file, ext);
    const dir = path.dirname(file);
    const targetFile = path.join(dir, `${fileName}.webp`);

    try {
      const metadata = await sharp(file).metadata();
      
      let transform = sharp(file);
      
      // Resize if too large
      if (metadata.width > 2560) {
        transform = transform.resize(2560);
      }

      await transform
        .webp({ quality: 80 })
        .toFile(targetFile);

      console.log(`✅ Optimized: ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, targetFile)}`);
      
      // We keep the original for now to avoid breaking existing code until we update all paths
      // In a real scenario, we might want to replace them or keep both.
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err);
    }
  }

  console.log('📉 Image Optimization Complete!');
}

optimize();
