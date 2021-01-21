const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { PageService } = Services;

  route.put(
    "/",
    ErrorCatcher(async (req, res) => {
      let { type } = req.query;
      const result = await PageService.updatePage(req.body, type);
      res.json({
        success: true,
        message: "Page mis à jour avec succès.",
        body: result,
      });
    })
  );

  return route;
};
