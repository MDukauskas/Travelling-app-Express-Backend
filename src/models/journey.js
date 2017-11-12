const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const validator = require('validator');
const { Geopoint } = require('./geopoint');
const { User } = require('./user');

var JourneySchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  mainImg: {
    type: Schema.ObjectId,
    ref: 'Photo'
  },
  title: {
    type: String,
  },
  description: {
    type: String
  },
  geopoints: [{
    type: Schema.ObjectId,
    ref: 'Geopoint'
  }]
},
{
    timestamps: true
});

try {
  var Journey = mongoose.model('Journey');
} catch (e) {
  var Journey = mongoose.model('Journey', JourneySchema);
}

module.exports = { Journey };
