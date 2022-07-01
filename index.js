const { myServer } = require('./src/myServer.js');
const { Router } = require('./src/router.js');
const { serveFile } = require('./src/serveFiles.js');
const { bodyParser } = require('./src/bodyParser.js');

module.exports = {
  myServer,
  Router,
  serveFile,
  bodyParser
};
