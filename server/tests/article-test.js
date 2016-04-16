import supertest from 'supertest';
import chai, { expect } from 'chai';
import httpStatus from 'http-status';

describe('Article endpoints', () => {
  let server;
  let request;

  beforeEach(() => {
    delete require.cache[require.resolve('../bin/www')];
    server = require('../bin/www');
    request = supertest(server);
  });

  afterEach(done => server.close(done));

  describe('GET /api/articles', () => {
    it('returns articles list',
      done => request
        .get('/api/articles')
        .expect('Content-type', /json/)
        .expect(httpStatus.OK)
        .end(done)
    );
  });
});
