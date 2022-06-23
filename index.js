const { myServer } = require('./src/myServer.js');
const { Router } = require('./src/router.js');

const main = () => {
  const router = new Router();
  const server = myServer(router);

  router.get('/add/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    res.sendHtml(`<h1>${num1} + ${num2} = ${+num1 + +num2}</h1>`);
  });

  router.get('/sub/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    res.sendHtml(`<h1>${num1} - ${num2} = ${+num1 - +num2}</h1>`);
  });

  router.get('/demo-data', (req, res) => {
    res.status(200).json({ message: 'hello world' });
  });

  router.get('/', (req, res) => {
    res.sendHtml('<h1>You are are home page</h1>');
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
