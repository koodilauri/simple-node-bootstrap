"use strict";

const errors = require("../config/errors");

module.exports.handleErrors = (err, req, res, next) => {
  if (err) {
    console.error(err)
    console.log(err.stack)
    let statusCode;
    if (err instanceof errors.ValidationError) {
      statusCode = 401;
    } else if (err instanceof errors.NotFoundError) {
      statusCode = 404;
    } else {
      statusCode = 500;
    }
    if (process.env.NODE_ENV === "development") {
      if (statusCode !== 500) {
        res.status(statusCode).send(err);
      } else {
        res.status(statusCode).send({
          stack: err.stack,
        });
      }
    } else {
      res.status(statusCode).send("virhe");
    }
  } else {
    next();
  }
};
