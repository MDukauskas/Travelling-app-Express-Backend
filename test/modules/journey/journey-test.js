require('../variables');

const mongoose = require('mongoose');
const { User } = require('../../../src/models/user');
const { Journey } = require('../../../src/models/journey');

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../../../src/index');
const should = chai.should();

chai.use(chaiHttp);

describe('Journey', () => {
  let user = {
    email: 'test@gmail.com',
    password: 'testtest'
  };

  let journey = {
    title: 'test title 1',
    description: 'test description 1'
  };

  let journeyUpdated = {
    title: 'test title 1',
    description: 'test description 1'
  };

  let userToken = '';
  let journeyId = '';

  // Clears user database
  before(done => {
    Journey.remove({})
      .then(() => {
        return chai
          .request(app)
          .post('/api/login')
          .send(user);
      })
      .then(res => {
        userToken = res.headers['x-auth'];
        done();
      })
      .catch(e => {
        console.log(e);
      });
  });

  after(done => {
    server.close();
    done();
  });

  describe('/POST /api/journey', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .post('/api/journey')
        .send(journey)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journey object', done => {
      chai
        .request(app)
        .post('/api/journey')
        .set('x-auth', userToken)
        .send(journey)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('title').eql(journey.title);
          res.body.should.have.property('description').eql(journey.description);
          res.body.should.have.property('geopoints').a('array');
          res.body.should.have.property('geopoints').length(0);

          journeyId = res.body._id;
          done();
        });
    });
  });

  describe('/PUT /api/journey/:journey_id', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .put(`/api/journey/${journeyId}`)
        .send(journey)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journey object', done => {
      chai
        .request(app)
        .put(`/api/journey/${journeyId}`)
        .set('x-auth', userToken)
        .send(journeyUpdated)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('title').eql(journeyUpdated.title);
          res.body.should.have
            .property('description')
            .eql(journeyUpdated.description);

          journeyId = res.body._id;
          done();
        });
    });
  });

  describe('/GET /api/journey', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .get('/api/journey')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journeys array', done => {
      chai
        .request(app)
        .get('/api/journey')
        .set('x-auth', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.be.length(1);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('title').eql(journey.title);
          res.body[0].should.have
            .property('description')
            .eql(journey.description);
          res.body[0].should.have.property('geopoints').a('array');
          res.body[0].should.have.property('geopoints').length(0);
          done();
        });
    });
  });

  describe('/GET /api/journey/:journey_id', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .get(`/api/journey/${journeyId}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journey object', done => {
      chai
        .request(app)
        .get(`/api/journey/${journeyId}`)
        .set('x-auth', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(journeyId);
          res.body.should.have.property('title').eql(journey.title);
          res.body.should.have.property('description').eql(journey.description);
          res.body.should.have.property('geopoints').a('array');
          res.body.should.have.property('geopoints').length(0);
          done();
        });
    });
    describe('/DELETE /api/journey/:journey_id', () => {
      it('it should return 401 unauthorized', done => {
        chai
          .request(app)
          .delete(`/api/journey/${journeyId}`)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });

      it('it should return journey object', done => {
        chai
          .request(app)
          .delete(`/api/journey/${journeyId}`)
          .set('x-auth', userToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id').eql(journeyId);
            res.body.should.have.property('title').eql(journey.title);
            res.body.should.have
              .property('description')
              .eql(journey.description);
            res.body.should.have.property('geopoints').a('array');
            res.body.should.have.property('geopoints').length(0);
            done();
          });
      });
      it('it should return status 404', done => {
        chai
          .request(app)
          .delete(`/api/journey/${journeyId}`)
          .set('x-auth', userToken)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
