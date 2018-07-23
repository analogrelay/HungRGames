// Edit the index.d.ts file to add the UMD export
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, "..", "dist", "esm", "shootr", "src", "main.d.ts");

var content = fs.readFileSync(target);
fs.writeFileSync(target, content + "\r\nexport as namespace shootR;");