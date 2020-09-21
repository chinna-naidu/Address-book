const Address = require("../models/address");

exports.getAddresses = (req, res, next) => {
  Address.findAll({
    where: {
      userid: req.user.id,
    },
    order: [["name", "ASC"]],
  })
    .then((data) => {
      console.log(data);
      return res.status(200).json({
        addresses: data,
      });
    })
    .catch((err) => next(err));
};

exports.getAddress = (req, res, next) => {
  const id = +req.params.id;
  Address.findByPk(id)
    .then((address) => {
      res.status(200).json({
        address: address,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddress = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const contactnumber = req.body.contactnumber;
  const alternatenumber = req.body.alternatenumber;
  const address = req.body.address;

  req.user
    .createAddress({
      name: name,
      email: email,
      contactnumber: contactnumber,
      alternatenumber: alternatenumber,
      address: address,
    })
    .then(() => {
      return res.status(200).json({
        message: "successfully created",
        address: req.body,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateAddress = (req, res, next) => {
  const id = +req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const contactnumber = req.body.contactnumber;
  const alternatenumber = req.body.alternatenumber;
  const modified = req.body.address;
  Address.findByPk(id)
    .then((address) => {
      address.name = name;
      address.email = email;
      address.contactnumber = contactnumber;
      address.alternatenumber = alternatenumber;
      address.address = modified;
      return address.save();
    })
    .then(() => {
      res.status(200).json({
        message: "successfully updated",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteAddress = (req, res, next) => {
  const id = +req.params.id;
  console.log(id);
  Address.findByPk(id)
    .then((address) => {
      return address.destroy();
    })
    .then(() => {
      res.status(200).json({
        message: "successfully Deleted",
      });
    })
    .catch((err) => console.log(err));
};
