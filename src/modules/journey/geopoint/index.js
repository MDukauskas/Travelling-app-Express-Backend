const { authentication_middleware } = require('../../authentication/authentication_middleware');
const { geopoint_authorization_middleware } = require('./geopoint_authorization_middleware')

const {
  getJourneyGeopoint,
  addJourneyGeopoint,
  updateJourneyGeopoint,
  deleteJourneyGeopoint,
  getJourneyAllGeopoints,
  deleteJourneyAllGeopoints
} = require('./geopoint');

module.exports = function(router){
  router
    .get('/:journey_id/geopoint/:geopoint_id', authentication_middleware, getJourneyGeopoint)
    .post('/:journey_id/geopoint', authentication_middleware, geopoint_authorization_middleware, addJourneyGeopoint)
    .put('/:journey_id/geopoint/:geopoint_id', authentication_middleware, geopoint_authorization_middleware, updateJourneyGeopoint)
    .delete('/:journey_id/geopoint/:geopoint_id', authentication_middleware, geopoint_authorization_middleware, deleteJourneyGeopoint)
    .get('/:journey_id/geopoint', authentication_middleware, getJourneyAllGeopoints)
    .delete('/:journey_id/geopoint', authentication_middleware, geopoint_authorization_middleware, deleteJourneyAllGeopoints)
    .use('/:journey_id/geopoint', require('./photo/index')(router))

  return router;
}
