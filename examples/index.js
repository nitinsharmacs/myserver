const { myServer, Router } = require('../index.js');

const router = new Router();
const server = myServer(router);

router.get('/', (req, res) => {
  res.send('welcome to the world of misfit toys');
});

server.listen(3000, () => {
  console.log('server is running on 3000');
});
