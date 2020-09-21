const Address = require("../models/address");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const contactnumber = req.body.contactnumber;
  const alternatenumber = req.body.alternatenumber;
  const address = req.body.address;
  Address.findOne({
    where: Sequelize.and({
      userid: req.user.id,
      email: email,
      id: {
        [Op.ne]: id,
      },
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
            id: {
              [Op.ne]: id,
            },
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
            id: {
              [Op.ne]: id,
            },
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
