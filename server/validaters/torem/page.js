const Joi = require("joi");

const PageSchema = Joi.object({
  content: Joi.array().required().label("Contenu"),
});

module.exports = {
  PageSchema,
};
