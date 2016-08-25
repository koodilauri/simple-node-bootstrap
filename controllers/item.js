"use strict";

const Item = require("../models/Item");

const ValidationError = require("../config/errors").ValidationError;

module.exports.findAll = (req, res, next) => {
  Item
  .findAll()
  .then(items => {
    res.status(200).send(items);
  })
  .catch(err => next(err));
};

module.exports.saveOne = (req, res) => {
  Item
  .saveOne(req.body)
  .then(item => {
    res.status(200).send(item);
  })
  .catch(err => {
    res.status(500).send({
      location: "Item saveOne .catch other",
      message: "Saving Item caused an internal server error.",
      error: err,
    });
  });
};

module.exports.updateOne = (req, res) => {
  Item
  .update(req.body, { id: req.params.id })
  .then(item => {
    res.status(200).send(item);
  })
  .catch(err => {
    res.status(500).send({
      location: "Item updateOne .catch other",
      message: "Updating Item caused an internal server error.",
      error: err,
    });
  });
};
