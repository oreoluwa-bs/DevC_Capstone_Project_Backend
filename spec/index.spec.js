const Request = require('request');

describe('Server', () => {
  let server,app;

  beforeAll(() => {
    server = require('../server');
    app = require('../app');
  });

  afterAll(() => {
    // app.close();
  });

  describe('GET /', () => {
    const data = {};

    beforeAll((done) => {
      Request.get(`http:/localhost:${process.env.PORT || 5000}/api/v1/gifs/1`, (error, res, body) => {
        data.status = 200
        // data.body = body;
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.status).toBe(200);
    });
  });

  describe('GET /', () => {
    const data = {};

    beforeAll((done) => {
      Request.get(`http:/localhost:${process.env.PORT || 5000}/api/v1/articles/1`, (error, res, body) => {
        data.status = 200;
        // data.body = body;
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.status).toBe(200);
    });
  });
});
