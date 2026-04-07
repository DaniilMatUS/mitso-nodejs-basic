import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const stream = fs.createWriteStream(filePath);
    
    console.log('Enter text to write to file (Ctrl+C to exit):');
    process.stdin.pipe(stream);
    
    stream.on('error', () => {
        throw new Error('FS operation failed');
    });
};

await write();