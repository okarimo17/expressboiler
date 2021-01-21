const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { BlogService } = Services;
  route.post(
    "/",
    ErrorCatcher(async (req, res) => {
      const result = await BlogService.createEmptyBlog();

      res.json({
        success: true,
        message: "Blog créé avec succès.",
        body: result,
      });
    })
  );

  route.put(
    "/",
    ErrorCatcher(async (req, res) => {
      const result = await BlogService.updateBlog(req.body);
      res.json({
        success: true,
        message: "Blog mis à jour avec succès.",
        body: result,
      });
    })
  );
  route.delete(
    "/:blogid",
    ErrorCatcher(async (req, res) => {
      let { blogid } = req.params;
      const result = await BlogService.removeBlog(blogid);
      res.json({
        success: true,
        message: "Blog Supprimé avec succès.",
        body: result,
      });
    })
  );

  return route;
};
