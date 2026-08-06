const fs = require('fs');
let utilsContent = fs.readFileSync('EAA Web Version/js/utils.js', 'utf8');
utilsContent = utilsContent.replace('window.Utils = Utils;', 'module.exports = Utils;');
fs.writeFileSync('utils_test.js', utilsContent);
const Utils = require('./utils_test.js');

const ctx = {
    df: [
        {"timestamp": "2026-04-24T18:22:52Z", "Chamber Pressure (psi)": "400"},
        {"timestamp": "2026-04-24T18:22:53Z", "Chamber Pressure (psi)": "450"},
        {"timestamp": "2026-04-24T18:22:54Z", "Chamber Pressure (psi)": "450"},
        {"timestamp": "2026-04-24T18:22:55Z", "Chamber Pressure (psi)": "0"}
    ],
    timeCol: "timestamp",
    dataMask: [true, true, true, true],
    chamberCol: "Chamber Pressure (psi)"
};

function getFilteredNumericColumn(colName) {
    if (!ctx.df || !colName || !ctx.dataMask) return [];
    const downsample = 1;
    let baseData;
    if (colName === ctx.timeCol) {
        baseData = Utils.parseTimeColumn(ctx.df.map(row => row[colName]));
    } else {
        baseData = ctx.df.map(row => Utils.parseNumber(row[colName]));
    }
    const result = [];
    let passedCount = 0;
    for (let i = 0; i < ctx.df.length; i++) {
        if (ctx.dataMask[i]) {
            if (passedCount % downsample === 0) {
                result.push(baseData[i]);
            }
            passedCount++;
        }
    }
    return result;
}

function getFilteredData() {
    const downsample = 1;
    const mask = ctx.dataMask;
    const result = [];
    let passedCount = 0;
    for (let i = 0; i < ctx.df.length; i++) {
        if (mask[i]) {
            if (passedCount % downsample === 0) {
                result.push(ctx.df[i]);
            }
            passedCount++;
        }
    }
    return result;
}

const data = getFilteredData();
const time = getFilteredNumericColumn(ctx.timeCol);
let yData = data.map(row => Utils.parseNumber(row[ctx.chamberCol]));

console.log("Time array:", time);
console.log("yData array:", yData);

const chartData = time.map((x, j) => ({ x: x, y: yData[j] }));
console.log("Chart Data:", chartData);
