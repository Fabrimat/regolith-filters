const fs = require('fs');
const path = require('path');

let settings = process.argv[2];
let files = [];
let filePath;
try {
    settings = JSON.parse(settings);
    filePath = settings.path;
    files = settings.files;
} catch { }

function isDirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
}

function glob(pattern, directory) {
    const matches = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stats = fs.lstatSync(fullPath);

        if (stats.isDirectory()) {
            const nestedMatches = glob(pattern, fullPath);
            matches.push(...nestedMatches);
        } else if (path.match(pattern, file)) {
            matches.push(fullPath);
        }
    }

    return matches;
}

function deleteFileOrDirectory(filePath) {
    if (isDirectory(filePath)) {
        fs.rmdirSync(filePath);
    } else {
        fs.unlinkSync(filePath);
    }
}

function deleteFiles(basePath, filePatterns) {
    for (const pattern of filePatterns) {
        const filePaths = glob(pattern, basePath);

        for (const filePath of filePaths) {
            //deleteFileOrDirectory(filePath);
            console.log(`Deleted file: ${filePath}`);
        }
    }
}

// Delete files in the current directory and its subdirectories
deleteFiles(filePath, files);
