const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public', 'assets');
const SRC_DIR = path.join(__dirname, 'src');

async function convertImages() {
  const files = fs.readdirSync(PUBLIC_DIR);
  let convertedCount = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const inputPath = path.join(PUBLIC_DIR, file);
      const outputFilename = path.basename(file, path.extname(file)) + '.webp';
      const outputPath = path.join(PUBLIC_DIR, outputFilename);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted: ${file} -> ${outputFilename}`);
        convertedCount++;
        
        // Remove original file
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log(`Successfully converted ${convertedCount} images to WebP.`);
}

function updateReferences(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      updateReferences(filePath);
    } else {
      const ext = path.extname(file);
      if (ext === '.tsx' || ext === '.ts' || ext === '.css' || ext === '.json') {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Replace .png, .PNG, .jpg, .JPG, .jpeg, .JPEG with .webp
        const newContent = content.replace(/\.(png|PNG|jpg|JPG|jpeg|JPEG)/g, (match) => {
          modified = true;
          return '.webp';
        });
        
        if (modified) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`Updated references in: ${file}`);
        }
      }
    }
  }
}

async function run() {
  console.log("Starting WebP conversion...");
  await convertImages();
  
  console.log("Updating code references in src/...");
  updateReferences(SRC_DIR);
  
  console.log("All done!");
}

run();
