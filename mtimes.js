#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const scriptFiles = [
    'test1.js',
    'test2.js',
    'test3.js',
];

const mtimeDecimals = [
    0.3147,
    0.500,
    0.711
];

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

function list() {
    scriptFiles.forEach(scriptFile => {
        let srcStats = fs.statSync(path.join(srcDir, scriptFile));
        let distStats = fs.statSync(path.join(distDir, scriptFile));
        console.log(`file: ${scriptFile} src mtimeMs: ${srcStats.mtimeMs} dist mtimeMs: ${distStats.mtimeMs} dist newer than src?: ${distStats.mtimeMs > srcStats.mtimeMs}`);
    });
}

function set() {
    scriptFiles.forEach((scriptFile, idx) => {
        const filePath = path.join(srcDir, scriptFile);
        let srcStats = fs.statSync(filePath);
        // console.log(typeof srcStats.atime, typeof srcStats.atimeMs, srcStats.atime instanceof Date, srcStats.atime.getTime(), srcStats.atimeMs)
        fs.utimesSync(filePath, srcStats.atimeMs / 1000, (Math.floor(srcStats.mtimeMs) + mtimeDecimals[idx]) / 1000);
    });
}

if (process.argv[2] === 'list') {
    list();
    process.exit();
}

if (process.argv[2] === 'set') {
    set();
    process.exit();
}

console.log(process.argv)
console.log(`usage: ${path.basename(__filename)} list|set`);
