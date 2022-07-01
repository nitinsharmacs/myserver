const { myServer, Router, bodyParser } = require('../index.js');
const fs = require('fs');

const router = new Router();
const server = myServer(router);

router.use(bodyParser);

router.get('/form', (req, res) => {
  const content = fs.readFileSync('./examples/public/index.html');
  res.sendHtml(content);
});

router.post('/add-comment', (req, res) => {
  console.log(req.body);
  res.send('comment added');
});

router.get('/', (req, res) => {
  res.send('welcome to the world of misfit toys');
});

router.use((req, res) => {
  res.status(404).send('not found');
});

server.listen(3000, () => {
  console.log('server is running on 3000');
});
