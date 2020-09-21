const Address = require("../models/address");
const Sequelize = require("sequelize");

module.exports = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const contactnumber = req.body.contactnumber;
  const alternatenumber = req.body.alternatenumber;
  const address = req.body.address;
  Address.findOne({
    where: Sequelize.and({
      userid: req.user.id,
      email: email,
    }),
  })
    .then((user) => {
      if (user) {
        const error = new Error("Email Aready exists");
        error.field = "email";
        error.status = 406;
        return next(error);
      } else {
        return Address.findOne({
          where: Sequelize.and({
            userid: req.user.id,
            contactnumber: contactnumber,
          }),
        });
      }
    })
    .then((user) => {
      if (user) {
        const error = new Error("number already exists");
        error.field = "contactnumber";
        error.status = 406;
        return next(error);
      } else {
        return Address.findOne({
          where: Sequelize.and({
            userid: req.user.id,
            alternatenumber: alternatenumber,
          }),
        });
      }
    })
    .then((user) => {
      if (user) {
        const error = new Error("number already exists");
        error.field = "alternatenumber";
        error.status = 406;
        return next(error);
      } else {
        next();
      }
    })
    .catch((err) => console.log(error));
};
