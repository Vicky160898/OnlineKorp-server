const { Schema } = require("mongoose");
const AccountModel = require("./Account");

const CorporateSchema = new Schema({
  certificate_incorporation: { type: String },
  certificate_good_standing: { type: String },
  certificate_of_memorandum_Articles: { type: String },
  certificate_Business_Proposal:{type:String},
  certificate_of_register_directors: { type: String },
  certificate_register_Shareholders: { type: String },
  certificate_register_UBOs: { type: String },
  financial_letter: { type: String },
  kyc: { type: String },
});

const CorporateModel = AccountModel.discriminator("Corporate", CorporateSchema);
module.exports = CorporateModel;
