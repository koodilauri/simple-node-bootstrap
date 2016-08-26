"use strict";

const TokenGenerator = require("../services/TokenGenerator");

/**
 * Authentication middleware that is called before any requests
 *
 * Checks the request for the correct Headers and then decodes
 * the token and checks if everything matches out after which
 * it lets the user to access the controller's method.
 */
module.exports.authenticate = (req, res, next) => {
  if (!req.headers["x-access-token"]) {
    return res.status(401).send({
      message: "Please make sure your request has X-Access-Token header",
    });
  }
  const token = req.headers["x-access-token"];
  let decoded;
  try {
    decoded = TokenGenerator.decodeToken(token);
  }
  catch (err) {
    return res.status(401).send({
      message: "Token authentication failed",
      error: err.message,
    });
  }
  if (decoded.created > decoded.expires) {
    return res.status(401).send({
      message: "Token has expired",
    });
  } else {
    req.user = decoded.user;
    next();
  }
};

module.exports.onlyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send({
      message: "User privilege check failed",
    });
  }
};
