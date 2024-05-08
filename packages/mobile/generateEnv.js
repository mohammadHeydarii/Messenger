const path = require('path');
const fs = require('fs');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

const isStage = process.argv.indexOf('--stage') !== -1;
const isRC = process.argv.indexOf('--rc') !== -1;

fs.writeFileSync(
  resolvePath('./env.js'),
  `global.__STAGE__ = ${isStage};
global.__RC__ = ${isRC};
`,
);
