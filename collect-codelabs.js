const fs = require('fs');
const path = require('path');

const dir = 'codelabs';

startCollecting = (dirPath) => {
    const self = this;
    const codelabs = [];
    fs.readdirSync(dirPath).forEach((file) => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            const codelabJson = path.join(fullPath, 'codelab.json')
            if (fs.existsSync(codelabJson)) {
                let codelab = JSON.parse(fs.readFileSync(codelabJson, { encoding: "utf8" }));
                codelabs.push(codelab);
            }
        }
    },this);

    fs.writeFileSync("all-codelabs.json",JSON.stringify(codelabs,null,2));
};

startCollecting(dir, []);
