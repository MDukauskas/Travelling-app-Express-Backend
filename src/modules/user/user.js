const { User } = require('../../models/user');
const mongoose = require('mongoose');

const getMe = function(req, res, userId) {
  User.findById(userId)
    .then(user => {
      if (!user) {
        res.status(404).send();
      }

      res.send(user);
    })
    .catch(err => {
      res.status(400).send();
    });
};
module.exports = { getMe };
