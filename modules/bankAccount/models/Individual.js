const { Schema } = require("mongoose");
const AccountModel = require("./Account");

const IndividualSchema = new Schema({
  passport: { type: String },
  address_proof: { type: String },
  bank_statement: { type: String },
  bank_reference: { type: String },
  cv: { type: String },
});

const IndividualModel = AccountModel.discriminator(
  "Individual",
  IndividualSchema
);

module.exports = IndividualModel;
