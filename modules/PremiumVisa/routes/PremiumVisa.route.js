const express = require("express");
const {
  createPremiumVisa,
  ListPremiumVisa,
  GetPremiumVisa,
  DeletePremiumVisa,
  UpdatePremiumVisa,
} = require("../controllers/PremiumVisa.controller");
const { ValidatorMiddleware } = require("../../../middlewares");
const {
  create,
  get,
  list,
  remove,
  update,
} = require("../../bankAccount/validators/Account.validator");
const { uploadFile } = require("../../AWS/upload");

const router = express.Router();

router.post(
  "/",
//   ValidatorMiddleware.validate(create),
  // uploadFile.array("documents", 10),
  //uploadFile.single("file"),
  createPremiumVisa
);
router.get(
  "/",
  //  ValidatorMiddleware.validate(list),
  ListPremiumVisa
);
router.get(
  "/:premiumvisaId",
  //  ValidatorMiddleware.validate(get),
  GetPremiumVisa
);
router.delete(
  "/:premiumvisaId",
  //   ValidatorMiddleware.validate(remove),
  DeletePremiumVisa
);
router.patch(
  "/:premiumvisaId",
  //   ValidatorMiddleware.validate(update),
  UpdatePremiumVisa
);

module.exports = router;
