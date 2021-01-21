const route = require("express").Router();
const path = require("path");
const fs = require("fs");

module.exports = function (ErrorCatcher, Services) {
  const { UploadService } = Services;
  let { uploadImageMidllware } = UploadService;

  route.post(
    "/",
    (req, res, next) => {
      next();
    },
    uploadImageMidllware.single("image"),
    ErrorCatcher(async (req, res, next) => {
      if (!req.file) {
        return res.json({
          success: 0,
          message: "Veuillez utiliser une image valide.",
        });
      }
      res.json({
        success: 1,
        file: {
          url: path.join("/", "uploads", req.file.filename),
        },
      });
    })
  );

  route.post(
    "/delete",
    ErrorCatcher(async (req, res, next) => {
      let { file } = req.body;
      if (file && file.indexOf("uploads") != -1 && file.indexOf("..") == -1) {
        removeImages([file]);
      }
      res.json({
        success: true,
      });
    })
  );

  return route;
};

async function removeImages(imagesNames) {
  imagesNames.map((img) => {
    let path = `./public/${img}`;

    fs.stat(path, function (err, stat) {
      if (err == null) {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("file remove");
          //file removed
        });
      }
    });
  });
}
