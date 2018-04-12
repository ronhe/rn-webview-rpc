const fs = require('fs');
const path = require('path');
const fse = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies

const args = process.argv.slice(2);
let inputPaths = [];
let outputPath = '';
if (args.length === 1) {
  inputPaths = [args[0]];
  outputPath = `${inputPaths[0]}.json`;
}

const obj = {};
inputPaths.forEach((inputPath) => {
  const filename = path.parse(inputPath).name;
  obj[filename] = JSON.stringify(fs.readFileSync(inputPath, 'utf8'));
});

fse.writeJsonSync(outputPath, obj);


// test
const input = path.parse(inputPaths[0]);
const json = require(`./${outputPath}`);
fs.writeFileSync(`${input.dir}/${input.name}1${input.ext}`, JSON.parse(json[input.name]));
