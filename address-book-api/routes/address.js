const { Router } = require("express");
const isAuth = require("../util/isAuth");
const isValidAddress = require("../util/isValidAddress");
const router = Router();

const addressController = require("../controllers/address");
const isValidUpdate = require("../util/isValidUpdate");

router.get("/address", isAuth, addressController.getAddresses);

router.get("/address/:id", addressController.getAddress);

router.post("/address", isAuth, isValidAddress, addressController.postAddress);

router.patch(
  "/address/:id",
  isAuth,
  isValidUpdate,
  addressController.updateAddress
);

router.delete("/address/:id", addressController.deleteAddress);

module.exports = router;
