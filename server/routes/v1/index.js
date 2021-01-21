const Router = require("express").Router();

const errorCatcher = require("../../loaders/Express").errorCatcher;

module.exports = function (Services) {
  const { AuthService } = Services;
  Router.use("/auth", require("./auth")(errorCatcher, Services));
  Router.use("/mail", require("./mail")(errorCatcher, Services));

  Router.use(
    "/user",
    AuthService.loggedIn,
    require("./user")(errorCatcher, Services)
  );

  Router.use(
    "/upload",
    AuthService.loggedIn,
    require("./uploader")(errorCatcher, Services)
  );

  Router.use(
    "/information",
    AuthService.loggedIn,
    require("./information")(errorCatcher, Services)
  );
  Router.use(
    "/",
    AuthService.loggedIn,
    require("./dashboard")(errorCatcher, Services)
  );
  return Router;
};
