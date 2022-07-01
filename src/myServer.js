const { createServer } = require('net');
const { parseRequest } = require('./requestParser.js');
const { Response } = require('./response.js');

const onNewConnection = (socket, router) => {
  socket.setEncoding('utf8');
  // let rawReq = '';

  socket.on('data', chunk => {
    const req = parseRequest(chunk);
    const res = new Response(socket);
    console.log(req);

    router.runHandler(req, res);
  });

  socket.on('error', () => { });
};

const myServer = (router) =>
  createServer(socket => onNewConnection(socket, router));

module.exports = { myServer };
