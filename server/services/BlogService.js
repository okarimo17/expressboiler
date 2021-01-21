const { BadRequest, UnAuthorized } = require("../errors");
const { Op } = require("sequelize");
const { BlogModel } = require("../db");

const {
  BlogSchemas: { BlogSchema },
} = require("../validaters");

function BlogService() {
  async function createEmptyBlog() {
    let blog = await BlogModel.create();
    return blog.id;
  }

  async function getBlogs(max) {
    let limit = max ? { limit: max } : {};
    let blogs = await BlogModel.findAll({
      order: [["id", "desc"]],
      where: {
        published: true,
      },
      ...limit,
    });
    return blogs;
  }

  async function getAllBlogs(max) {
    let limit = max ? { limit: max } : {};
    let blogs = await BlogModel.findAll({
      order: [["id", "desc"]],
      ...limit,
    });
    return blogs;
  }

  async function similairBlogs(blogid, max = 2) {
    let limit = max ? { limit: max } : {};
    console.log(blogid);
    let blogs = await BlogModel.findAll({
      where: {
        id: {
          [Op.ne]: blogid,
        },
        published: true,
      },
      order: [["id", "desc"]],
      ...limit,
    });

    return blogs;
  }

  async function getSingleBlog(id) {
    let blog = await BlogModel.findByPk(id);
    return blog;
  }

  async function updateBlog({ id, ...blogData }) {
    await BlogSchema.validateAsync(blogData).catch((err) => {
      throw new BadRequest(err.message);
    });
    let blog = await getSingleBlog(id);
    if (!blog) {
      throw new BadRequest();
    }
    blogData.picture = blogData.picture.replace(/\\/g, "/");
    await blog.update({ ...blogData, published: true });
    return blog;
  }

  async function removeBlog(id) {
    let blog = await getSingleBlog(id);
    if (!blog) {
      throw new BadRequest();
    }
    await BlogModel.destroy({
      where: {
        id,
      },
    });
    return await getAllBlogs();
  }

  return {
    createEmptyBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
    similairBlogs,
    getAllBlogs,
    removeBlog,
  };
}

module.exports = BlogService();
