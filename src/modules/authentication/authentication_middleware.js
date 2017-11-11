const { User } = require('../../models/user');

const authentication_middleware = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then( user => {
    if(!user){
      return Promise.reject();
    }

    req.token = token;
    req.user = user;
    next();
  }).catch( e => {
    res.status(401).send();
  })
};

module.exports = { authentication_middleware };
