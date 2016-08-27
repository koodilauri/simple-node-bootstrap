"use strict";

const inspector = require("schema-inspector");
const _ = require("lodash");

const sanitizations = require("../config/bodyValidations").sanitizations;
const validations = require("../config/bodyValidations").validations;
const errors = require("../config/errors");

module.exports.validateBody = (name, schema) => (req, res, next) => {
  // console.log(name + " " + schema + " " + JSON.stringify(req.body))
  inspector.sanitize(_.get(sanitizations, `${name}.${schema}`), req.body);
  console.log(req.body)
  const result = inspector.validate(_.get(validations, `${name}.${schema}`), req.body);
  // console.log(result);
  if (result.error.length !== 0) {
    throw new errors.BadRequestError("Request body failed validation check.", result)
  } else {
    next();
  }
};
