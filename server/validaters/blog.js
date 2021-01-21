const Joi = require("joi");

const BlogSchema = Joi.object({
  title: Joi.string().min(7).required().label("Titre"),
  excrept: Joi.string().min(14).max(150).required().label("Descreption"),
  content: Joi.array().required().label("Contenu"),
  picture: Joi.string().min(5).required().label("Photo"),
});

module.exports = {
  BlogSchema,
};
