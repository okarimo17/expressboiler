const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const Blog = sequelize.define(
    "blog",
    {
      title: {
        type: DataTypes.STRING,
      },
      excrept: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.JSON,
      },
      picture: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return { model: Blog };
};
