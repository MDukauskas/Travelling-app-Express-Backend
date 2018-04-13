const { Journey } = require('../../models/journey');
const { Geopoint } = require('../../models/geopoint');
const _ = require('lodash');
const mongoose = require('mongoose');

const addJouney = function(req, res) {
  var body = _.pick(req.body, ['title', 'description']);
  body = { ...body };
  body['user'] = req.user.id;

  const newJourney = new Journey(body);
  newJourney
    .save()
    .then(journeyObject => {
      Journey.findOne({ user: req.user.id, _id: journeyObject.id })
        .populate('user')
        .then(journey => {
          if (!journey) {
            return Promise.reject();
          }

          res.send(journey);
        })
        .catch(err => {
          res.status(400).send();
        });
    })
    .catch(e => {
      res.status(422).send();
    });
};

const updateJourney = function(req, res) {};

const deleteJourney = function(req, res) {
  Journey.findByIdAndRemove({ _id: req.params.journey_id })
    .then(journey => {
      if (!journey) {
        res
          .status(404)
          .send()
          .end();
      }

      res.status(200).send(journey);
    })
    .catch(err => {
      res.status(400).send();
    });
};

const getJourney = function(req, res) {
  Journey.findOne({ _id: req.params.journey_id })
    .populate('user')
    .populate('geopoints')
    .then(journey => {
      if (!journey) {
        res
          .status(404)
          .send()
          .end();
      }

      res.send(journey);
    })
    .catch(err => {
      res.status(400).send();
    });
};

const getAllUserJourneys = function(req, res, userId) {
  Journey.find({ user: userId })
    .populate('user')
    .populate('geopoints')
    .then(journeys => {
      if (!journeys) {
        res.send([]);
      }

      res.send(journeys);
    })
    .catch(err => {
      res.status(400).send();
    });
};
module.exports = {
  addJouney,
  updateJourney,
  deleteJourney,
  getJourney,
  getAllUserJourneys
};
