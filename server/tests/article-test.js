import supertest from 'supertest';
import chai, { expect } from 'chai';
import httpStatus from 'http-status';
import responseAssertion from './helpers/responseAssertion';
import Joi from 'joi';
import faker from 'faker';

chai.use(responseAssertion);

describe('Article endpoints', () => {
  let server;
  let request;

  const articleSchema = Joi.object().keys({
    id: Joi.number().integer().min(1),
    title: Joi.string().min(10).max(200).required(),
    content: Joi.string().min(50).max(60000).required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
  });

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
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.items[0]).to.be.an.item(articleSchema);
          return done();
        })
    );
  });

  describe('POST /api/articles', () => {
    it('fails validation for invalid article data',
      done => request
        .post('/api/articles')
        .send({
          title: 'Test title',
          content: 'Too small title',
        })
        .expect('Content-type', /json/)
        .expect(httpStatus.UNPROCESSABLE_ENTITY)
        .end(done)
    );

    it('creates new article',
      done => request
        .post('/api/articles')
        .send({
          title: faker.lorem.sentence(),
          content: faker.lorem.sentences(10),
        })
        .expect('Content-type', /json/)
        .expect(httpStatus.CREATED)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.item).to.be.an.item(articleSchema);
          return done();
        })
    );
  });
});
