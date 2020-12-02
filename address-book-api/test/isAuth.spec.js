const { expect } = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = require("../util/isAuth");

describe("Tests for the isAuth Middlewear", function () {
  it("should throw an error when the token is empty", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("token not found");
  });

  it("should throw an error if the token is malformed", function () {
    const req = {
      get: function () {
        return "xyz sdsadadadas";
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("jwt malformed");
  });

  it("should create a user object on request Object", function () {
    const req = {
      get: function () {
        return "xyz sdsadadadas";
      },
    };
    const stubbedVerify = sinon.stub(jwt, "verify");
    stubbedVerify.returns({
      userid: "test",
    });
    const stubbedFindByPk = sinon.stub(User, "findByPk");
    stubbedFindByPk.returns().resolves({
      id: 1,
      name: "test",
    });
    isAuth(req, {}, () => {
      expect(req).to.have.property("user");
      //   console.log(req);
      stubbedVerify.restore();
      stubbedFindByPk.restore();
    });
  });
});
