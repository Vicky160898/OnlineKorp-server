const Joi = require("joi");
const { objectIdValidator } = require("../../../libs/validator/Validator.libs");

const create = {
  body: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    plan: Joi.string().valid("basic", "premium"),
    password: Joi.string()
      .min(8)
      .pattern(RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    role: Joi.string().valid("super admin", "admin", "user"),
    planStatus: Joi.string().valid("active", "inactive"),
    next_payment_date: Joi.string(),
  }),
};

const logIn = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
};

const list = {
  query: Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).pattern(RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: Joi.string().valid("super admin", "admin", "user"),
    plan: Joi.string().valid("basic", "premium"),
  }),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  sortBy: Joi.string().default("createdAt"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
};

const update = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  body: Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email(),
  }),
};

const remove = {
  params: Joi.object({
    userId: Joi.custom(objectIdValidator).required(),
  }),
};

module.exports = { create, logIn, list, update, remove };
