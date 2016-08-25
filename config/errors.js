"use strict";

function ValidationError(message, location) {
  this.name = 'ValidationError';
  this.message = message || 'Something went wrong';
  this.details = location || "";
  this.stack = (new Error()).stack;
  // const temp = Error.apply(this, arguments);
  // temp.name = this.name = "ValidationError";
  // this.stack = temp.stack;
  // this.message = temp.message;
}
  //inherit prototype using ECMAScript 5 (IE 9+)
ValidationError.prototype = Object.create(Error.prototype);

function NotFoundError(message, details) {
  this.name = 'NotFoundError';
  this.message = message || 'Something went wrong';
  this.details = details || "";
  this.stack = (new Error()).stack;
}

NotFoundError.prototype = Object.create(Error.prototype);

module.exports = {
  ValidationError,
  NotFoundError,
};
