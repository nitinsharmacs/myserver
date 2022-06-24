const { toSafeInteger } = require("lodash");

const CRLF = '\r\n';

const stringifyHeaders = (headers) => {
  return Object.entries(headers).map(
    ([header, value]) => `${header}:${value}${CRLF}`
  ).join('');
};

const reponseLine = (status) => {
  return `HTTP/1.1 ${status}\r\n`;
};

const httpResponse = (body, status, headers) => {
  const resHeaders = stringifyHeaders(headers);

  return `HTTP/1.1 ${status}\r\n${resHeaders}\r\n${body}\r\n`;
};

class Response {
  #socket;
  #status;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#status = 200;
    this.#headers = {};
  }

  setHeader(header, value) {
    this.#headers[header.toLowerCase()] = value;
  }

  status(statusCode) {
    this.#status = statusCode;
    return this;
  }

  send(text) {
    this.setHeader('Content-Type', 'text/plain');

    this.#socket.write(httpResponse(text, this.#status, this.#headers));
    this.#socket.end();
  }

  json(jsonData) {
    const jsonString = JSON.stringify(jsonData);
    this.setHeader('Content-Type', 'application/json');

    this.#socket.write(httpResponse(jsonString, this.#status, this.#headers));

    this.#socket.end();
  }

  sendHtml(html) {
    this.setHeader('Content-Type', 'text/html');

    this.#socket.write(httpResponse(html, this.#status, this.#headers));

    this.#socket.end();
  }

  file(data) {
    this.setHeader('Content-Length', data.length);

    this.#socket.write(reponseLine(this.#status));
    this.#socket.write(stringifyHeaders(this.#headers));
    this.#socket.write(CRLF);

    this.#socket.write(data);

    this.#socket.end();
  }
}

module.exports = {
  Response,
  stringifyHeaders,
  httpResponse
};
