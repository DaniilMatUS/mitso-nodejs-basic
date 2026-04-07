import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            hash.update(chunk);
        });
        
        stream.on('end', () => {
            const result = hash.digest('hex');
            console.log('SHA256 hash:', result);
            resolve(result);
        });
        
        stream.on('error', () => {
            reject(new Error('FS operation failed'));
        });
    });
};

await calculateHash();