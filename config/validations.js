"use strict";

var inspector = require('schema-inspector');

var v1 = {
  type: 'object',
  properties: {
    content: { type: "string", minLength: 1 },
  }
}

var v2 = {
  type: 'object',
  properties: {
    email: { type: "string", pattern: "email" },
    password: { type: "string", minLength: 1 },
  }
}

module.exports.validate = (name, schema, values) => {
  const result = inspector.validate(v2, values);
  console.log(result);
}

// Data that we want to sanitize and validate
var data = {
    firstname: 'sterling  ',
    lastname: '  archer',
    jobs: 'Special agent, cocaine Dealer',
    email: 'NEVER!',
};

// Sanitization Schema
var sanitization = {
    type: 'object',
    properties: {
        firstname: { type: 'string', rules: ['trim', 'title'] },
        lastname: { type: 'string', rules: ['trim', 'title'] },
        jobs: {
            type: 'array',
            splitWith: ',',
            items: { type: 'string', rules: ['trim', 'title'] }
        },
        email: { type: 'string', rules: ['trim', 'lower'] }
    }
};
// Let's update the data
inspector.sanitize(sanitization, data);
/*
data is now:
{
    firstname: 'Sterling',
    lastname: 'Archer',
    jobs: ['Special Agent', 'Cocaine Dealer'],
    email: 'never!'
}
*/

// Validation schema
var validation = {
    type: 'object',
    properties: {
        firstname: { type: 'string', minLength: 1 },
        lastname: { type: 'string', minLength: 1 },
        jobs: {
            type: 'array',
            items: { type: 'string', minLength: 1 }
        },
        email: { type: 'string', pattern: 'email' }
    }
};
var result = inspector.validate(validation, data);
// if (!result.valid)
//     console.log(result.format());
/*
    Property @.email: must match [email], but is equal to "never!"
*/
