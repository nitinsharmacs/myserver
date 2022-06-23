const { EndPoint } = require("./endPoint.js");

class Router {
  #routes;
  constructor() {
    this.#routes = {
      get: [],
      put: []
    };
  }

  #register(reqMethod, endPoint, action) {
    const route = {
      endPoint: new EndPoint(endPoint),
      reqMethod: reqMethod,
      action: action
    };

    this.#routes[reqMethod].push(route);
  }

  get(endPoint, action) {
    this.#register('get', endPoint, action);
  }

  put(endPoint, action) {
    this.#register('put', endPoint, action);
  }

  getRoute(reqMethod, reqEndPoint) {
    const routes = this.#routes[reqMethod];
    return routes.find(route => route.endPoint.matches(reqEndPoint));
  }

  getHandler(reqMethod, reqEndPoint) {
    const route = this.getRoute(reqMethod, reqEndPoint);

    if (route === undefined) {
      throw new Error('Route not found!');
    }

    const { action, endPoint } = route;

    const reqMeta = {
      reqMethod,
      reqEndPoint,
      ...endPoint.parse(reqEndPoint)
    };

    return (response) => {
      return action(reqMeta, response);
    };
  }

  runHandler({ method, uri }, response) {
    const handler = this.getHandler(method.toLowerCase(), uri);

    handler(response);
  }

  getRoutes(reqMethod) {
    return this.#routes[reqMethod];
  }
}

module.exports = {
  Router
};
