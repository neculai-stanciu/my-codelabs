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
                addPresentationsInfo(codelab);
                addDemoInfo(codelab);
                codelabs.push(codelab);
            }
        }
    }, this);

    fs.writeFileSync("all-codelabs.json", JSON.stringify(codelabs, null, 2));
};

addPresentationsInfo = (codelab) => {
    const presentationsDir = "presentations";
    let containsPresentation = false;
    fs.readdirSync(presentationsDir).forEach(file => {
        const filePtah = path.join(presentationsDir,file);
        const stats = fs.statSync(filePtah);
        if(stats.isDirectory && path.basename(file) === codelab.id) {
            containsPresentation = true;
        }
    });
    codelab.containsPresentation = containsPresentation;
}
addDemoInfo = (codelab) => {
    const demoDir = "demo";
    let containsDemo = false;
    fs.readdirSync(demoDir).forEach(file => {
        const filePtah = path.join(demoDir,file);
        const stats = fs.statSync(filePtah);
        if(stats.isDirectory && path.basename(file) === codelab.id) {
            containsDemo = true;
        }
    });
    codelab.containsDemo = containsDemo;
}

startCollecting(dir, []);
