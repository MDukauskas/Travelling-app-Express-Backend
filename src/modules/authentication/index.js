const { login, logout, register } = require('./authenticate');
const { authenticate } = require('./authenticate_middleware');

module.exports = function(router){
  router.post("/login", login);
  router.delete("/logout",authenticate, logout);
  router.post("/register", register);

  return router;
}
