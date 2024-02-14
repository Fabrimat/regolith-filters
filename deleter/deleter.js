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

function wildcardMatch(text, pattern) {
    const regexPattern =
        new RegExp('^' + pattern.replace(/\?/g, '.').replace(/\*/g, '.*') + '$');
    return regexPattern.test(text);
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
        } else if (wildcardMatch(file, pattern)) {
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
            deleteFileOrDirectory(filePath);
            console.log(`Deleted file: ${filePath}`);
        }
    }
}

deleteFiles("./" + filePath, files);
