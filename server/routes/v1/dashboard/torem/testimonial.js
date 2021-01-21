const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { TestimonialService } = Services;

  route.post(
    "/",
    ErrorCatcher(async (req, res) => {
      const result = await TestimonialService.insertTestimonialItem(req.body);
      res.json({
        success: true,
        message: "Témoignage mis à jour avec succès.",
        body: result,
      });
    })
  );

  route.delete(
    "/:galleryId",
    ErrorCatcher(async (req, res) => {
      let { galleryId } = req.params;
      const result = await TestimonialService.removeTestimonial(galleryId);
      res.json({
        success: true,
        message: "Témoignage mis à jour avec succès.",
        body: result,
      });
    })
  );
  return route;
};
