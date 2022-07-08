const { myServer, Router } = require('../index.js');
const mime = require('mime-types');

const router = new Router();
const server = myServer(router);
const fs = require('fs');

router.get('/big-files', (req, res) => {
  const readStream = fs.createReadStream('./step-7.mp4');
  res.setHeader('content-type', mime.contentType('mp4'));
  readStream.on('data', chunk => {
    res.write(chunk);
  });
  readStream.on('end', () => {
    res.end();
  });
});

router.get('/', (req, res, next) => {
  console.log('hello');
  next();
}, (req, res) => {
  res.send('welcome to the world of misfit toys');
});

router.post('/comment', (req, res) => {
  console.log(req.headers);
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    console.log(chunk);
  });

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
