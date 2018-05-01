const {
  authentication_middleware
} = require('../authentication/authentication_middleware');
const { getMe, updateUser, updateUserPassword } = require('./user');

module.exports = function(router) {
  router.get('/user/me', authentication_middleware, (req, res) => {
    return getMe(req, res, req.user.id);
  });
  router.put('/user/', authentication_middleware, (req, res) => {
    return updateUser(req, res, req.user.id);
  });
  router.put('/user/password', authentication_middleware, (req, res) => {
    return updateUserPassword(req, res, req.user.id);
  });
  return router;
};
