"use strict";

const Item = require("../models/Item");

module.exports.findAll = (req, res, next) => {
  Item
  .findAll()
  .then(items => {
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
  .updateById(req.body, req.params.id)
  .then(item => {
    res.status(200).send(item);
  })
  .catch(err => next(err));
};
