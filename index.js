const { createServer } = require('net');

const main = () => {
  const server = createServer(socket => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      socket.end();
    });
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
