if(process.argv.length < 3) {
  console.error("ExtensionName must be specified as argument. Eg: <pullRequestInsights or t1/t2>");
  return;
}

var extName = process.argv[2];
var taskReleaseType = "dev"; // default
if(process.argv.length > 3) {
  // prod or dev
  var taskReleaseType = process.argv[3];
}
exports.ReleaseType = taskReleaseType;
console.log(`ExtensionName: '${extName}', ReleaseType: '${taskReleaseType}'`);

const fs = require('fs');
const path = require('path');
const extensionOutDir = path.resolve(`${__dirname}/../dist/${extName}Extension/`);
const taskOutDir = path.resolve(`${extensionOutDir}/${extName}Task/`);
const taskSrcDir = path.resolve(`${__dirname}/../Tasks/${extName}Task/`);

exports.ExtensionOutDir = extensionOutDir;
exports.TaskOutDir = taskOutDir;
exports.TaskSrcDir = taskSrcDir;

exports.CopyFile = function(srcDir, fileName, destFolder, destFileName = undefined) {
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true }); // Ensure the folder is created properly
  }

  destFileName = destFileName || fileName;
  const srcFile = path.resolve(`${srcDir}/${fileName}`);
  const destFile = path.resolve(`${destFolder}/${destFileName}`);

  console.log(`Copying from ${srcFile} to ${destFile}`);

  try {
    fs.copyFileSync(srcFile, destFile);
    console.log(`${fileName} copied to outdir: '${destFolder}'`);
  } catch (err) {
    console.error(`Unable to copy '${fileName}' to outdir: '${destFolder}'`, err);
    throw err;
  }

  return destFile;
}