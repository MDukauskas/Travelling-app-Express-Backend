const {
  authentication_middleware
} = require('../authentication/authentication_middleware');
const { getMe } = require('./user');

module.exports = function(router) {
  router.get('/user/me', authentication_middleware, (req, res) => {
    return getMe(req, res, req.user.id);
  });
  return router;
};
