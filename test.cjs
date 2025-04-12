const { modules } = require('./report.json');
const fastGlob = require('fast-glob');
const { resolve } = require('path');
const fs = require('fs');

const allFilesPathArr = fastGlob.sync('./src/**/*.{js,ts,tsx,png,css,json}').map(ele => resolve(process.cwd(), ele));
console.log("allFilesPathArr", allFilesPathArr);

const useModulePathArr = new Set(modules.map(ele => ele.nameForCondition).filter(path => path && !path.includes('node_modules')));

console.log("useModulePathArr", useModulePathArr);

allFilesPathArr.forEach(path => {
    if (useModulePathArr.has(path)) return;

    console.log("path", path);
    fs.rmSync(path);
});
