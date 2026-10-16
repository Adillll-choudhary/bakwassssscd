import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function addLazyLoading(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    // Replace <img ... > with <img loading="lazy" ... > if it doesn't already have loading=
    // This is a simple regex that matches <img and checks if loading= is present.
    content = content.replace(/<img(?![^>]*loading=)([^>]*)>/gi, '<img loading="lazy"$1>');
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Added lazy loading to ${filePath}`);
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
            if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
                addLazyLoading(fullPath);
            }
        }
    }
}

processDirectory(srcDir);
console.log('Lazy loading audit complete.');
