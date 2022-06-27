const isParam = (pathElement) => {
  return pathElement.startsWith(':');
};

const refineParam = (param) => {
  return param.substring(1);
};

const getParams = (reqEndPoint, regEndPoint) => {
  const params = {};

  const regPath = regEndPoint.split('/');
  const reqPath = reqEndPoint.split('/');

  for (let index = 0; index < regPath.length; index++) {
    const regPathElement = regPath[index];
    if (isParam(regPathElement)) {
      params[refineParam(regPathElement)] = reqPath[index];
    }
  }

  return params;
};

const parseQueryParams = (reqEndPoint) => {
  const paramsStart = reqEndPoint.indexOf('?');
  let params = '';
  if (paramsStart >= 0) {
    params = reqEndPoint.slice(paramsStart + 1);
  }
  const searchParams = new URLSearchParams(params);
  return searchParams;
};

class EndPoint {
  #endPoint;
  constructor(endPoint) {
    this.#endPoint = endPoint;
  }

  getPathname() {
    const endPointParts = this.#endPoint.split('/');
    const pathnameParts = [];

    for (const endPointPart of endPointParts) {
      if (isParam(endPointPart)) {
        return pathnameParts.join('/');
      }

      pathnameParts.push(endPointPart);
    }

    return pathnameParts.join('/');
  }

  matches(reqEndPoint) {
    const pathname = this.getPathname();
    return reqEndPoint.startsWith(pathname);
  }

  parse(reqEndPoint) {
    const params = getParams(reqEndPoint, this.#endPoint);
    return {
      params,
      queryParams: parseQueryParams(reqEndPoint),
      endPoint: this.#endPoint,
      pathname: this.getPathname()
    };
  }
}

module.exports = { EndPoint, parseQueryParams };
