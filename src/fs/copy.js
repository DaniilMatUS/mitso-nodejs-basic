import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {  
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');
    
    try {
        await fs.access(sourceDir);
        try {
            await fs.access(destDir);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.mkdir(destDir, { recursive: true });
                const files = await fs.readdir(sourceDir);
                
                for (const file of files) {
                    const sourcePath = path.join(sourceDir, file);
                    const destPath = path.join(destDir, file);
                    await fs.copyFile(sourcePath, destPath);
                }
                console.log('Files copied successfully');
            } else {
                throw new Error('FS operation failed');
            }
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();