const mongoose = require('mongoose');

const { Journey } = require('../../../../models/journey');

const photo_authorization_middleware = async (req, res, next) => {
  var journey_id = mongoose.Types.ObjectId(req.params.journey_id);
  var geopoint_id = mongoose.Types.ObjectId(req.params.geopoint_id);

  const journey = await Journey.findOne({
    _id: journey_id,
    geopoints: geopoint_id
  }).populate('geopoints');

  if (!journey) {
    res.status(404).send();
  }

  req.geopoint = journey.geopoints.find(geopoint => {
    return geopoint.id == geopoint_id;
  });
  next();
};

module.exports = { photo_authorization_middleware };
