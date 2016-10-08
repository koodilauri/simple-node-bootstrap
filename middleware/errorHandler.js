"use strict";

const errors = require("../config/errors");

module.exports.handleErrors = (err, req, res, next) => {
  if (err) {
    console.error(err)
    console.log(err.stack)
    const statusCode = err.statusCode !== undefined ? err.statusCode : 500;

    if (process.env.NODE_ENV === "development") {
      if (statusCode !== 500) {
        res.status(statusCode).send(err);
      } else {
        res.status(statusCode).send({
          message: "Something caused an internal server error",
          stack: err.stack,
        });
      }
    } else {
      res.status(statusCode).send("Error");
    }
  } else {
    next();
  }
};
