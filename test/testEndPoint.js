const assert = require('assert');
const { EndPoint } = require('../src/endpoint.js');

describe('EndPoint', () => {
  describe('getPathname', () => {
    it('should get path name from the endpoint path without params', () => {
      let endPointPath = '/';
      let endPoint = new EndPoint(endPointPath);
      let expected = '/';

      assert.strictEqual(endPoint.getPathname(), expected);

      endPointPath = '/interns';
      endPoint = new EndPoint(endPointPath);
      expected = '/interns';

      assert.strictEqual(endPoint.getPathname(endPointPath), expected);
    });

    it('should get path name from the endpoint path with params', () => {
      let endPointPath = '/interns/:id';
      let endPoint = new EndPoint(endPointPath);
      let expected = '/interns';

      assert.strictEqual(endPoint.getPathname(), expected);
    });
  });

  describe('matches', () => {
    it('should verify the requested end point matches', () => {
      let reqEndPoint = '/';
      let endPoint = new EndPoint('/');

      assert.ok(endPoint.matches(reqEndPoint));

      reqEndPoint = '/interns';
      endPoint = new EndPoint('/interns');

      assert.ok(endPoint.matches(reqEndPoint));

      reqEndPoint = '/something-else';
      endPoint = new EndPoint('/interns');

      assert.ok(!endPoint.matches(reqEndPoint));
    });

    it('should verify the requested end point with params matches', () => {
      const reqEndPoint = '/interns/nitin';
      const endPoint = new EndPoint('/interns/:name');

      assert.ok(endPoint.matches(reqEndPoint));
    });
  });

  describe('parse', () => {
    it('should parse requested endpoint', () => {
      const endPoint = new EndPoint('/interns');
      const reqEndPoint = '/interns';

      const expected = {
        endPoint: '/interns',
        pathname: '/interns',
        params: {},
        queryParams: new URLSearchParams()
      };

      assert.deepStrictEqual(endPoint.parse(reqEndPoint), expected);
    });

    it('should parse requested end point with single param', () => {
      const endPoint = new EndPoint('/interns/:name');
      const reqEndPoint = '/interns/nitin';

      const expected = {
        endPoint: '/interns/:name',
        pathname: '/interns',
        params: {
          name: 'nitin'
        },
        queryParams: new URLSearchParams()
      };

      assert.deepStrictEqual(endPoint.parse(reqEndPoint), expected);
    });

    it('should parse path with multiple params', () => {
      const endPoint = new EndPoint('/interns/:name/:emp_id');
      const reqEndPoint = '/interns/nitin/29505';

      const expected = {
        endPoint: '/interns/:name/:emp_id',
        pathname: '/interns',
        params: {
          name: 'nitin',
          emp_id: '29505'
        },
        queryParams: new URLSearchParams()
      };

      assert.deepStrictEqual(endPoint.parse(reqEndPoint), expected);
    });

    it('should parse query params', () => {
      const endPoint = new EndPoint('/interns');
      const reqEndPoint = '/interns?name=nitin';

      const expected = {
        endPoint: '/interns',
        pathname: '/interns',
        params: {},
        queryParams: new URLSearchParams('name=nitin')
      };

      assert.deepStrictEqual(endPoint.parse(reqEndPoint), expected);
    });
  });
});
