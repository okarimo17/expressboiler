const { BadRequest, UnAuthorized } = require("../errors");
const { Model } = require("sequelize");
const { SlideItemModel, SlideShowModel } = require("../db");
const UploadService = require("./UploadService");

const {
  SlideShowSchemas: { SlideItemSchema },
} = require("../validaters");

function SlideShowService() {
  async function getSlides() {
    let slides = await SlideShowModel.findByPk(1, {
      include: {
        all: true,
      },
    });
    return slides.slideitems;
  }

  async function insertSlideItem({ id, ...slideItem }) {
    await SlideItemSchema.validateAsync(slideItem).catch((err) => {
      throw new BadRequest(err.message);
    });
    slideItem.picture = slideItem.picture.replace(/\\/g, "/");
    if (id == -1) {
      await SlideItemModel.create({ ...slideItem, parent: 1 });
    } else {
      if (!(await SlideItemModel.findByPk(id))) {
        throw new BadRequest();
      }
      await SlideItemModel.update(slideItem, {
        where: {
          id: id,
        },
      });
    }
    return await getSlides();
  }

  async function removeSlide(id) {
    let slide = await SlideItemModel.findByPk(id);
    if (!slide) {
      throw new BadRequest();
    }
    await UploadService.deleteImages(slide.picture);
    await SlideItemModel.destroy({ where: { id: id } });
    return await getSlides();
  }

  return { getSlides, insertSlideItem, removeSlide };
}

module.exports = SlideShowService();
