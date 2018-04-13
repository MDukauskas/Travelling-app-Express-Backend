const {
  authentication_middleware
} = require('../authentication/authentication_middleware');
const {
  addJouney,
  updateJourney,
  deleteJourney,
  getJourney,
  getAllUserJourneys
} = require('./journey');

module.exports = function(router) {
  router
    .get('/journey', authentication_middleware, (req, res) => {
      return getAllUserJourneys(req, res, req.user.id);
    })
    .get('/journey/:journey_id', authentication_middleware, getJourney)
    .post('/journey', authentication_middleware, addJouney)
    .put('/journey/:journey_id', authentication_middleware, updateJourney)
    .delete('/journey/:journey_id', authentication_middleware, deleteJourney)
    .use('/journey', require('./geopoint/index')(router));

  return router;
};
