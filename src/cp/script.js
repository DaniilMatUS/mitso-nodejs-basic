const args = process.argv.slice(2);


if (args.length > 0) {
    console.log('Received arguments:');
    args.forEach((arg, index) => {
        console.log(`  arg${index + 1}: ${arg}`);
    });
} else {
    console.log('No arguments received');
}


process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input.toLowerCase() === 'exit') {
        console.log('Exiting...');
        process.exit();
    } else {
        console.log(`Child process received: ${input}`);
    }
});

console.log('Child process ready. Type "exit" to quit.');