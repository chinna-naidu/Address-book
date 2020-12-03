const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../util/secret");

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  return User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      const error = new Error("enter a valid email address");
      error.field = "email";
      error.status = 406;
      next(error);
      return error;
    } else {
      return bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            const error = new Error("password is incorrect");
            error.field = "password";
            error.status = 406;
            throw error;
          } else {
            const token = jwt.sign(
              {
                userid: user.id,
                email: email,
              },
              secret
            );
            return {
              token: token,
              email: email,
            };
          }
        })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          console.log(err);
          next(err);
          return err;
        });
    }
  });
};

exports.signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      const error = new Error("email already exists.");
      error.field = "email";
      error.status = 406;
      return next(error);
    }
    bcrypt
      .hash(password, 12)
      .then((hash) => {
        User.create({
          name: name,
          email: email,
          password: hash.toString(),
        })
          .then(() => {
            return res.status(200).json({
              error: null,
              message: "successfully created a user",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};
