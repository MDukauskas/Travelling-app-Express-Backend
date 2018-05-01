const mongoose = require('mongoose');
const { User } = require('../../models/user');

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

const updateUser = function(req, res, userId) {
  res.send({ message: `Update user ${userId}` });
};

const updateUserPassword = function(req, res, userId) {
  const newPassword = req.body.password;
  User.findById(userId)
    .then(user => {
      if (!user) {
        res.status(404).send();
      }

      user.password = newPassword;
      user.save(err => {
        if (err) {
          res
            .status(500)
            .send(err)
            .end();
        }
        res.status(200).send();
      });
    })
    .catch(err => {
      res.status(400).send();
    });
};

module.exports = { getMe, updateUser, updateUserPassword };
