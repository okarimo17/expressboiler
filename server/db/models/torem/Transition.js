const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize = new Sequelize()) {
  const Transition = sequelize.define("transition", {
    title: {
      type: DataTypes.STRING,
    },
    excrept: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.STRING,
    },
  });

  return { model: Transition };
};
