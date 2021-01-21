const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { GalleryService } = Services;

  route.post(
    "/",
    ErrorCatcher(async (req, res) => {
      let { type } = req.query;

      const result = await GalleryService.insertGalleryItem(req.body, type);
      res.json({
        success: true,
        message: "Gallery mis à jour avec succès.",
        body: result,
      });
    })
  );

  route.delete(
    "/:galleryId",
    ErrorCatcher(async (req, res) => {
      let { type } = req.query;
      let { galleryId } = req.params;
      const result = await GalleryService.removeGallery(galleryId, type);
      res.json({
        success: true,
        message: "Gallery mis à jour avec succès.",
        body: result,
      });
    })
  );
  return route;
};
