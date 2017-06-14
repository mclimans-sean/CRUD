const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app')

const fixtures = require('./fixtures');

describe('CRUD hated', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      }).then(() => done())
  })

  it('Lists all Records', (done) => {
    request(app)
      .get('/api/v1/hated')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.hated);
        done();
      });
  });

  it('Lists a record by id', (done) => {
    request(app)
      .get('/api/v1/hated/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.hated[0]);
        done();
      });
  });

  it('Lists a record by id', (done) => {
    request(app)
      .get('/api/v1/hated/5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.hated[4]);
        done();
      });
  });

  it('Creates a record', (done) => {
    request(app)
      .post('/api/v1/hated')
      .send(fixtures.movie)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.movie.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.movie);
        done();
      })
  });

  it('Updates a record', (done) => {
    fixtures.movie.rating = 9;
    request(app)
      .put('/api/v1/hated/11')
      .send(fixtures.movie)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.movie);
        done();
      })
  });
  it('Deletes a record', (done) => {
    request(app)
      .delete('/api/v1/hated/11')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      })
  });
});
