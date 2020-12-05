const sinon = require("sinon");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");

const AuthController = require("../controllers/auth");
const User = require("../models/user");

describe("Testing The Auth Controller", function () {
  // testing the login funtion in Auth Controller
  describe("testing the login function in Auth Controller", function () {
    //checking for invalid email address
    it("should throw an error if the email address is invalid.", async function () {
      const req = {
        body: {
          email: "email",
          password: "password",
        },
      };
      const stubbedFindOne = sinon.stub(User, "findOne");
      stubbedFindOne.resolves(null);
      const error = await AuthController.login(req, {}, () => {});
      expect(error).to.be.an("error");
      expect(error).to.have.property("message", "enter a valid email address");
      expect(error).to.have.property("status", 406, "status code must be 406");
      expect(error).to.have.property("field", "email");
      stubbedFindOne.restore();
    });
    //checking for invalid password
    it("should throw an error if the password is invalid", async function () {
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
      const error = await AuthController.login(req, {}, () => {});
      expect(error).to.be.an("error");
      expect(error).to.have.property("message", "password is incorrect");
      expect(error).to.have.property("status", 406, "status code must be 406");
      expect(error).to.have.property("field", "password");
      stubbedFindOne.restore();
      stubbedCompare.restore();
    });
    //checking for returning token on success of login
    it("should return a object containing token on a successfull login", async function () {
      const req = {
        body: {
          email: "email",
          password: "password",
        },
      };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          return null;
        },
      };
      const stubbedFindOne = sinon.stub(User, "findOne");
      const stubbedCompare = sinon.stub(bcrypt, "compare");
      stubbedFindOne.resolves({
        password: "sdadasdadas",
      });
      stubbedCompare.resolves(true);
      const data = await AuthController.login(req, res, () => {});
      expect(data).to.have.property("token");
      expect(data.token).to.be.an("string", "the token must be of type string");
      stubbedCompare.restore();
      stubbedFindOne.restore();
    });
  });

  // testing the signup function in Auth Controller
  describe("testing the signup function in Auth Controller", function () {
    //it should throw an error if email already exists
    it("should throw an error if an email already exists", async function () {
      const req = {
        body: {
          name: "test",
          email: "test",
          password: "test",
        },
      };
      const stubbedFindOne = sinon.stub(User, "findOne");
      stubbedFindOne.resolves(req);
      const error = await AuthController.signup(req, {}, () => {});
      expect(error).to.have.property("message", "email already exists.");
      expect(error).to.have.property("status", 406, "status code must be 406");
      expect(error).to.have.property("field", "email");
      stubbedFindOne.restore();
    });
  });
});
