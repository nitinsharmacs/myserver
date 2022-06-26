const { EndPoint } = require("./endPoint.js");

const createActionsIterator = (actions) => {
  let current = -1;
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

  isMiddleWare() {
    return this.endPoint.useEndPoint;
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

  use(...actions) {
    const route = new Route('use', {
      matches: () => false,
      useEndPoint: true
    }, actions);

    this.#routes.push(route);
  }

  get(endPoint, ...actions) {
    this.#register('get', endPoint, actions);
  }

  put(endPoint, ...actions) {
    this.#register('put', endPoint, actions);
  }

  getRoutePosition(reqMethod, reqEndPoint) {
    return this.#routes.findIndex(
      route => route.reqMethod === reqMethod &&
        route.endPoint.matches(reqEndPoint)
    );
  }

  getMiddleWares(pos) {
    return this.#routes.slice(0, pos).filter(route => route.isMiddleWare()).flatMap(route => route.actions);
  }

  runHandler(request, response) {
    const { method, uri } = request;
    const routePos = this.getRoutePosition(method.toLowerCase(), uri);
    const route = this.#routes[routePos];

    const reqMeta = {
      ...request,
      ...route.endPoint.parse(request.uri)
    };

    const middleWares = this.getMiddleWares(routePos);
    const actions = [...middleWares, ...route.actions];
    const actionsIterator = createActionsIterator(actions);

    actionsIterator(reqMeta, response, () => {
      actionsIterator(reqMeta, response, actionsIterator);
    })
  }

  getRoutes(reqMethod) {
    return this.#routes.filter(route => route.reqMethod === reqMethod);
  }
}

module.exports = {
  Router
};
