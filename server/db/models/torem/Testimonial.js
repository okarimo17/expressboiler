const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const Testimonial = sequelize.define("testimonial", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return { model: Testimonial };
};
