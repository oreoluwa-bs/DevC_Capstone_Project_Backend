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

  describe('POST /api/v1/auth/signin', () => {
    const data = {};
    beforeAll((done) => {
      Request.post(`http://localhost:${process.env.PORT || 5000}/api/v1/auth/signin`, {
        form: {
          email: 'huse@gmail.com',
          passoword: 'daadad',
        },
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
      it('Status 200', () => {
        expect(data.status).toBe(200);
      });
      it('Body', () => {
        expect(data.body).toEqual({
          status: 'error',
          message: 'Incorrect password or email address',
        });
      });
    });
  });

  describe('POST /api/v1/auth/create-user', () => {
    const data = {};
    beforeAll((done) => {
      Request.post(`http://localhost:${process.env.PORT || 5000}/api/v1/auth/create-user`, {
        form: {
          firstname: 'huey',
          lastname: 'fuse',
          email: 'huse@gmail.com',
          password: 'daadad',
          gender: 'male',
          jobrole: 'manager',
          department: 'sales',
          address: 'north carolina',
        },
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        console.log(data);
        done();
      });
      it('Status 200', () => {
        expect(data.status).toBe(200);
      });
      it('Body', () => {
        expect(data.body).toEqual({
          status: 'success',
          message: 'User account could not be created',
        });
      });
    });
  });

  describe('GET /api/v1/articles/1 when user is not authenticated', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`http://localhost:${process.env.PORT || 5000}/api/v1/articles/1`, (error, response, body) => {
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
