const sinon = require("sinon");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");

const AuthController = require("../controllers/auth");
const User = require("../models/user");

describe("Testing The Auth Controller", function () {
  describe("testing the login function in Auth Controller", function () {
    //checking for invalid email address
    it("should throw an error if the email address is invalid.", function (done) {
      const req = {
        body: {
          email: "email",
          password: "password",
        },
      };
      const stubbedFindOne = sinon.stub(User, "findOne");
      stubbedFindOne.resolves(null);
      AuthController.login(req, {}, () => {})
        .then((error) => {
          expect(error).to.be.an("error");
          expect(error).to.have.property(
            "message",
            "enter a valid email address"
          );
          expect(error).to.have.property(
            "status",
            406,
            "status code must be 406"
          );
          expect(error).to.have.property("field", "email");
          stubbedFindOne.restore();
          done();
        })
        .catch((err) => {
          stubbedFindOne.restore();
          done(err);
        });
    });
    //checking for invalid password
    it("should throw an error if the password is invalid", function (done) {
      const req = {
        body: {
          email: "email",
          password: "password",
        },
      };
      const stubbedFindOne = sinon.stub(User, "findOne");
      const stubbedCompare = sinon.stub(bcrypt, "compare");
      stubbedFindOne.resolves({
        password: "sdadasdadas",
      });
      stubbedCompare.resolves(false);
      AuthController.login(req, {}, () => {})
        .then((error) => {
          expect(error).to.be.an("error");
          expect(error).to.have.property("message", "password is incorrect");
          expect(error).to.have.property(
            "status",
            406,
            "status code must be 406"
          );
          expect(error).to.have.property("field", "password");
          stubbedFindOne.restore();
          stubbedCompare.restore();
          done();
        })
        .catch((err) => {
          stubbedFindOne.restore();
          stubbedCompare.restore();
          done(err);
        });
    });
  });
});
