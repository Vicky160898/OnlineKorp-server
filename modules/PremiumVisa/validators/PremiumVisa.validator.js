const Joi = require("joi");

// Define Joi schema for nested objects
const passportDetailsSchema = Joi.object({
  number: Joi.string(),
  expiryDate: Joi.date().iso(),
  issuingCountry: Joi.string(),
});

const contactDetailsSchema = Joi.object({
  address: Joi.string(),
  mobileNo: Joi.string(),
});

const applicantSchema = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  dob: Joi.date().iso(),
  gender: Joi.string().valid("Male", "Female", "Other"),
  nationality: Joi.string(),
  currentProfession: Joi.string(),
  countryOfBirth: Joi.string(),
  profession: Joi.string(),
  maritalStatus: Joi.string().valid("Single", "Married", "Divorced", "Widowed"),
  contactDetails: contactDetailsSchema,
  passportDetails: passportDetailsSchema,
});

const stayDetailsSchema = Joi.object({
  arrivalDate: Joi.date().iso(),
  departureDate: Joi.date().iso(),
});

const stayPurposeSchema = Joi.object({
  type: Joi.string(),
  details: Joi.string(),
});

const securityDetailsSchema = Joi.object({
  criminalCases: Joi.boolean(),
});

const healthDetailsSchema = Joi.object({
  infection: Joi.boolean(),
  disease: Joi.string(),
});

const documentsSchema = Joi.object({
  photo: Joi.string(),
  passport: Joi.string(),
  travelOrHealthInsurance: Joi.string(),
  airTicket: Joi.string(),
  bankStatement: Joi.string(),
  salarySlip: Joi.string(),
  accommodationProof: Joi.string(),
  employmentDocument: Joi.string(),
});

// Define Joi schema for the main Visa application
const create = Joi.object({
  jurisdiction: Joi.string().required(),
  country: Joi.string(),
  noOfApplicant: Joi.number(),
  renewal: Joi.object({
    type: Joi.string().valid("new", "renewal"),
    premiumVisaNo: Joi.when("type", {
      is: "renewal",
      then: Joi.number().required(),
    }),
    validateDate: Joi.when("type", {
      is: "renewal",
      then: Joi.date().iso().required(),
    }),
    renewalRequired: Joi.boolean().default(false),
  }),
  newApplication: Joi.boolean().default(false),
  applicants: Joi.array().items(applicantSchema),
  stayDetails: stayDetailsSchema,
  stayPurpose: stayPurposeSchema,
  securityDetails: securityDetailsSchema,
  healthDetails: healthDetailsSchema,
  incomeRevenue: Joi.string(),
  documents: documentsSchema,
});

module.exports = { create };
