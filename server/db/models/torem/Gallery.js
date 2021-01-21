const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const Gallery = sequelize.define("gallery", {
    nom: {
      type: DataTypes.STRING,
    },
  });

  function Associations() {
    Gallery.hasMany(sequelize.models.galleryitem, {
      foreignKey: "parent",
    });
  }

  return { model: Gallery, Associations };
};
