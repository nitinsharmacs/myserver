const assert = require('assert');
const { Router } = require('../src/router.js');
const { EndPoint } = require('../src/endpoint.js');

describe('Router', () => {
  describe('get', () => {
    it('should register get end point', () => {
      const router = new Router();
      const handler = () => { };

      router.get('/', handler);

      const expected = [
        {
          endPoint: new EndPoint('/'),
          reqMethod: 'get',
          actions: [handler]
        }
      ];

      const getMiddleWaress = router.getRoutes('get');
      assert.deepEqual(getMiddleWaress, expected);
    });

    it('should register get end point with params', () => {
      const router = new Router();
      const handler = () => { };
      router.get('/interns/:id', handler);
      const expected = [
        {
          endPoint: new EndPoint('/interns/:id'),
          reqMethod: 'get',
          actions: [handler]
        }
      ];

      const getMiddleWaress = router.getRoutes('get');
      assert.deepEqual(getMiddleWaress, expected);
    });
  });

  describe('put', () => {
    it('should register put end point', () => {
      const router = new Router();
      const handler = () => { };
      router.put('/update', handler);
      const expected = [
        {
          endPoint: new EndPoint('/update'),
          reqMethod: 'put',
          actions: [handler]
        }
      ];

      const getMiddleWaress = router.getRoutes('put');
      assert.deepEqual(getMiddleWaress, expected);
    });

    it('should register put end point with params', () => {
      const router = new Router();
      const handler = () => { };
      router.put('/interns/:id', handler);
      const expected = [
        {
          endPoint: new EndPoint('/interns/:id'),
          reqMethod: 'put',
          actions: [handler]
        }
      ];

      const getMiddleWaress = router.getRoutes('put');
      assert.deepEqual(getMiddleWaress, expected);
    });
  });

  describe('getRoutePosition', () => {
    it('should get the matching route position', () => {
      const reqEndPoint = '/';
      const handler = () => { };

      const router = new Router();
      router.get(reqEndPoint, handler);

      const expectedRoutePos = 0;

      const actualRoutePos = router.getRoutePosition('get', reqEndPoint);
      assert.deepEqual(actualRoutePos, expectedRoutePos);
    });

    it('should get the matching route position from routes', () => {
      const reqEndPoint1 = '/interns';
      const reqEndPoint2 = '/mentors';
      const handler = () => { };

      const router = new Router();
      router.get(reqEndPoint1, handler);
      router.get(reqEndPoint2, handler);

      const expectedRoutePos = 0

      const actualRoutePos = router.getRoutePosition('get', reqEndPoint1);
      assert.deepEqual(actualRoutePos, expectedRoutePos);
    });

    it('should get the matching route position with params', () => {
      const reqEndPoint1 = '/interns';
      const reqEndPoint2 = '/mentors/:name';
      const handler = () => { };

      const router = new Router();
      router.get(reqEndPoint1, handler);
      router.get(reqEndPoint2, handler);

      const expectedRoutePos = 1

      const actualRoutePos = router.getRoutePosition('get', reqEndPoint2);
      assert.deepEqual(actualRoutePos, expectedRoutePos);
    });
  });

  describe('getMiddleWares', () => {
    it('should give all middlewares before the end point', () => {
      const router = new Router();
      const mid1 = () => 2;
      const mid2 = () => 2;
      const handler = () => 5;
      router.use(mid1);
      router.use(mid2);
      router.get('/', handler);

      const middleWares = router.getMiddleWares(
        router.getRoutePosition('get', '/')
      );
      assert.deepStrictEqual(middleWares, [mid1, mid2]);
    });

    it('should give all middlewares in single use', () => {
      const router = new Router();
      const mid1 = () => 2;
      const mid2 = () => 2;
      const handler = () => 5;
      router.use(mid1, mid2);
      router.get('/', handler);

      const middleWares = router.getMiddleWares(
        router.getRoutePosition('get', '/')
      );
      assert.deepStrictEqual(middleWares, [mid1, mid2]);
    });

    it('should not give middleware comes after the end point', () => {
      const router = new Router();
      const mid1 = () => 2;
      const mid2 = () => 2;
      const handler = () => 5;
      router.use(mid1);
      router.get('/', handler);
      router.use(mid2);

      const middleWares = router.getMiddleWares(
        router.getRoutePosition('get', '/')
      );
      assert.deepStrictEqual(middleWares, [mid1]);
    });
  });

  describe('runHandler', () => {
    it('should run the matched handler', () => {
      const router = new Router();
      const handlerResults = [];
      const handler = (req, res) => { handlerResults.push('hello') };
      router.get('/', handler);

      const req = { method: 'get', uri: '/' };
      const res = {};

      const expected = ['hello'];
      router.runHandler(req, res);
      assert.deepStrictEqual(handlerResults, expected);
    });

    it('should run handler chain', () => {
      const router = new Router();
      const handlerResults = [];
      const handler1 = (req, res, next) => {
        handlerResults.push('hello');
        next();
      };
      const handler2 = (req, res) => {
        handlerResults.push('world');
      };
      router.get('/', handler1, handler2);

      const req = { method: 'get', uri: '/' };
      const res = {};

      const expected = ['hello', 'world'];
      router.runHandler(req, res);
      assert.deepStrictEqual(handlerResults, expected);
    });

    it('should run middlewares', () => {
      const router = new Router();
      const middleWaresResults = [];

      const middleWare = (req, res) => {
        middleWaresResults.push('hello');
      };

      router.use(middleWare);

      const req = { method: 'get', uri: '/' };
      const res = {};

      const expected = ['hello'];
      router.runHandler(req, res);
      assert.deepStrictEqual(middleWaresResults, expected);
    });
  });
});
