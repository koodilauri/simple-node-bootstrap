const sanitizations = {
  user: {
    login: {
      type: "object",
      properties: {
        email: { type: "string", rules: ["trim", "lower"] }
      }
    },
    save: {
      type: "object",
      properties: {
        firstname: { type: "string", rules: ["trim", "title"] },
        lastname: { type: "string", rules: ["trim", "title"] },
        email: { type: "string", rules: ["trim", "lower"] }
      }
    },
  },
};

const validations = {
  user: {
    login: {
      type: "object",
      properties: {
        email: { type: "string", pattern: "email" },
        password: { type: "string", minLength: 1 },
      }
    },
    save: {
      type: "object",
      properties: {
        firstname: { type: "string", minLength: 1 },
        lastname: { type: "string", minLength: 1 },
        email: { type: "string", pattern: "email" },
        password: { type: "string", minLength: 8 },
      }
    },
  },
  item: {
    save: {
      type: "object",
      properties: {
        content: { type: "string", minLength: 1 },
      }
    }
  }
};

module.exports = {
  sanitizations,
  validations,
}
