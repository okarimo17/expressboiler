const { BadRequest, UnAuthorized } = require("../errors");
const { Model } = require("sequelize");
const { GalleryModel, GalleryItemModel } = require("../db");

const UploadService = require("./UploadService");

const {
  GallerySchemas: { GalleryItemSchema },
} = require("../validaters");

function GalleryService() {
  let types = ["export", "import"];

  function getType(type) {
    if (!type || types.indexOf(type) == -1) {
      throw new BadRequest();
    }
    return type == "import" ? 1 : 2;
  }
  async function getGallery(type) {
    let place = getType(type);
    let gallery = await GalleryModel.findByPk(place, {
      include: {
        all: true,
      },
    });
    return gallery.galleryitems;
  }

  async function insertGalleryItem({ id, ...galleryItem }, type) {
    await GalleryItemSchema.validateAsync(galleryItem).catch((err) => {
      throw new BadRequest(err.message);
    });
    galleryItem.picture = galleryItem.picture.replace(/\\/g, "/");
    galleryItem.category = galleryItem.category.toLocaleLowerCase();
    if (id == -1) {
      await GalleryItemModel.create({ ...galleryItem, parent: getType(type) });
    } else {
      if (!(await GalleryItemModel.findByPk(id))) {
        throw new BadRequest();
      }
      await GalleryItemModel.update(galleryItem, {
        where: {
          id: id,
        },
      });
    }
    return await getGallery(type);
  }

  async function removeGallery(id, type) {
    let galleryItem = await GalleryItemModel.findByPk(id);
    if (!galleryItem) {
      throw new BadRequest();
    }
    await UploadService.deleteImages(galleryItem.picture);
    await GalleryItemModel.destroy({ where: { id: id } });
    return await getGallery(type);
  }

  return { getGallery, insertGalleryItem, removeGallery };
}

module.exports = GalleryService();
