const Joi = require("joi");

const SlideItemSchema = Joi.object({
  title: Joi.string().min(4).required().label("title"),
  sub: Joi.string().min(4).required().label("subtitle"),
  desc: Joi.string().min(4).required().label("desc"),
  picture: Joi.string().min(4).required().label("picture"),
});

module.exports = {
  SlideItemSchema,
};
