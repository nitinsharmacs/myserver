const { createServer } = require('http');
const { Response } = require('./response.js');

const onNewConnection = (req, res, router) => {
  const response = new Response(res.socket);

  req.uri = req.url;

  router.runHandler(req, response);
};

const myServer = (router) =>
  createServer((req, res) => onNewConnection(req, res, router));

module.exports = { myServer };
