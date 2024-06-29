const Joi = require("joi");
const { objectIdValidator } = require("../../../libs/validator/Validator.libs");

const create = {
  body: Joi.object({
    bank_institute: Joi.string(),
    jurisdiction: Joi.string(),
    accountType: Joi.string().valid("Corporate", "Individual"),
    currency: Joi.string(),
    name: Joi.string(),
    email: Joi.string().email(),
    telephone_no: Joi.string()
      .min(7)
      .max(15)
      .pattern(/^[0-9]{7,15}$/)
      .allow("")
      .optional(),
    mobile_no: Joi.string()
      .min(10)
      .max(15)
      .pattern(/^[0-9]{10,15}$/),
    policy: Joi.boolean(),
    status: Joi.string().valid("Pending", "Approved", "Rejected"),
    alternate_details: Joi.object({
      telephone_no: Joi.string()
        .min(7)
        .max(15)
        .pattern(/^[0-9]{7,15}$/)
        .allow("")
        .optional(),
      mobile_no: Joi.string()
        .min(10)
        .max(15)
        .pattern(/^[0-9]{10,15}$/),
      email: Joi.string().email(),
      service: Joi.string(),
      business_activity: Joi.string(),
      non_cooprative: Joi.string(),
    }),

    // Corporate-specific fields
    certificate_incorporation: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    certificate_good_standing: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    certificate_of_memorandum_Articles: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    certificate_of_register_directors: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    certificate_Business_Proposal: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    certificate_register_Shareholders: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    certificate_register_UBOs: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    financial_letter: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),
    kyc: Joi.string().when("accountType", {
      is: "Corporate",
      then: Joi.optional(),
    }),

    // Individual-specific fields
    passport: Joi.string().when("accountType", {
      is: "Individual",
      then: Joi.optional(),
    }),
    address_proof: Joi.string().when("accountType", {
      is: "Individual",
      then: Joi.optional(),
    }),
    bank_statement: Joi.string().when("accountType", {
      is: "Individual",
      then: Joi.optional(),
    }),
    bank_reference: Joi.string().when("accountType", {
      is: "Individual",
      then: Joi.optional(),
    }),
    cv: Joi.string().when("accountType", {
      is: "Individual",
      then: Joi.optional(),
    }),
    userId: Joi.custom(objectIdValidator).required(),
  }),
};

const get = {
  params: Joi.object({
    accountId: Joi.custom(objectIdValidator).required(),
  }),
};

const list = {
  query: Joi.object({
    query: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    sortBy: Joi.string().default("createdAt"),
    sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  }),
};

const remove = {
  params: Joi.object({
    accountId: Joi.custom(objectIdValidator).required(),
  }),
};

const update = {
  params: Joi.object({
    userId: Joi.custom(objectIdValidator).required(),
  }),
  body: Joi.object({}),
};

module.exports = { create, get, list, remove, update };
