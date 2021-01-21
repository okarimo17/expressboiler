const { BadRequest, UnAuthorized } = require("../errors");

const { InformationModel } = require("../db");

const { InformationSchemas } = require("../validaters");
const { Model } = require("sequelize");

function InformationService() {
  let { InformationSchema } = InformationSchemas;

  async function updateInformation(infoData) {
    let data = {
      content: { ...infoData },
    };

    await InformationSchema.validateAsync(data).catch((err) => {
      throw new BadRequest(err.message);
    });

    let info = await createInfoIfNotExist();
    let oldcontent = info.dataValues.content;
    await info.set({
      content: {
        ...oldcontent,
        ...infoData,
      },
    });
    await info.save();
    return true;
  }

  async function createInfoIfNotExist() {
    let info = await InformationModel.findByPk(1);
    return info;
  }

  async function getInformation() {
    let info = await createInfoIfNotExist();

    return info.content;
  }

  return {
    updateInformation,
    getInformation,
  };
}

module.exports = InformationService();
