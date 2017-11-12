const { authentication_middleware } = require('../authentication/authentication_middleware');
const { addJouney, editJourney, deleteJourney, getJourney, getAllUserJourneys } = require('./journey');

module.exports = function(router){
  router
    .get('/journey',authentication_middleware, (req, res) => {
      return getAllUserJourneys(req, res, req.user.id);
    })
    .post('/journey',authentication_middleware, addJouney)

  router
    .get('/journey/:id',authentication_middleware, getJourney)
    .put('/journey/:id', authentication_middleware, editJourney)
    .delete('/journey/:id', authentication_middleware, deleteJourney)

  return router;
}
