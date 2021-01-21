const Joi = require("joi");

const TransitionSchema = Joi.object({
  title: Joi.string().min(7).required().label("Titre"),
  excrept: Joi.string().min(14).max(150).required().label("Descreption"),
  date: Joi.date().required().label("Date"),
});

module.exports = {
  TransitionSchema,
};
