require("dotenv").config();
const { optimizeAndUploadImage } = require("../../../helpers/image-optimize");
const AccountModel = require("../models/Account");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

const createAccount = async (req, res, next) => {
  try {
    const requestBody = JSON.parse(JSON.stringify(req.body));
    const requestFile = req.file ? JSON.parse(JSON.stringify(req.file)) : null;

    console.log("here is the createAccount", requestBody);
    console.log("here is the image account.", requestFile);
    console.log("token user id here..", req.file.mimetype);
    //here file uploading logi here.
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    //console.log("File details:", req.file);
    if (req.file.mimetype.startsWith("image/")) {
      // If uploaded file is an image, optimize it and upload to S3
      const optimizedImagePath = `uploads/optimized-${req.file.filename}`;
      const s3ImageUrl = await optimizeAndUploadImage(
        req.file.path,
        optimizedImagePath,
        req.file.mimetype
      );
      return res.status(200).json({ s3ImageUrl });
    } else if (req.file.mimetype === "application/pdf") {
      const uploadedPdfPath = `uploads/${req.file.filename}`;
      const params = {
        Bucket: bucketName,
        Key: uploadedPdfPath,
        Body: req.file.buffer, // Directly use file buffer for PDF upload
        ContentType: "application/pdf",
      };

      const data = await s3.upload(params).promise();
      console.log("PDF uploaded to S3:", data.Location);
      return res.status(200).json({ location: data.Location });
    } else {
      return res.status(400).json({ message: "Unsupported file type." });
    }
    // const newAccount = new AccountModel(req.body);
    // await newAccount.save();
    // return res.status(200).json(newAccount);
  } catch (error) {
    console.log("creating account error here.", error);
    next(next);
  }
};

const GetAccounts = async (req, res, next) => {
  try {
    const accounts = await AccountModel.find();
    return res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
};

const GetSingleAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const account = await AccountModel.findById(accountId);
    return res.status(200).json({ account });
  } catch (error) {
    next(error);
  }
};

const UpdateAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const { bank_institute, jurisdiction, currency, name } = req.body;
    let account = await AccountModel.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (bank_institute) {
      account.bank_institute = bank_institute;
    }
    if (jurisdiction) {
      account.jurisdiction = jurisdiction;
    }
    if (currency) {
      account.currency = currency;
    }
    if (name) {
      account.name = name;
    }
    await account.save();
    return res.status(200).json({ account });
  } catch (error) {
    next(error);
  }
};

const DeleteAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    await AccountModel.deleteOne({ _id: accountId });
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccount,
  GetAccounts,
  GetSingleAccount,
  DeleteAccount,
  UpdateAccount,
};
