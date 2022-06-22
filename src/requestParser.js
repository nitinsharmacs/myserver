/**
 * 
 * request 
 * 
 * METHOD SP REQUEST_URI SP HTTP_VERSION CRLF
 * HEADER1 CRLF
 * HEADER2 CRLF
 * CRLF
 * 
*/

const _ = require('lodash');

const splitRequest = (request) => {
  return request.split('\r\n');
};

const parseHeaderLine = (headerLine) => {
  const keyEnd = headerLine.indexOf(':');

  const key = headerLine.slice(0, keyEnd).trim().toLowerCase();
  const value = headerLine.slice(keyEnd + 1).trim().toLowerCase();

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
  const [requestLine, ...restOfRequest] = splitRequest(request);

  return {
    ...parseRequestLine(requestLine),
    headers: parseHeader(restOfRequest)
  };
};

module.exports = { parseRequest };
