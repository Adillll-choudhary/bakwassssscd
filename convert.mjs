import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                const newPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
                console.log(`Converting: ${fullPath} -> ${newPath}`);
                try {
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 6 })
                        .toFile(newPath);
                    console.log(`Successfully converted ${file}. Deleting original...`);
                    fs.unlinkSync(fullPath);
                } catch (error) {
                    console.error(`Failed to convert ${file}:`, error);
                }
            }
        }
    }
}

processDirectory(directoryPath).then(() => {
    console.log('Conversion complete.');
}).catch(console.error);
