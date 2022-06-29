const { myServer, Router } = require('../index.js');

const router = new Router();
const server = myServer(router);

router.get('/', (req, res, next) => {
  console.log('hello');
}, (req, res) => {
  res.send('welcome to the world of misfit toys');
});

router.get('/comment', (req, res) => {
  res.send('added comment');
});

router.put('/comment', (req, res) => {
  res.send('changed comment');
});

router.use((req, res) => {
  res.status(404).send('not found');
});

server.listen(3000, () => {
  console.log('server is running on 3000');
});
