const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Schema = mongoose.Schema;
const validator = require('validator');
const config = require('../config');

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength:1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not valid email address'
    }
  },
  password: {
    type: String,
    require: true,
    bcrypt: true,
    minlength: 8
  },
  tokens: [{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
},
{
    timestamps: true
});

UserSchema.plugin(require('mongoose-bcrypt'));

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, config.TOKEN_KEY).toString();

  user.tokens.push({
      access,
      token
  });

  return user.save().then(() => {
    return token;
  });
}

UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  })
};

UserSchema.statics.findByToken = function(token){
  var user = this;
  var decoded;

  try {
    decoded = jwt.verify(token, config.TOKEN_KEY);
  } catch (e) {
    return Promise.reject();
  }
  return user.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

try {
  var User = mongoose.model('User');
} catch( e ) {
  var User = mongoose.model('User', UserSchema);
}

module.exports = { User };
