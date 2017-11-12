const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const validator = require('validator');


var PhotoSchema = new Schema({
  small_img: {
    type: String,
    // required: true,
    trim: true
  },
  medium_img: {
    type: String,
    // required: true,
    trim: true
  },
  large_img: {
    type: String,
    // required: true,
    trim: true
  },
  title: {
    type: String,
  },
  description: {
    type: String
  }
},
{
    timestamps: true
});

try {
  var Photo = mongoose.model('Photo');
} catch (e) {
  var Photo = mongoose.model('Photo', PhotoSchema);
}

module.exports = { Photo };
