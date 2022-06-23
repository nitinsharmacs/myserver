const CRLF = '\r\n';

const stringifyHeaders = (headers) => {
  return Object.entries(headers).map(
    ([header, value]) => `${header}:${value}${CRLF}`
  ).join('');
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
  }

  json(jsonData) {
    const jsonString = JSON.stringify(jsonData);
    this.setHeader('Content-Type', 'application/json');
    this.#socket.write(httpResponse(jsonString, this.#status, this.#headers));
  }

  sendHtml(html) {
    this.setHeader('Content-Type', 'text/html');
    this.#socket.write(httpResponse(html, this.#status, this.#headers));
  }
}

module.exports = {
  Response,
  stringifyHeaders,
  httpResponse
};
