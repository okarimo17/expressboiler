const Joi = require("joi");

const HomeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  message: Joi.string().required(),
});

const ContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  entreprise: Joi.string().required(),
  message: Joi.string().required(),
});

const ServiceSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports = {
  HomeSchema,
  ContactSchema,
  ServiceSchema,
};
