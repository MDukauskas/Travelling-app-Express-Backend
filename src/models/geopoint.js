const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const validator = require('validator');


var GeopointSchema = new Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  title: {
    type: String,
  },
  description: {
    type: String
  },
  photos: [{
    type: Schema.ObjectId,
    ref: 'Photo'
  }]
},
{
    timestamps: true,
    strict: true
});

try {
  var Geopoint = mongoose.model('Geopoint');
} catch (e) {
  var Geopoint = mongoose.model('Geopoint', GeopointSchema);
}

module.exports = { Geopoint };
