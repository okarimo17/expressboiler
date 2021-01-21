const Router = require("express").Router();

module.exports = function (errorCatcher, Services) {
  Router.use("/blog", require("./blog")(errorCatcher, Services));
  Router.use("/slides", require("./slides")(errorCatcher, Services));
  // Router.use("/gallery", require("./gallery")(errorCatcher, Services));
  // Router.use("/transition", require("./trans")(errorCatcher, Services));
  // Router.use("/page", require("./page")(errorCatcher, Services));
  // Router.use("/testimonial", require("./testimonial")(errorCatcher, Services));

  return Router;
};
