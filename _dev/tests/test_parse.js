const fs = require('fs');
let content = fs.readFileSync('EAA Web Version/js/utils.js', 'utf8');
content = content.replace('window.Utils = Utils;', 'module.exports = Utils;');
fs.writeFileSync('utils_test.js', content);
const Utils = require('./utils_test.js');

const timeData = ["timestamp", "2026-04-24T18:22:52.811Z", "2026-04-24T18:22:53.811Z", "2026-04-24T18:22:54.811Z"];
console.log("Date parsing test:", Utils.parseTimeColumn(timeData));

const numData = ["Time (s)", "0.01", "0.02", "0.03"];
console.log("Num parsing test:", Utils.parseTimeColumn(numData));
