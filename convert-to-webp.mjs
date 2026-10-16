import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Define configuration
const CONFIG = {
  QUALITY: 85,          // 80-90% as requested
  MAX_WIDTH: 1920,      // Max width 1920px for web optimization
  INPUT_DIR: './inputs',
  OUTPUT_DIR: './outputs'
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, CONFIG.INPUT_DIR);
const outputPath = path.join(__dirname, CONFIG.OUTPUT_DIR);

// Create directories if they don't exist
async function ensureDirectories() {
  try {
    await fs.mkdir(inputPath, { recursive: true });
    await fs.mkdir(outputPath, { recursive: true });
  } catch (error) {
    console.error('Error creating output directories:', error);
  }
}

async function getAllFiles(dirPath, arrayOfFiles = []) {
  try {
      const files = await fs.readdir(dirPath);

      for (const file of files) {
        const stat = await fs.stat(path.join(dirPath, file));
        if (stat.isDirectory()) {
          arrayOfFiles = await getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(dirPath, file));
        }
      }
  } catch (e) {
      if(e.code !== 'ENOENT') throw e;
  }
  return arrayOfFiles;
}

async function startAutomatedSystem() {
  console.log(`\n🚀 Starting Automated WebP Conversion System...`);
  console.log(`-------------------------------------------------`);
  console.log(`📂 Input Directory  : ${CONFIG.INPUT_DIR}`);
  console.log(`📂 Output Directory : ${CONFIG.OUTPUT_DIR}`);
  console.log(`⚙️  Target Quality   : ${CONFIG.QUALITY}%`);
  console.log(`📏 Max Width        : ${CONFIG.MAX_WIDTH}px`);
  console.log(`-------------------------------------------------\n`);

  await ensureDirectories();

  const files = await getAllFiles(inputPath);
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

  if (imageFiles.length === 0) {
    console.log(`⚠️ No JPG/PNG/JPEG images found in the '${CONFIG.INPUT_DIR}' directory.`);
    console.log(`👉 Please place your images in the '${CONFIG.INPUT_DIR}' folder and run the script again.\n`);
    return;
  }

  let successCount = 0;
  let totalSavedBytes = 0;

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const fileName = path.basename(file, ext);
    const relativePath = path.relative(inputPath, path.dirname(file));
    
    // Maintain subdirectories in output
    const targetDir = path.join(outputPath, relativePath);
    await fs.mkdir(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, `${fileName}.webp`);

    try {
      const originalStat = await fs.stat(file);
      const metadata = await sharp(file).metadata();
      
      let transform = sharp(file);
      
      // ✅ Resize strictly if width exceeds 1920px
      if (metadata.width > CONFIG.MAX_WIDTH) {
        transform = transform.resize({
          width: CONFIG.MAX_WIDTH,
          withoutEnlargement: true
        });
      }

      // ✅ Convert to WebP format with 80-90% quality
      await transform
        .webp({ 
            quality: CONFIG.QUALITY,
            effort: 6 // Max compression effort to ensure smallest file while retaining quality
        })
        .toFile(targetFile);

      const optimizedStat = await fs.stat(targetFile);
      const spaceSaved = originalStat.size - optimizedStat.size;
      const percentSaved = ((spaceSaved / originalStat.size) * 100).toFixed(2);
      
      totalSavedBytes += spaceSaved;
      successCount++;

      console.log(`✅ Converted: ${fileName}${ext} ➔ ${fileName}.webp`);
      console.log(`   📉 Size: ${(originalStat.size / 1024).toFixed(2)} KB ➔ ${(optimizedStat.size / 1024).toFixed(2)} KB (Saved ${percentSaved}%)`);
    } catch (err) {
      console.error(`❌ Error processing ${fileName}${ext}:`, err.message);
    }
  }

  console.log(`\n🎉 WebP Conversion Complete!`);
  console.log(`📊 Successfully converted ${successCount}/${imageFiles.length} images.`);
  console.log(`💾 Total Space Saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`🌍 Output images are ready in the '${CONFIG.OUTPUT_DIR}' directory.\n`);
}

startAutomatedSystem();
