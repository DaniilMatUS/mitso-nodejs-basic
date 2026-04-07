import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split('').reverse().join('');
            callback(null, reversed);
        }
    });
    
    console.log('Enter text to transform (reverse):');
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();