"use strict";

const inspector = require("schema-inspector");
const _ = require("lodash");

const errors = require("../config/errors");

const schemas = {
  user: {
    login: {
      type: "object",
      properties: {
        email: { type: "string", pattern: "email" },
        password: { type: "string", minLength: 1 },
      }
    }
  }
}

module.exports.validateBody = (name, schema) => (req, res, next) => {
  // console.log(name + " " + schema + " " + JSON.stringify(req.body))
  // const body = req.body;
  const result = inspector.validate(_.get(schemas, `${name}.${schema}`), req.body);
  // console.log(result);
  if (result.error.length !== 0) {
    throw new errors.BadRequestError("Request body failed validation check.", result)
  } else {
    next();
  }
};


// module.exports.validateBody = (req, res, next) => {
//   console.log(res)
//   console.log(req.originalUrl)
//   const body = req.body;
//   const result = inspector.validate(v2, body);
//   console.log(result);
//   next();
// };
