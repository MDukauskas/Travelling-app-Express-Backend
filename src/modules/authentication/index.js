const { login, logout, register } = require('./authenticate');
const { authentication_middleware } = require('./authentication_middleware');

module.exports = function(router){
  router.post('/login', login);
  router.delete('/logout',authentication_middleware, logout);
  router.post('/register', register);

  return router;
}
