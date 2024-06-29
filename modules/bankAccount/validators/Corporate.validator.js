const Joi = require("joi");
const { objectIdValidator } = require("../../../libs/validator/Validator.libs");

const CorporateAccount = {
  body: Joi.object({
    bank_institute: Joi.string().required(),
    jurisdiction: Joi.string(),
    bank_account_type: Joi.string(),
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
      person_name: Joi.string(),
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
      business_activity_dacument: Joi.string(),
      non_cooprative: Joi.string(),
    }),
    certificate_incorporation: Joi.string(),
    certificate_current_standing: Joi.string(),
    certificate_of_memorandum: Joi.string(),
    certificate_of_register_directors: Joi.string(),
    certificate_signed_business: Joi.string(),
    certificate_register_Shareholders: Joi.string(),
    certificate_register_UBOs: Joi.string(),
    financial_letter: Joi.string(),
    kyc: Joi.string(),
    userId: Joi.custom(objectIdValidator).required(),
  }),
};

module.exports = { CorporateAccount };
