const sequelize = require("../config/dbcon");

// To Do : Import Many Models Auto.
let ModelNames = [
  "User",
  "Information",
  "Blog",
  "SlideItem",
  "SlideShow",
  // "Gallery",
  // "GalleryItem",
  // "Testimonial",
  // "Transition",
  // "Page",
];

function getModels() {
  let { models, associations } = ModelNames.reduce(
    (reducer, modelName) => {
      let { model, Associations } = require(`./models/${modelName}`)(sequelize);
      reducer.models[modelName + "Model"] = model;
      if (Associations) {
        reducer.associations.push(Associations);
      }
      return reducer;
    },
    { models: {}, associations: [] }
  );
  // sequelize.sync({ force: true }).then(() => {
  //   try {
  //     associations.map((assoc) => assoc());
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  //   let seeds = require("./seeds/index")(models);
  //   console.log("synced");
  // });

  associations.map((assoc) => assoc());

  return models;
}

module.exports = { ...getModels(), sequelize };
