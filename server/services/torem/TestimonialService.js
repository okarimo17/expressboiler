const { BadRequest, UnAuthorized } = require("../errors");
const { Model } = require("sequelize");
const { TestimonialModel } = require("../db");

const UploadService = require("./UploadService");

const {
  TestimonialSchemas: { TestimonialItemSchema },
} = require("../validaters");

function TestimonialService() {
  async function getTestimonials() {
    let testimonials = await TestimonialModel.findAll({});
    return testimonials;
  }

  async function insertTestimonialItem({ id, ...testiItem }) {
    await TestimonialItemSchema.validateAsync(testiItem).catch((err) => {
      throw new BadRequest(err.message);
    });
    testiItem.picture = testiItem.picture.replace(/\\/g, "/");

    if (id == -1) {
      await TestimonialModel.create(testiItem);
    } else {
      if (!(await TestimonialModel.findByPk(id))) {
        throw new BadRequest();
      }
      await TestimonialModel.update(testiItem, {
        where: {
          id: id,
        },
      });
    }
    return await getTestimonials();
  }

  async function removeTestimonial(id) {
    let testmonialItem = await TestimonialModel.findByPk(id);
    if (!testmonialItem) {
      throw new BadRequest();
    }
    await UploadService.deleteImages(testmonialItem.picture);
    await TestimonialModel.destroy({ where: { id: id } });
    return await getTestimonials();
  }

  return { getTestimonials, insertTestimonialItem, removeTestimonial };
}

module.exports = TestimonialService();
