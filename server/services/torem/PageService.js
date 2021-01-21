const { BadRequest, UnAuthorized } = require("../errors");
const { Op } = require("sequelize");
const { PageModel } = require("../db");

const {
  PageSchemas: { PageSchema },
} = require("../validaters");

function PageService() {
  let types = ["export", "import"];
  function getType(type) {
    if (!type || types.indexOf(type) == -1) {
      throw new BadRequest();
    }
    return type == "import" ? 1 : 2;
  }

  async function getSinglePage(type) {
    let id = getType(type);
    let blog = await PageModel.findByPk(id);
    return blog;
  }

  async function updatePage({ ...blogData }, type) {
    await PageSchema.validateAsync(blogData).catch((err) => {
      throw new BadRequest(err.message);
    });
    let blog = await getSinglePage(type);
    if (!blog) {
      throw new BadRequest();
    }
    await blog.update({ ...blogData, published: true });
    return blog;
  }

  return { updatePage, getSinglePage };
}

module.exports = PageService();
