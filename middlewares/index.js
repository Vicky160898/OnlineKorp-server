const ValidatorMiddleware = require("./validator.middleware");
const userAuthorization = require("./token-verify");
const adminAuthorization = require("./admin-verify");

module.exports = {
  ValidatorMiddleware,
  userAuthorization,
  adminAuthorization,
};
