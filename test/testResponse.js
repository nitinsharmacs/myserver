const assert = require('assert');
const { stringifyHeaders,
  httpResponse,
  Response
} = require('../src/response.js');

describe('stringifyHeaders', () => {
  it('should stringify a single header', () => {
    const headers = {
      'user-agent': 'something'
    };

    const expected = 'user-agent:something\r\n';

    assert.strictEqual(stringifyHeaders(headers), expected);
  });

  it('should stringify headers', () => {
    const headers = {
      'user-agent': 'something',
      'content-type': 'application/json'
    };

    const expected = 'user-agent:something\r\ncontent-type:application/json\r\n';

    assert.strictEqual(stringifyHeaders(headers), expected);
  });
});

describe('httpResponse', () => {
  it('should create http response', () => {
    const body = 'hello';
    const status = 200;
    const headers = {
      'content-type': 'text/plain'
    };

    const expected = 'HTTP/1.1 200\r\ncontent-type:text/plain\r\n\r\nhello';

    assert.strictEqual(httpResponse(body, status, headers), expected);
  });
});

const mockSocket = (expectedTexts) => {
  return {
    write: function (actualText) {
      assert.strictEqual(actualText, expectedTexts[this.writeCalls++]);
    },
    writeCalls: 0,
    end: function () { }
  };
};

describe('Response', () => {
  describe('send', () => {
    it('should send the plain text', () => {
      const socket = mockSocket(['HTTP/1.1 200\r\ncontent-type:text/plain\r\n\r\nhello']);
      const response = new Response(socket);

      response.send('hello');
      assert.ok(socket.writeCalls === 1);
    });
  });

  describe('json', () => {
    it('should send the json', () => {
      const socket = mockSocket(['HTTP/1.1 200\r\ncontent-type:application/json\r\n\r\n{"a":1}']);
      const response = new Response(socket);

      const body = { a: 1 };

      response.status(200).json(body);
      assert.ok(socket.writeCalls === 1);
    });
  });

  describe('sendHtml', () => {
    it('should send the html page', () => {
      const socket = mockSocket(['HTTP/1.1 200\r\ncontent-type:text/html\r\n\r\n<h1>hello</h1>']);
      const response = new Response(socket);

      const body = '<h1>hello</h1>';

      response.sendHtml(body);
      assert.ok(socket.writeCalls === 1);
    });
  });

  describe('file', () => {
    it('should send file', () => {
      const socket = mockSocket([
        'HTTP/1.1 200\r\n',
        'content-length:5\r\n',
        '\r\n',
        'hello'
      ]);
      const response = new Response(socket);

      const body = 'hello';

      response.file(body);
      assert.ok(socket.writeCalls === 4);
    });
  });

  describe('redirect', () => {
    it('should redirect to given location', () => {
      const location = '/public/index.html';
      const socket = mockSocket([[
        'HTTP/1.1 302\r\n',
        `location:${location}\r\n`,
        'content-length:0\r\n',
        '\r\n',
        ''
      ].join('')]);

      const response = new Response(socket);

      response.redirect(location);
      assert.ok(socket.writeCalls === 1);
    });
  });
});
