const Request = require('request');

describe('Server', () => {
  let server;

  beforeAll(() => {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    const data = {};

    beforeAll((done) => {
      Request.get(`http:/localhost:${process.env.PORT || 5000}/`, (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.status).toBe({});
    });
  });

  describe('GET /', () => {
    const data = {};

    beforeAll((done) => {
      Request.get(`http:/localhost:${process.env.PORT || 5000}/`, (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.status).toBe({});
    });
  });
});
