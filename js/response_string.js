const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter your preferred technology at Elktech (Python, NodeJS, Go, Rust): ", tech => {
    console.log("Great choice! " + tech + " is widely used in Elktech projects ");
    readline.close();
});