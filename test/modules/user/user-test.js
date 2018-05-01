require('../variables');

const mongoose = require('mongoose');
const { User } = require('../../../src/models/user');

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../../../src/index');
const should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
  let user = {
    email: 'test@gmail.com',
    password: 'testtest'
  };

  let userToken = '';
  let newPassword = { password: 'newpassword' };

  // Clears user database
  before(done => {
    chai
      .request(app)
      .post('/api/login')
      .send(user)
      .then(res => {
        userToken = res.headers['x-auth'];
        done();
      })
      .catch(e => {
        console.log(e);
      });
  });

  after(done => {
    chai
      .request(app)
      .put('/api/user/password')
      .set('x-auth', userToken)
      .send({ password: user.password })
      .then(res => {
        server.close();
        done();
      })
      .catch(e => {
        console.log(e);
      });
  });

  describe('/GET /api/user/me', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .get('/api/user/me')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return user object', done => {
      chai
        .request(app)
        .get('/api/user/me')
        .set('x-auth', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('email').eql(user.email);
          done();
        });
    });
  });
  describe('/PUT /api/user/password', () => {
    it('it should return 401 unauthorized', done => {
      chai
        .request(app)
        .put('/api/user/password')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should return status 200', done => {
      chai
        .request(app)
        .put('/api/user/password')
        .send(newPassword)
        .set('x-auth', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should let login with old password', done => {
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('it should let login with new password', done => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          ...user,
          password: newPassword.password
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql(user.email);
          res.should.have.header('x-auth');
          done();
        });
    });
  });
});
