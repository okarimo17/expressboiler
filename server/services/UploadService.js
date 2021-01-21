const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { BadRequest, UnAuthorized, ImageUploadError } = require("../errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function UploadService() {
  const uploadImageMidllware = multer({
    storage: storage,
    fileFilter: imageFilter,
  });

  function imageFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Veuillez utiliser une image valide.!";
      return cb(
        new ImageUploadError("Veuillez utiliser une image valide.!"),
        false
      );
    }
    // req.file.absolute = path.join()
    cb(null, true);
  }

  async function deleteImages(file) {
    if (file && file.indexOf("uploads") != -1 && file.indexOf("..") == -1) {
      await removeImages([file]);
    }
    return true;
  }

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

  return {
    uploadImageMidllware,
    deleteImages,
  };
}

module.exports = UploadService();
