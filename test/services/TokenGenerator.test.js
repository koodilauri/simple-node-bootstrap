"use strict";

const expect = require("chai").expect;
const Sinon = require("sinon");

const TGclass = require("../../services/TokenGenerator").class;
const TokenG = new TGclass("testsecret");

const mockUser = require("../mockdata/db").user;

let calledParams = {};

describe("TokenGenerator", () => {
  xdescribe("generateLoginPayload(user)", () => {
    it("should generate valid payload", () => {
      const payload = TokenG.generateLoginPayload(mockUser);
      expect(payload).to.equal({

      })
    })
  });

  describe("generateToken(payload)", () => {
    it("should generate valid token", () => {
      const payload = TokenG.generateLoginPayload(mockUser);
      const token = TokenG.generateToken(payload);
      const decoded = TokenG.verifyToken(token, { audience: "login" });
      expect(decoded.user.id).to.equal(mockUser.id);
      expect(decoded.user.fullname).to.equal(`${mockUser.firstname} ${mockUser.lastname}`);
      expect(decoded.user.role).to.equal(mockUser.role);
      expect(decoded.audience).to.equal("login")
    });
  });
});
