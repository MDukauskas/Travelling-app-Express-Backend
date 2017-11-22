const AWS = require('aws-sdk');
const CONFIG = require('../../../config');
const S3 = new AWS.S3();
const _ = require('lodash');


const { Journey } = require('../../../models/journey');
const { Geopoint } = require('../../../models/geopoint');

const getJourneyGeopoint = async function(req, res){
  const journey = await Journey.findOne({
      '_id' : req.params.journey_id,
      'geopoints' : req.params.geopoint_id
    });

  if(!journey){
    res.status(404).send().end();
  }

  const geopoint = await Geopoint.findOne({ '_id' :  req.params.geopoint_id })

  if(!geopoint){
    res.status(404).send().end();
  }

  res.send(geopoint)
}

const addJourneyGeopoint = function(req, res){
  var body = _.pick(req.body, ['title', 'description', 'lat', 'lng']);
  body = {...body};

  const newGeopoint = new Geopoint(body);
  newGeopoint.save().then( geopointObject => {
    Geopoint.findOne({'_id': geopointObject.id})
      .then( geopoint => {

        if(!geopoint){
          return Promise.reject();
        }

        req.journey.geopoints.push(geopoint);
        req.journey.save();

        res.send(geopoint);
      })
      .catch( err => {
        res.status(400).send();
      })
  }).catch( e => {
    res.status(422).send(e);
  });
}

const updateJourneyGeopoint = function(req, res){
  res.send({
    message:"update geopoint",
    params: { ...req.params }
  })
}

const deleteJourneyGeopoint = function(req, res){
  res.send({
    message:"delete geopoint",
    params: { ...req.params }
  })
}

const getJourneyAllGeopoints = async function(req, res){
  const journey = await Journey.findOne({
      '_id' : req.params.journey_id
    }).populate('geopoints')

  if(!journey){
    res.status(404).send().end();
  }

  res.send(journey.geopoints)
}

const deleteJourneyAllGeopoints = function(req, res){
  res.send({
    message:"delete all geopoints",
    params: { ...req.params }
  })
}


module.exports = {
  getJourneyGeopoint,
  addJourneyGeopoint,
  updateJourneyGeopoint,
  deleteJourneyGeopoint,
  getJourneyAllGeopoints,
  deleteJourneyAllGeopoints
};
