const _ = require('lodash');

const splitRequest = (request) => {
  const [requestLine, ...restOfRequest] = request.split('\r\n');

  const endOfHeaders = restOfRequest.lastIndexOf('');
  const rawHeaders = restOfRequest.slice(0, endOfHeaders);
  const [rawBody] = restOfRequest.slice(endOfHeaders + 1);

  return { requestLine, rawHeaders, rawBody };
};

const parseHeaderLine = (headerLine) => {
  const keyEnd = headerLine.indexOf(':');

  const key = headerLine.slice(0, keyEnd).trim().toLowerCase();
  const value = headerLine.slice(keyEnd + 1).trim();

  return { key, value };
};

const parseHeader = (lines) => {
  const headers = {};
  let index = 0;

  let line = lines[index];
  while (index < lines.length && line.length > 0) {
    const { key, value } = parseHeaderLine(line);
    headers[key] = value;
    line = lines[++index];
  }

  return headers;
};

const parseRequestLine = (requestLine) => {
  const [method, uri, version] = _.compact(requestLine.split(' '));
  return { method, uri, version };
};

const parseRequest = (request) => {
  const { requestLine, rawHeaders, rawBody } = splitRequest(request);
  return {
    ...parseRequestLine(requestLine),
    headers: parseHeader(rawHeaders),
    rawBody
  };
};

module.exports = { parseRequest };
