const { authentication_middleware } = require('../../../authentication/authentication_middleware');
const { geopoint_authorization_middleware } = require('../geopoint_authorization_middleware')
const { photo_authorization_middleware } = require('./photo_authorization_middleware')

const {
  getGeopointPhoto,
  addGeopointPhoto,
  updateGeopointPhoto,
  deleteGeopointPhoto,
  getGeopointAllPhotos
} = require('./photo');

module.exports = function(router){
  router
    .get('/:journey_id/geopoint/:geopoint_id/photo/:photo_id', authentication_middleware, geopoint_authorization_middleware,photo_authorization_middleware, getGeopointPhoto)
    .post('/:journey_id/geopoint/:geopoint_id/photo', authentication_middleware, geopoint_authorization_middleware, photo_authorization_middleware, addGeopointPhoto)
    .put('/:journey_id/geopoint/:geopoint_id/photo/:photo_id', authentication_middleware, geopoint_authorization_middleware, photo_authorization_middleware, updateGeopointPhoto)
    .delete('/:journey_id/geopoint/:geopoint_id/photo/:photo_id', authentication_middleware, geopoint_authorization_middleware, photo_authorization_middleware, deleteGeopointPhoto)
    .get('/:journey_id/geopoint/:geopoint_id/photo', authentication_middleware, geopoint_authorization_middleware, getGeopointAllPhotos)
  return router;
}
