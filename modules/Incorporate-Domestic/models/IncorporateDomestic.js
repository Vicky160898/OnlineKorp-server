const { Schema, model } = require("mongoose");

const IncorporateDomesticSchema = new Schema({
  jurisdiction: { type: String, required: true },
  companyType: { type: String },
  companies: [
    {
      companyName: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            // Validation function to check if name ends with 'Limited', 'Ltee', or 'Ltd'
            return /(Limited|Ltee|Ltd)$/.test(v);
          },
          message: (props) =>
            `${props.value} must end with 'Limited', 'Ltee', or 'Ltd'`,
        },
      },
      labelRestriction: {
        type: Boolean,
        default: true,
        validate: {
          validator: function (v) {
            // Validation function to check if label restrictions are met
            return !/(Bank|University|Hospital)/.test(v);
          },
          message: (props) =>
            `${props.value} cannot contain labels like 'Bank', 'University', 'Hospital'`,
        },
      },
    },
  ],
  shares: [
    {
      type: { type: String, enum: ["ordinary"], default: "ordinary" },
      numberOfShares: { type: Number },
      noParValueMUR: { type: Number },
    },
  ],
});

const IncorporateDomesticModel = model(
  "IncorporateDomestic",
  IncorporateDomesticSchema
);

module.exports = IncorporateDomesticModel;
