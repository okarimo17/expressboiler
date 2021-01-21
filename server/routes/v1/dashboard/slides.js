const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { SlideShowService } = Services;

  route.post(
    "/",
    ErrorCatcher(async (req, res) => {
      const result = await SlideShowService.insertSlideItem(req.body);
      res.json({
        success: true,
        message: "SlideShow mis à jour avec succès.",
        body: result,
      });
    })
  );

  route.delete(
    "/:slide_id",
    ErrorCatcher(async (req, res) => {
      let { slide_id } = req.params;
      const result = await SlideShowService.removeSlide(slide_id);
      res.json({
        success: true,
        message: "SlideShow mis à jour avec succès.",
        body: result,
      });
    })
  );
  return route;
};
