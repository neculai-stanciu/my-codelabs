const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// note expects reveal-md installed globally
const generateStaticPresentation = (markdownPath, themePath) => {
  const presentationName = path.basename(markdownPath, '.md');
  // todo: add theme support
  const revealCommand = `reveal-md ./${markdownPath} --static=presentations/${presentationName}`;
  console.log("command: ", revealCommand);
  exec(revealCommand, (error, stdout, stderr) => {
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

const collectAllPresentations = () => {
  const presentationsDir = "presentations";
  let presentations = [];
  fs.readdirSync(presentationsDir).forEach(file => {
    console.log("File ", path.extname(file));
    const filePath = path.join(presentationsDir, file);
    const stats = fs.statSync(filePath);
    // todo: add support for themes
    if (path.extname(file) === ".md") {
      presentations.push(filePath)
    }
  });
  console.log("Presentations: ", presentations);
  return presentations;
};

generateAllStaticPresentations = () => {
  collectAllPresentations().forEach(presentationPath => {
    generateStaticPresentation(presentationPath);
  })
}

generateAllStaticPresentations();
