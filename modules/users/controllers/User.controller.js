const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const { JwtLib } = require("../../../libs");

const CreateUsers = async (req, res, next) => {
  try {
    const { fullName, password, email, planStatus, plan, next_payment_date } =
      req.body;
    const isExists = await UserModel.exists({ email });
    if (isExists) {
      return res
        .status(409)
        .json({ message: "User already exists with the same email" });
    }
    const newUser = new UserModel({
      fullName,
      email,
      password,
      planStatus,
      plan,
      next_payment_date,
    });
    await newUser.save();
    return res.json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("login details.", email, password);
    const isExists = await UserModel.findOne({ email });
    if (!isExists) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }
    const isMatched = await bcrypt.compare(password, isExists.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid password." });
    }
    const token = await JwtLib.JsonWebToken.signToken({
      _id: isExists._id,
      role: isExists.role,
    });
    console.log("token generated.", token);
    return res
      .status(200)
      .json({ message: "User login successfully!", token: token });
  } catch (error) {
    next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email." });
    }
    //forget password logic here.
  } catch (error) {
    next(error);
  }
};

const GetUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const GetUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { fullName, email } = req.body;
    let user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.deleteOne({ _id: userId });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateUsers,
  LoginUser,
  GetUsers,
  GetUser,
  deleteUser,
  ResetPassword,
  updateUser,
};
