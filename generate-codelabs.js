const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const codelabGenerator = require('@dxdeveloperexperience/codelab-generator');
const chokidar = require('chokidar');

generateAllCodelabs = () => {
  allCodelabs = collectAllCodelabs();
  console.log("all codelabs: ", allCodelabs);

  allCodelabs.forEach(codelabPath => {
    generateCodelab(codelabPath);
  })
}
const collectAllCodelabs = () => {
  const codelabsDir = "codelabs";
  const { codelabs: npmCodelabs, excludedCodelabsPaths } = collectNpmCodelabs(codelabsDir);
  const claatCodelabs = collectClaatCodelabs(codelabsDir, excludedCodelabsPaths);

  if (!npmCodelabs) {
    return claatCodelabs;
  }
  return npmCodelabs.concat(claatCodelabs);
};

const collectNpmCodelabs = (codelabsDir) => {
  const codelabs = [];
  const excludedCodelabsPaths = [];
  fs.readdirSync(codelabsDir).forEach(file => {
    const filePath = path.join(codelabsDir, file);
    // todo: add support for themes
    if (path.extname(file) === ".json") {
      excludedCodelabsPaths.push(getExcludedPath(filePath));
      codelabs.push(filePath);
    }
  });
  return { codelabs, excludedCodelabsPaths };
}

const collectClaatCodelabs = (codelabsDir, excludedFiles) => {
  let codelabs = [];
  fs.readdirSync(codelabsDir).forEach(file => {
    if (!excludedFiles.includes(path.join(codelabsDir, file))) {
      const filePath = path.join(codelabsDir, file);
      // todo: add support for themes
      if (path.extname(file) === ".md") {
        codelabs.push(filePath)
      }
    }
  });
  return codelabs;
}

const getExcludedPath = (filePath) => {
  const info = getCodelabInfo(filePath);
  if (info && info.source) {
    const dirName = path.dirname(filePath);
    return path.join(dirName, info.source);
  }
}


const generateCodelab = (codelabPath) => {
  if (path.extname(codelabPath) === ".json") {
    generateCodelabFromJson(codelabPath);
  }
  if (path.extname(codelabPath) === ".md") {
    console.log('Generate codelab for: ', codelabPath);
    generateCodelabFromMd(codelabPath);
  }
}

const generateCodelabFromJson = (codelabInfoPath) => {
  const codelabInfo = getCodelabInfo(codelabInfoPath);
  const dirName = path.dirname(codelabInfoPath);
  const codelabName = codelabInfo.source;
  console.log('Generate codelab dir:', codelabInfo.id);
  console.log(`generate-codelab ${path.join(dirName, codelabName)} ${codelabInfo.id}`);
  codelabGenerator(path.join(dirName, codelabName), path.join(dirName, codelabInfo.id));

  codelabInfo.environment = "web";
  codelabInfo.format = "html";
  codelabInfo.url = codelabInfo.id;
  codelabInfo.updated = new Date().toISOString();

  let watcher;

  const onGeneratorFinished = (withWatcher) => {
    if (withWatcher) {
      watcher.close();
      console.log("Watcher closed")
    }
    fs.writeFileSync(path.join(dirName, codelabInfo.id, 'codelab.json'), JSON.stringify(codelabInfo, null, 2));
    console.log("codelab.json created");
  }

  if (fs.existsSync(path.join(dirName, codelabInfo.id, "index.html"))) {
    onGeneratorFinished(false)
  } else {
    watcher = fs.watch(path.resolve(path.join(dirName)), {
      recursive: false,
    }, (evType, filename) => {
      if (evType == 'change') {
        if (fs.existsSync(path.join(dirName, codelabInfo.id, "index.html"))) {
          onGeneratorFinished();
        }
      }
    });
  }
};

const generateCodelabFromMd = (codelabPath) => {
  const codelabName = path.basename(codelabPath);
  // todo: add theme support
  const claatCommand = `cd codelabs && claat export ${codelabName}`;
  exec(claatCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

const getCodelabInfo = (codelabInfoPath) => {
  try {
    const codelabInfo = JSON.parse(fs.readFileSync(codelabInfoPath));
    if (validateCodelabInfo(codelabInfoPath, codelabInfo)) {
      return codelabInfo;
    } else {
      console.warn('Please provide a valid json with all needed properties in order to generate codelab.');
    }
  } catch (e) {
    console.warn('Please provide a valid json with all needed properties in order to generate codelab.');
  }
}


const validateCodelabInfo = (codelabInfoPath, info) => {
  let isValid = true;
  if (!codelabInfoPath) {
    console.error(`No json file for codelab provided.
    Please add a json file with the following properties:
      - source: codelabFile name
      - id: target folder
      - title: Card info
      - author: Card info
      - summary: Card info
    `)
  }
  const fileName = path.basename(codelabInfoPath);
  ['source', 'id', 'title', 'author', 'summary'].forEach((prop) => {
    if (!info.hasOwnProperty(prop)) {
      isValid = false;
      console.error(`Missing ${prop} property from codelab info file: ${fileName}.`);
    }
  });
  return isValid;
}

generateAllCodelabs();
