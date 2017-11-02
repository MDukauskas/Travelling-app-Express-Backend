const { User } = require('../../models/user');
const _ = require('lodash');

const login = ( req, res ) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findOne({'email': body.email, 'password': body.password}).then((user) => {

    if(!user){
      return Promise.reject();
    }

    user.generateAuthToken()
      .then((token) => {
        res.header({'x-auth': token}).send(user);
      }).catch(err => {
        res.status(400).send(err);
      });

  }).catch(err => {
    res.status(401).send();
  });
}

const logout = ( req, res ) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
}

const register = ( req, res ) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findOne({'email': body.email}).then((user) => {

    if(user){
      return res.status(422).send({error: 'Email is in use'});
    }

    var newUser = new User(body);
    newUser.save().then(userObject => {
      return userObject.generateAuthToken();
    }).then((token) => {
      res.header({'x-auth': token}).send(newUser);
    }).catch(err => {
      res.status(400).send(err);
    });

  }).catch(err => {
    res.status(401).send();
  });
}

module.exports = { login, logout, register }
