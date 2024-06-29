const SubscriptionModel = require("../models/subscription");

const AddPlans = async (req, res, next) => {
  try {
    const isExists = await SubscriptionModel.exists({
      planName: req.body.planName,
    });
    if (isExists) {
      return res
        .status(409)
        .json({ message: "Plan already exists with the same name." });
    }
    const newPlan = new SubscriptionModel(req.body);
    await newPlan.save();
    return res.json({ plan: newPlan });
  } catch (error) {
    next(error);
  }
};

const GetAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await SubscriptionModel.find();
    return res.status(200).json({ subscriptions });
  } catch (error) {
    next(error);
  }
};

const GetSubscription = async (req, res, next) => {
  try {
    const { subsciptionId } = req.params;
    const subscription = await SubscriptionModel.findById(subsciptionId);
    return res.status(200).json({ subscription });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subsciptionId } = req.params;
    const { planName, planType, price } = req.body;
    let subscription = await SubscriptionModel.findById(subsciptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    if (planName) {
      subscription.planName = planName;
    }
    if (planType) {
      subscription.planType = planType;
    }
    if (price) {
      subscription.price = price;
    }
    await subscription.save();
    return res.status(200).json({ subscription });
  } catch (error) {
    next(error);
  }
};

const DeleteSubscription = async (req, res, next) => {
  try {
    const { subsciptionId } = req.params;
    const subscription = await SubscriptionModel.findById(subsciptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    await SubscriptionModel.deleteOne({ _id: subsciptionId });
    return res
      .status(200)
      .json({ message: "Subscription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddPlans,
  GetAllSubscriptions,
  GetSubscription,
  DeleteSubscription,
  updateSubscription,
};
