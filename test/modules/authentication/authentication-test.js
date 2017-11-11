process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let { User } = require('../../../src/models/user');

// Require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let { app, server } = require('../../../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Authenticate', () => {
  const user = {
    email: 'test@gmail.com',
    password: 'testtest'
  };

  const userShortPassword = {
    email: 'test@gmail.com',
    password: 'test'
  };

  let userToken = '';

  // Clears user database
  before((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  after( done => {
    server.close();
    done();
  });

  describe('/POST /api/register', () => {

    it('it should return error too short pass', (done) => {
      chai.request(app)
        .post('/api/register')
        .send(userShortPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`User validation failed: password: Path \`password\` (\`${userShortPassword.password}\`) is shorter than the minimum allowed length (6).`);
          done();
        });
    })

    it('it should return user object and x-auth header', (done) => {
      chai.request(app)
        .post('/api/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql(user.email);
          res.should.have.header('x-auth');
          done();
        });
    })

    it('it should return error that email is in use', (done) => {
      chai.request(app)
        .post('/api/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Email is in use');
          done();
        });
    });
  });

  describe('/POST /api/login', () => {
    it('should return user object and x-auth header', (done) => {
      chai.request(app)
        .post('/api/login')
        .send(user)
        .end( ( err, res ) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql(user.email);
          res.should.have.header('x-auth');

          userToken = res.headers['x-auth'];
          done();
        })
    });

    it('should return status 401 unauthorized', (done) => {
      chai.request(app)
        .post('/api/login')
        .send(userShortPassword)
        .end( ( err, res ) => {
          res.should.have.status(401);
          res.body.should.be.a('object').eql({});
          res.body.should.not.have.property('email').eql(user.email);
          res.should.not.have.header('x-auth');
          done();
        });
    });
  });

  describe('/DELETE /api/logout', () =>{
    it('should return status 401 unauthorized', done => {
      chai.request(app)
        .delete('/api/logout')
        .end( (err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should return status 200', done => {
      chai.request(app)
        .delete('/api/logout')
        .set('x-auth', userToken)
        .end( (err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
