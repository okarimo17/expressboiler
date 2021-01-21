const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { InformationService } = Services;
  // let {uploadImageMidllware} = UploadService;

  route.post(
    "/",
    ErrorCatcher(async (req, res, next) => {
      let info = await InformationService.updateInformation(req.body);
      res.json({
        success: true,
        message: "les informations ont été mises à jour",
      });
    })
  );

  return route;
};
