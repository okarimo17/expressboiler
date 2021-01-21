let SeedNames = [
  "User",
  "SlideShow",
  "SlideItem",
  "Information",
  "Blog",
  // "Gallery",
  // "Testimonial",
  // "Transition",
  // "Page",
];

module.exports = function (models) {
  SeedNames.map((name) => {
    let seed = require(`./${name}`)(models[name + "Model"]);
  });
};
