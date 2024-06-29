const { Schema, model } = require("mongoose");

const AccountSchema = new Schema(
  {
    accountType: {
      type: String,
      enum: ["Corporate", "Individual"],
    },
    bank_institute: { type: String, required: true },
    jurisdiction: { type: String },
    bank_account_type: { type: String },
    currency: { type: String },
    name: { type: String },
    telephone_no: { type: String },
    mobile_no: { type: String },
    email: { type: String },
    policy: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    alternate_details: {
      type: {
        telephone_no: { type: String },
        mobile_no: { type: String },
        email: { type: String },
        service: { type: Boolean },
        business_activity: { type: String },
        non_cooprative: { type: String },
      },
      _id: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
  },
  {
    strict: false,
    timestamps: true,
    discriminatorKey: "accountType",
  }
);

AccountSchema.index({ bank_institute: 1 });
AccountSchema.index({ jurisdiction: 1 });
AccountSchema.index({ accountType: 1 });
AccountSchema.index({ jurisdiction: 1 });
AccountSchema.index({ name: 1 });
AccountSchema.index({ email: 1 });

const AccountModel = model("Account", AccountSchema);

module.exports = AccountModel;
