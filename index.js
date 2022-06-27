const { myServer } = require('./src/myServer.js');
const { Router } = require('./src/router.js');
const { login } = require('./src/loginHandler.js');
const { serveFile } = require('./src/serveFiles.js');

const main = () => {
  const router = new Router();
  const server = myServer(router);

  router.get('/public', serveFile);

  router.get('/login', login);

  router.get('/demo-data/:id', (req, res) => {
    res.status(200).json({ message: 'hello world' });
  });

  router.get('/favicon.ico', (req, res) => {
    res.status(404).send('');
  });

  router.get('/', (req, res, next) => {
    if (req.uri !== '/') {
      res.status(404).send('page not found');
      return;
    }
    next();
  }, (req, res) => {
    res.redirect('/public/kfc/index.html');
  });

  const PORT = 3000;

  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
