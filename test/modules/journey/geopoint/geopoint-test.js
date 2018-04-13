require('../../variables');

const mongoose = require('mongoose');
const { User } = require('../../../../src/models/user');
const { Geopoint } = require('../../../../src/models/geopoint');

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../../../../src/index');
const should = chai.should();

chai.use(chaiHttp);

describe('Geopoint', () => {
  let user = {
    email: 'test@gmail.com',
    password: 'testtest'
  };

  let journey = {
    title: 'test title 1',
    description: 'test description 1'
  };

  let geopoint = {
    title: 'test_point title 4',
    description: 'test point description 4',
    lng: 123.25,
    lat: -1234
  };

  let userToken = '';
  let journeyId = '';
  let geopointId = '';

  // Clears user database
  before(done => {
    Geopoint.remove({})
      .then(() => {
        return chai
          .request(app)
          .post('/api/login')
          .send(user);
      })
      .then(res => {
        userToken = res.headers['x-auth'];
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
            res.body.should.have
              .property('description')
              .eql(journey.description);
            res.body.should.have.property('geopoints').a('array');
            res.body.should.have.property('geopoints').length(0);

            journeyId = res.body._id;
            done();
          });
      })
      .catch(e => {
        console.log(e);
      });
  });

  after(done => {
    server.close();
    done();
  });

  // ADD JOURNEY GEOPOINT
  describe('/POST /api/journey/:journey_id/geopoint', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .post(`/api/journey/${journeyId}/geopoint`)
        .send(journey)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journey geopoint object', done => {
      chai
        .request(app)
        .post(`/api/journey/${journeyId}/geopoint`)
        .set('x-auth', userToken)
        .send(geopoint)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('title').eql(geopoint.title);
          res.body.should.have
            .property('description')
            .eql(geopoint.description);
          res.body.should.have.property('lng').equal(geopoint.lng);
          res.body.should.have.property('lat').equal(geopoint.lat);
          geopointId = res.body._id;
          done();
        });
    });
  });

  // GET JOURNEY ALL GEOPOINTS
  describe('/GET /api/journey/:journey_id/geopoint', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .get(`/api/journey/${journeyId}/geopoint`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journey geopoints array', done => {
      chai
        .request(app)
        .get(`/api/journey/${journeyId}/geopoint`)
        .set('x-auth', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.be.length(1);
          done();
        });
    });
  });

  // GET JOURNEY GEOPOINT
  describe('/GET /api/journey/:journey_id/geopoint/:geopoint_id', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .get(`/api/journey/${journeyId}/geopoint/${geopointId}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return journey geopoint object', done => {
      chai
        .request(app)
        .get(`/api/journey/${journeyId}/geopoint/${geopointId}`)
        .set('x-auth', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(geopointId);
          res.body.should.have.property('title').eql(geopoint.title);
          res.body.should.have
            .property('description')
            .eql(geopoint.description);
          res.body.should.have.property('lng').eql(geopoint.lng);
          res.body.should.have.property('lat').eql(geopoint.lat);
          done();
        });
    });
  });
});
