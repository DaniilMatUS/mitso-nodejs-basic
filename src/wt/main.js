import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];
    const results = [];
    
    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(path.join(__dirname, 'worker.js'));
        const number = 10 + i;
        
        const promise = new Promise((resolve) => {
            worker.on('message', (result) => {
                resolve(result);
                worker.terminate();
            });
            
            worker.on('error', () => {
                resolve({ status: 'error', data: null });
                worker.terminate();
            });
        });
        
        workers.push(promise);
        worker.postMessage(number);
    }
    
    const allResults = await Promise.all(workers);
    console.log('Results:', allResults);
    return allResults;
};

await performCalculations();