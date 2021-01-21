const { BadRequest, UnAuthorized } = require("../errors");
const { Op } = require("sequelize");
const { TransitionModel } = require("../db");

const {
  TransitionSchemas: { TransitionSchema },
} = require("../validaters");

function TransitionService() {
  async function createEmptyTrans() {
    let trans = await TransitionModel.create();
    return trans.id;
  }

  async function getTransitions(max) {
    let limit = max ? { limit: max } : {};
    let trans = await TransitionModel.findAll({
      order: [["id", "desc"]],
      where: {
        published: true,
      },
      ...limit,
    });
    return trans;
  }

  async function getAllTrans(max) {
    let limit = max ? { limit: max } : {};
    let blogs = await TransitionModel.findAll({
      order: [["id", "desc"]],
      ...limit,
    });
    return blogs;
  }

  async function getSingleTrans(id) {
    let blog = await TransitionModel.findByPk(id);
    return blog;
  }

  async function updateTrans({ id, ...blogData }) {
    await TransitionSchema.validateAsync(blogData).catch((err) => {
      throw new BadRequest(err.message);
    });
    let blog = await getSingleTrans(id);
    if (!blog) {
      throw new BadRequest();
    }
    await blog.update({ ...blogData, published: true });
    return blog;
  }

  async function removeTrans(id) {
    let blog = await getSingleTrans(id);
    if (!blog) {
      throw new BadRequest();
    }
    await TransitionModel.destroy({
      where: {
        id,
      },
    });
    return await getAllTrans();
  }

  return {
    createEmptyTrans,
    getTransitions,
    getSingleTrans,
    updateTrans,
    getAllTrans,
    removeTrans,
  };
}

module.exports = TransitionService();
