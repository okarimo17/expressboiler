const Joi = require("joi");

const TestimonialItemSchema = Joi.object({
  content: Joi.string().min(4).required().label("title"),
  picture: Joi.string().min(4).required().label("picture"),
});

module.exports = {
  TestimonialItemSchema,
};
