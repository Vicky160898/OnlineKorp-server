const { decrypt } = require("../../../libs/Encryption/image-decrypt");
const { encrypt } = require("../../../libs/Encryption/image-encrypt");
const CorporateModel = require("../models/Corporate");

const createCorporateAccount = async (req, res, next) => {
  try {
    const filesWithUrls = req.files.map((file) => ({
      originalname: file.originalname,
      url: file.location, // Assuming `location` holds the URL of uploaded file
    }));
    console.log("here is the aws images array", filesWithUrls);
    const newAccountData = {
      ...req.body,
    };

    // Map each document URL to its corresponding field in newAccountData
    filesWithUrls.forEach((file) => {
      if (file.originalname.includes("certificate_incorporation")) {
        newAccountData.certificate_incorporation = encrypt(file.url);
      } else if (file.originalname.includes("certificate_current_standing")) {
        newAccountData.certificate_current_standing = encrypt(file.url);
      } else if (file.originalname.includes("certificate_of_memorandum")) {
        newAccountData.certificate_of_memorandum = encrypt(file.url);
      }
      // Add conditions for other documents as needed
    });

    const newAccount = new CorporateModel(newAccountData);
    await newAccount.save();
    return res.status(200).json(newAccount);
  } catch (error) {
    next(next);
  }
};

const corporateAccountList = async (req, res, next) => {
  try {
    const accounts = await CorporateModel.find();
    return res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
};

const updatedCorporateAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteCorporateAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const CorporateAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { createCorporateAccount };
