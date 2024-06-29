const express = require("express");
const {
  createAccount,
  GetAccounts,
  GetSingleAccount,
  DeleteAccount,
  UpdateAccount,
} = require("../controllers/Account.controller");
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
  //ValidatorMiddleware.validate(create),
  // uploadFile.array("documents", 10),
  uploadFile.single("file"),
  createAccount
);
router.get("/", ValidatorMiddleware.validate(list), GetAccounts);
router.get("/:accountId", ValidatorMiddleware.validate(get), GetSingleAccount);
router.delete(
  "/:accountId",
  ValidatorMiddleware.validate(remove),
  DeleteAccount
);
router.patch(
  "/:accountId",
  ValidatorMiddleware.validate(update),
  UpdateAccount
);

module.exports = router;
