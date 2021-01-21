const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const Page = sequelize.define(
    "page",
    {
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: true,
    }
  );

  return { model: Page };
};
