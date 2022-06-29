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

  return `HTTP/1.1 ${status}\r\n${resHeaders}\r\n${body}`;
};

class Response {
  #socket;
  #status;
  #headers;
  #inChunkMode;
  constructor(socket) {
    this.#socket = socket;
    this.#status = 200;
    this.#headers = {};
    this.#inChunkMode = false;
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

  redirect(location) {
    this.setHeader('Location', location);
    this.setHeader('Content-Length', 0);
    this.#status = 302;

    this.#socket.write(httpResponse('', this.#status, this.#headers));

    this.#socket.end();
  }

  write(chunk) {
    if (!this.#inChunkMode) {
      this.setHeader('Transfer-encoding', 'chunked');
      this.#socket.write(httpResponse('', this.#status, this.#headers));
    }

    this.#inChunkMode = true;

    const chunkSize = chunk.length;
    this.#socket.write(chunkSize.toString(16) + CRLF);
    this.#socket.write(chunk);
    this.#socket.write(CRLF);
  }

  end() {
    this.#socket.write('0' + CRLF.repeat(2));
    this.#socket.end();
    this.#inChunkMode = false;
  }
}

module.exports = {
  Response,
  stringifyHeaders,
  httpResponse
};
