const { createServer } = require('net');
const { parseRequest } = require('./requestParser.js');
const { Response } = require('./response.js');

const onNewConnection = (socket, router) => {
  socket.setEncoding('utf8');

  socket.on('data', chunk => {
    const req = parseRequest(chunk);
    const res = new Response(socket);
    router.runHandler(req, res);
  });
};

const myServer = (router) =>
  createServer(socket => onNewConnection(socket, router));

module.exports = { myServer };
