const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'bg');
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.startsWith('hero section_') && file.endsWith('.webp')) {
        const filePath = path.join(dir, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
    }
});
console.log('Done cleaning hero webp files. The watcher will now regenerate them at 95% quality!');
