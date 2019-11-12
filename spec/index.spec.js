// /* eslint-disable no-undef */
const Request = require('request');

describe('Server', () => {
  let server;

  beforeAll(() => {
    // eslint-disable-next-line global-require
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /api/v1/gifs/1 when user is not authenticated', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`http://localhost:${process.env.PORT || 5000}/api/v1/gifs/1`, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body).toEqual({
        status: 'error',
        message: 'User not authenticated',
      });
    });
  });

  describe('POST /api/v1/auth/signin when user does not have an account', () => {
    const data = {};
    beforeAll((done) => {
      // Request.post(`http://localhost:${process.env.PORT || 5000}/api/v1/auth/signin`, {
      //   body: {
      //     email: 'huse@gmail.com',
      //     passoword: 'daadad',
      //   },
      // })
    });
  });

  describe('GET /api/v1/feed/', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`http://localhost:${process.env.PORT || 5000}/api/v1/feed/`, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body).toEqual({
        status: 'error',
        message: 'User not authenticated',
      });
    });
  });
});
