const Joi = require("joi");

const GalleryItemSchema = Joi.object({
  category: Joi.string().min(4).required().label("title"),
  picture: Joi.string().min(4).required().label("picture"),
});

module.exports = {
  GalleryItemSchema,
};
