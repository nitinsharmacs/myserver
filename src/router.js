const { EndPoint } = require("./endPoint.js");

const createActionsIterator = (actions) => {
  let current = 0;
  return function (req, res, next) {
    actions[++current](req, res, () => {
      next(req, res, next);
    });
  };
};

class Route {
  constructor(reqMethod, endPoint, actions) {
    this.reqMethod = reqMethod;
    this.endPoint = endPoint;
    this.actions = actions;
  }

  runHandlers(request, response) {
    const reqMeta = {
      ...request,
      ...this.endPoint.parse(request.uri)
    };

    const next = createActionsIterator(this.actions);
    const [currentAction] = this.actions;

    currentAction(reqMeta, response, () => {
      next(reqMeta, response, next);
    })
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

  runHandler(request, response) {
    const { method, uri } = request;
    const route = this.getRoute(method.toLowerCase(), uri);

    route.runHandlers(request, response);
  }

  getRoutes(reqMethod) {
    return this.#routes.filter(route => route.reqMethod === reqMethod);
  }
}

module.exports = {
  Router
};
