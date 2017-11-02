const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Schema = mongoose.Schema;
const validator = require('validator');

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
    minlength: 6
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
});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  console.log(user)
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

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
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return user.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var User = mongoose.model('User', UserSchema);
module.exports = { User };
