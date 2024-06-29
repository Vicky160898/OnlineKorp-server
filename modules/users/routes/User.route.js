const express = require("express");
const router = express.Router();
const {
  create,
  logIn,
  list,
  remove,
  update,
} = require("../validators/User.validator");
const {
  ValidatorMiddleware,
  userAuthorization,
} = require("../../../middlewares");
const {
  CreateUsers,
  GetUsers,
  GetUser,
  LoginUser,
  deleteUser,
  updateUser,
} = require("../controllers/User.controller");

//API Routes here.
router.post("/", ValidatorMiddleware.validate(create), CreateUsers);
router.post("/login", ValidatorMiddleware.validate(logIn), LoginUser);
router.get("/all", ValidatorMiddleware.validate(list), GetUsers);
router.get("/", userAuthorization.isValid, GetUser);
router.delete("/:userId", ValidatorMiddleware.validate(remove), deleteUser);
router.patch("/:userId", ValidatorMiddleware.validate(update), updateUser);

module.exports = router;
