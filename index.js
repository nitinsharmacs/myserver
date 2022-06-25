const { myServer } = require('./src/myServer.js');
const { Router } = require('./src/router.js');
const { serveFile } = require('./src/serveFiles.js');

const authenticate = (request, response, next) => {
  if (request.headers.user === 'gayatri') {
    next();
    return;
  }
  response.status(401).json({ message: "Authorization failed" });
};

const final = (request, response) => {
  response.status(200).json({ message: "You are into the system" });
};

const main = () => {
  const router = new Router();
  const server = myServer(router);

  router.get('/public', serveFile);

  router.get('/secret', authenticate, final);

  router.get('/demo-data', (req, res, next) => {
    console.log('hii');
    next();
  }, (req, res) => {
    res.status(200).json({ message: 'hello world' });
  });

  router.get('/', (req, res) => {
    res.sendHtml('<h1>You are at home page</h1>');
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
