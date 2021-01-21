let { Sequelize } = require("sequelize");

let { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

let sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: "sqlite",
  host: DB_HOST,
  storage: "./server/database/database.sqlite",
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    // console.log('DB Connected.');
  } catch (err) {
    console.log("DB Connection Error :: ", err.message);
  }
})();

module.exports = sequelize;
