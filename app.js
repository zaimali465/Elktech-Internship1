const fs = require("fs");
const path = require("path");
const filePath = process.argv[2];

if (!filePath) {
    console.error("Please provide a file path");
    process.exit(1);
}

const fullPath = path.resolve(filePath);
if (!fs.existsSync(fullPath)) {
    console.error("File not found");
    process.exit(1);
}

const wordCount = {};
const readStream = fs.createReadStream(fullPath, { encoding: "utf8" });

readStream.on("error", (err) => {
    console.error("Error reading file:", err.message);
});

readStream.on("data", (chunk) => {
    const words = chunk
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/);

    words.forEach((word) => {
        if (word) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });
});

readStream.on("end", () => {
    console.log("\nWord Frequency:\n");
    const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

    sortedWords.forEach(([word, count]) => {
        console.log(`${word}: ${count}`);
    });

    const writeStream = fs.createWriteStream("output.txt");
    sortedWords.forEach(([word, count]) => {
        writeStream.write(`${word}: ${count}\n`);
    });
    writeStream.end();

    console.log("\nOutput saved to output.txt");
});