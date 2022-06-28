const { myServer } = require('./src/myServer.js');
const { Router } = require('./src/router.js');
const { serveFile } = require('./src/serveFiles.js');

module.exports = {
  myServer,
  Router,
  serveFile
};
