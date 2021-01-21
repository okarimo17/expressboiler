const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const SlideItem = sequelize.define("slideitem", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
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

  return { model: SlideItem };
};
