import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    // Replace .png, .jpg, .jpeg with .webp
    // Careful not to replace URLs that might not be local, but assuming all are local for now.
    content = content.replace(/\.png/gi, '.webp');
    content = content.replace(/\.jpg/gi, '.webp');
    content = content.replace(/\.jpeg/gi, '.webp');
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated references in ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.tsx', '.ts', '.css', '.js', '.jsx'].includes(ext)) {
                replaceInFile(fullPath);
            }
        }
    }
}

processDirectory(srcDir);
console.log('Reference replacement complete.');
