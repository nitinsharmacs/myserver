const { EndPoint } = require("./endPoint.js");

class Route {
  #currentIndex;
  constructor(reqMethod, endPoint, actions) {
    this.reqMethod = reqMethod;
    this.endPoint = endPoint;
    this.actions = actions;
    this.#currentIndex = 0;
  }

  next() {
    return this.actions[++this.#currentIndex];
  }
}

class Router {
  #routes;
  constructor() {
    this.#routes = [];
  }

  #register(reqMethod, endPoint, actions) {
    const route = new Route(reqMethod, new EndPoint(endPoint), actions);

    this.#routes.push(route);
  }

  get(endPoint, ...actions) {
    this.#register('get', endPoint, actions);
  }

  put(endPoint, ...actions) {
    this.#register('put', endPoint, actions);
  }

  getRoute(reqMethod, reqEndPoint) {
    return this.#routes.find(
      route => route.reqMethod === reqMethod &&
        route.endPoint.matches(reqEndPoint)
    );
  }

  getHandler(reqMethod, reqEndPoint) {
    const route = this.getRoute(reqMethod, reqEndPoint);

    if (route === undefined) {
      throw new Error('Route not found!');
    }

    const { actions: [action], endPoint } = route;

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
    return this.#routes.filter(route => route.reqMethod === reqMethod);
  }
}

module.exports = {
  Router
};
