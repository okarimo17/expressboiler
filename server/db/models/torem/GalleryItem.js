const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const GalleryItem = sequelize.define("galleryitem", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // function Associations() {
  //   SlideItem.belongsTo(sequelize.models.slideshow, {
  //     foreignKey: "parent",
  //     as: "parentSlide",
  //   });
  // }

  return { model: GalleryItem };
};
