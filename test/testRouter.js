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
          action: handler
        }
      ];

      const getHandlers = router.getRoutes('get');
      assert.deepEqual(getHandlers, expected);
    });

    it('should register get end point with params', () => {
      const router = new Router();
      const handler = () => { };
      router.get('/interns/:id', handler);
      const expected = [
        {
          endPoint: new EndPoint('/interns/:id'),
          reqMethod: 'get',
          action: handler
        }
      ];

      const getHandlers = router.getRoutes('get');
      assert.deepEqual(getHandlers, expected);
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
          action: handler
        }
      ];

      const getHandlers = router.getRoutes('put');
      assert.deepEqual(getHandlers, expected);
    });

    it('should register put end point with params', () => {
      const router = new Router();
      const handler = () => { };
      router.put('/interns/:id', handler);
      const expected = [
        {
          endPoint: new EndPoint('/interns/:id'),
          reqMethod: 'put',
          action: handler
        }
      ];

      const getHandlers = router.getRoutes('put');
      assert.deepEqual(getHandlers, expected);
    });
  });

  describe('getRoute', () => {
    it('should find the matching route', () => {
      const reqEndPoint = '/';
      const handler = () => { };

      const router = new Router();
      router.get(reqEndPoint, handler);

      const expectedRoute = {
        endPoint: new EndPoint(reqEndPoint),
        reqMethod: 'get',
        action: handler
      };

      const actualRoute = router.getRoute('get', reqEndPoint);
      assert.deepEqual(actualRoute, expectedRoute);
    });

    it('should find the matching route from routes', () => {
      const reqEndPoint1 = '/interns';
      const reqEndPoint2 = '/mentors';
      const handler = () => { };

      const router = new Router();
      router.get(reqEndPoint1, handler);
      router.get(reqEndPoint2, handler);

      const expectedRoute = {
        endPoint: new EndPoint('/interns'),
        reqMethod: 'get',
        action: handler
      };

      const actualRoute = router.getRoute('get', reqEndPoint1);
      assert.deepEqual(actualRoute, expectedRoute);
    });

    it('should find the matching route with params in reqEndPoint', () => {
      const reqEndPoint1 = '/interns';
      const reqEndPoint2 = '/mentors/:name';
      const handler = () => { };

      const router = new Router();
      router.get(reqEndPoint1, handler);
      router.get(reqEndPoint2, handler);

      const expectedRoute = {
        endPoint: new EndPoint('/mentors/:name'),
        reqMethod: 'get',
        action: handler
      };

      const actualRoute = router.getRoute('get', reqEndPoint2);
      assert.deepEqual(actualRoute, expectedRoute);
    });
  });

  describe('getHandler', () => {
    it('should give the handler registered on the end point', () => {
      const router = new Router();
      const handler = () => 5;
      router.get('/', handler);

      const actualHandler = router.getHandler('get', '/');
      assert.strictEqual(actualHandler(), handler());
    });

    it('should pass request meta to registered handler', () => {
      const router = new Router();
      const handler = (req) => req;
      router.get('/', handler);

      const expectedMeta = {
        endPoint: '/',
        reqMethod: 'get',
        pathname: '/',
        params: {},
        reqEndPoint: '/'
      };

      const actualMeta = router.getHandler('get', '/')();
      assert.deepStrictEqual(actualMeta, expectedMeta);
    });

    it('should throw error if no route found', () => {
      const router = new Router();
      const handler = (req) => req;
      router.get('/interns', handler);

      assert.throws(() => {
        router.getHandler('get', '/something-else')
      });
    });
  });
});
