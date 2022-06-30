[![myServer Logo](https://nitinsharmacs.github.io/projectsImages/myserver.png)](https://github.com/nitinsharmacs/myserver)

  Simple nodejs net createServer for [node](http://nodejs.org).

```js
const {myServer, Router} = require('myserver');
const router = new Router();
const app = myServer(router);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## Installation

This node module can be installed using npm

```console
$ npm install https://github.com/nitinsharmacs/myserver
```

## Features

  * Routing
  * Redirection
  * Chunked data serving

## Example

  To view the example, clone the myserver repo and install the dependencies:

```console
$ git clone git://github.com/nitinsharmacs/myserver
$ cd myserver
$ npm install
```

```console
$ node examples/index.js
```

### Running Tests

To run tests, install the mocha dependancy and run the tests:

```console
$ npm install mocha
$ npm test
```
