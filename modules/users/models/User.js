const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super admin", "cpc admin", "user"],
      default: "user",
      required: true,
    },
    plan: {
      type: String,
      enum: ["basic", "premium"],
    },
    planStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    next_payment_date: {
      type: String,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.index({ fullName: 1 });
UserSchema.index({ email: 1 });

const UserModel = model("User", UserSchema);

module.exports = UserModel;
