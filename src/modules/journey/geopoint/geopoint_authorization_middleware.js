const { Journey } = require('../../../models/journey');

const geopoint_authorization_middleware = async (req, res, next) => {
  const journey = await Journey.findOne({ '_id' : req.params.journey_id });

  if(!journey){
    res.status(403).send();
  }

  req.journey = journey;
  next();
};

module.exports = { geopoint_authorization_middleware };
