const IndividualModel = require("../models/Individual");

const createIndividualAccount = async (req, res, next) => {
  try {
    const newAccount = new IndividualModel(req.body);
    await newAccount.save();
    return res.status(200).json(newAccount);
  } catch (error) {
    next(next);
  }
};

const individualAccountList = async (req, res, next) => {
  try {
    const accounts = await IndividualModel.find();
    return res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
};

const updatedIndividualAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteIndividualAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const IndividualAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { createIndividualAccount };
