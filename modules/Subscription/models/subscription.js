const { Schema, model } = require("mongoose");

const SubscriptionSchema = new Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    planType: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const SubscriptionModel = model("Subscription", SubscriptionSchema);
module.exports = SubscriptionModel;
