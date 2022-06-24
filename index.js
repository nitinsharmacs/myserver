const { myServer } = require('./src/myServer.js');
const { Router } = require('./src/router.js');
const { serveFile } = require('./src/serveFiles.js');

const main = () => {
  const router = new Router();
  const server = myServer(router);

  router.get('/public', serveFile);

  router.get('/demo-data', (req, res) => {
    res.status(200).json({ message: 'hello world' });
  });

  router.get('/', (req, res) => {
    res.sendHtml('<h1>You are at home page</h1>');
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
