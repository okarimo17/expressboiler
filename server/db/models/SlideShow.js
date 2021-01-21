const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const SlideShow = sequelize.define("slideshow", {
    nom: {
      type: DataTypes.STRING,
    },
  });

  function Associations() {
    SlideShow.hasMany(sequelize.models.slideitem, {
      foreignKey: "parent",
    });
  }

  return { model: SlideShow, Associations };
};
