const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'bg');
const frameCount = 82;
const missing = [];

for (let i = 0; i < frameCount; i++) {
    const index = i.toString().padStart(3, '0');
    const name = `hero section_${index}_upscayl_4x_upscayl-standard-4x.webp`;
    const fullPath = path.join(dir, name);
    if (!fs.existsSync(fullPath)) {
        missing.push(name);
    }
}

if (missing.length > 0) {
    console.log(`Missing ${missing.length} files:`, missing.slice(0, 5));
} else {
    console.log('All 82 upscaled webp files exist in public/bg!');
}
