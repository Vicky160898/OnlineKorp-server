const Joi = require("joi");
const { objectIdValidator } = require("../../../libs/validator/Validator.libs");

const create = {
  body: Joi.object({
    planName: Joi.string().required(),
    planType: Joi.string().required(),
    price: Joi.number().required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
  }),
};
const update = {
  params: Joi.object({
    subsciptionId: Joi.string().required(),
  }),
  body: Joi.object({
    planName: Joi.string(),
    planType: Joi.string(),
    price: Joi.number(),
  }),
};

const remove = {
  params: Joi.object({
    subsciptionId: Joi.custom(objectIdValidator).required(),
  }),
};

const get = {
  params: Joi.object({
    subsciptionId: Joi.custom(objectIdValidator).required(),
  }),
};

module.exports = { create, update, remove, get };
