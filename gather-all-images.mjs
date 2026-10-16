import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
    const publicDir = path.join(__dirname, "public");
    const alllDir = path.join(__dirname, "alll");

    console.log("📂 Creating 'alll' folder...");
    
    try {
        await fs.mkdir(alllDir, { recursive: true });
    } catch {}

    let copiedCount = 0;
    
    async function scanAndCopy(dirPath) {
        try {
            const items = await fs.readdir(dirPath, { withFileTypes: true });

            for (const item of items) {
                const fullPath = path.join(dirPath, item.name);

                if (item.isDirectory() && item.name === "alll") continue;

                if (item.isDirectory()) {
                    await scanAndCopy(fullPath);
                } else {
                    const ext = path.extname(item.name).toLowerCase();
                    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
                        copiedCount++;
                        const originalName = path.basename(item.name, ext);
                        const uniqueName = `${originalName}_${copiedCount}${ext}`;
                        const destPath = path.join(alllDir, uniqueName);

                        await fs.copyFile(fullPath, destPath);
                        console.log(`✅ Copied: ${item.name} -> alll/${uniqueName}`);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    console.log("🔍 Scanning for images in public folder...");
    await scanAndCopy(publicDir);
    console.log(`\n🎉 DONE! successfully copied ${copiedCount} images to 'alll' folder!`);
}

run();
