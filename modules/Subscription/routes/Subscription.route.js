const express = require("express");
const {
  AddPlans,
  GetAllSubscriptions,
  GetSubscription,
  DeleteSubscription,
  updateSubscription,
} = require("../controllers/Subscription.controller");
const router = express.Router();
const { ValidatorMiddleware } = require("../../../middlewares");
const {
  create,
  update,
  remove,
  get,
} = require("../validators/Subscription.validator");

router.post("/", ValidatorMiddleware.validate(create), AddPlans);
router.get("/", GetAllSubscriptions);
router.patch(
  "/:subsciptionId",
  ValidatorMiddleware.validate(update),
  updateSubscription
);
router.delete(
  "/:subsciptionId",
  ValidatorMiddleware.validate(remove),
  DeleteSubscription
);
router.get(
  "/:subsciptionId",
  ValidatorMiddleware.validate(get),
  GetSubscription
);

module.exports = router;
