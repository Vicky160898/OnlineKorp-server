const { Schema, model } = require("mongoose");

const VisaSchema = new Schema(
  {
    jurisdiction: { type: String, required: true },
    country: { type: String }, // Country of application
    noOfApplicant: { type: Number },
    renewal: {
      type: {
        type: String,
        enum: ["new", "renewal"], // Enum for type selection
      },
      premiumVisaNo: { type: Number }, // Number of previous premium visas
      validateDate: { type: Date }, // Date of validation
      renewalRequired: { type: Boolean, default: false }, // Renewal required indicator
    },
    applicants: {
      name: { type: String },
      surname: { type: String },
      dob: { type: Date }, // Date of birth
      gender: { type: String, enum: ["Male", "Female", "Other"] }, // Gender
      nationality: { type: String },
      currentProfession: { type: String },
      countryOfBirth: { type: String },
      profession: { type: String },
      maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed"],
      },
      contactDetails: {
        address: { type: String },
        mobileNo: { type: String },
      },
      passportDetails: {
        number: { type: String },
        expiryDate: { type: Date },
        issuingCountry: { type: String },
      },
    },
    stayDetails: {
      arrivalDate: { type: Date }, // Date of arrival
      departureDate: { type: Date }, // Date of departure
      type: {
        type: String,
        enum: ["holiday", "workRemotely", "retiree"], // Enum for type of stay
        required: true,
      },
      details: { type: String }, // Purpose details
      workType: { type: String }, // Specific to 'workRemotely' type
      workTypeDescription: { type: String }, // Specific to 'workRemotely' type
    },
    securityDetails: {
      criminalCases: { type: Boolean },
    },
    healthDetails: {
      infection: { type: Boolean }, // Has infection indicator
      disease: { type: String }, // Specific disease (if any)
    },
    incomeRevenue: {
      currency: {
        type: String,
        enum: ["USD", "EUR"],
      },
      monthlyIncome: { type: Number },
    },
    documents: {
      photo: { type: String },
      passport: { type: String },
      travelOrHealthInsurance: { type: String },
      airTicket: { type: String },
      bankStatement: { type: String },
      salarySlip: { type: String },
      accommodationProof: { type: String },
      employmentDocument: { type: String },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PremiumVisaModel = model("PremiumVisa", VisaSchema);

module.exports = PremiumVisaModel;
