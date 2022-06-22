const assert = require('assert');
const { parseRequest } = require('../src/requestParser.js');

const CRLF = '\r\n';

describe('parseRequest', () => {
  it('should parse request without headers', () => {
    const request = 'GET / HTTP/1.1';

    const expected = {
      method: 'GET',
      uri: '/',
      version: 'HTTP/1.1',
      headers: {}
    };

    assert.deepStrictEqual(parseRequest(request), expected);
  });

  it('should parse request with headers', () => {
    const request = `GET /home HTTP/1.1${CRLF}User-Agent: chrome${CRLF}H:ef3${CRLF}${CRLF}`;

    const expected = {
      method: 'GET',
      uri: '/home',
      version: 'HTTP/1.1',
      headers: {
        'user-agent': 'chrome',
        h: 'ef3'
      }
    };

    assert.deepStrictEqual(parseRequest(request), expected);
  });
});
