"use strict";

const Item = require("../models/Item");

const ValidationError = require("../config/errors").ValidationError;

module.exports.findAll = (req, res, next) => {
  Item
  .findAll()
  .then(items => {
    throw new ValidationError("No User found.");
    res.status(200).send(items);
  })
  .catch(err => next(err));
};

module.exports.saveOne = (req, res, next) => {
  Item
  .saveOne(req.body)
  .then(item => {
    res.status(200).send(item);
  })
  .catch(err => next(err));
};

module.exports.updateOne = (req, res, next) => {
  Item
  .update(req.body, { id: req.params.id })
  .then(item => {
    res.status(200).send(item);
  })
  .catch(err => next(err));
};
