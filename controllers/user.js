"use strict";

const TokenGenerator = require("../services/TokenGenerator");
const passwordHelper = require("../config/passwordHelper");
const val = require("../config/validations");

const User = require("../models/User");

const errors = require("../config/errors");

module.exports.findAll = (req, res, next) => {
  User
  .findAll()
  .then(users => {
    res.status(200).send(users);
  })
  .catch(err => next(err));
};

module.exports.updateOne = (req, res, next) => {
  const user = req.body;

  Promise.resolve()
  .then(() => {
    if (req.user.id.toString() !== req.params.id && req.user.role !== "admin") {
      throw new errors.ForbiddenError("Missing privileges to edit User.");
    } else if (!user.password && req.user.role !== "admin") {
      throw new errors.AuthenticationError("No password supplied.");
    } else if (user.newPassword && !user.newPasswordConf || !user.newPassword && user.newPasswordConf) {
      throw new errors.AuthenticationError("No new password or confirmation.");
    } else if (user.newPassword && user.newPasswordConf && user.newPassword !== user.newPasswordConf) {
      throw new errors.AuthenticationError("New password didn't match confirmation.");
    } else {
      return User.findOne({ id: req.params.id });
    }
  })
  .then(foundUser => {
    if (!foundUser) {
      throw new errors.ValidationError("No User found.");
    } else if (user.password && !passwordHelper.comparePassword(user.password, foundUser.passwordHash)) {
      throw new errors.AuthenticationError("Wrong password.");
    }
    const strippedUser = Object.assign({}, user);
    if (req.user.id.toString() === req.params.id) {
      delete strippedUser.role;
      if (user.newPassword && user.newPasswordConf) {
        strippedUser.passwordHash = passwordHelper.hashPassword(user.newPassword);
      }
    }
    return User.update(strippedUser, { id: req.params.id });
  })
  .then(rows => {
    res.status(200).send();
  })
  .catch(err => next(err));
};

module.exports.saveOne = (req, res, next) => {
  const user = req.body;

  Promise.resolve()
  .then(() => {
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      throw new errors.ValidationError("Missing fields.");
    } else if (user.password < 8) {
      throw new errors.ValidationError("Password too short.");
    } else {
      return User.findOne({ email: user.email });
    }
  })
  .then(foundUser => {
    if (foundUser) {
      throw new errors.ValidationError("User already exists with the same email.");
    } else {
      user.passwordHash = passwordHelper.hashPassword(user.password);
      return User.saveOne(user);
    }
  })
  .then(savedUser => {
    res.status(200).send();
  })
  .catch(err => next(err));
};

module.exports.deleteOne = (req, res, next) => {
  User
  .delete({ id: req.params.id })
  .then(deletedRows => {
    if (deletedRows !== 0) {
      res.status(200).send();
    } else {
      throw new errors.NotFoundError("No user found.");
    }
  })
  .catch(err => next(err));
};

module.exports.loginUser = (req, res, next) => {
  val.validate(req.body)
  User
  .findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      throw new errors.NotFoundError("No user found with given email.");
    } else {
      if (!passwordHelper.comparePassword(req.body.password, user.passwordHash)) {
        throw new errors.AuthenticationError("Incorrect password.");
      } else {
        const token = TokenGenerator.generateToken(user);
        user.passwordHash = undefined;
        res.status(200).send({
          user,
          token,
        });
      }
    }
  })
  .catch(err => next(err));
};
