const { createServer } = require('net');
const { parseRequest } = require('./requestParser.js');
const { Response } = require('./response.js');

const onNewConnection = (socket, router) => {
  socket.setEncoding('utf8');

  socket.on('data', chunk => {
    const request = parseRequest(chunk);
    const res = new Response(socket);

    router.runHandler(request, res);
    socket.end();
  });
};

const myServer = (router) =>
  createServer(socket => onNewConnection(socket, router));

module.exports = { myServer };
