const express = require("express");
const Logger = require("./Logger");
const routes = require("../routes");
const path = require("path");
const { SessionService } = require("../services");
const { UnAuthorized } = require("../errors");

class ExpressLoader {
  constructor(home_dir) {
    const app = express();
    let PORT = process.env.PORT || 3001;
    app.set("trust proxy", 1);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set("views", path.join(home_dir, "views"));
    app.set("view engine", "pug");

    SessionService.initSession(app);

    app.use(express.static("public"));

    routes(app);

    app.use(ExpressLoader.errorHandler);
    app.use(ExpressLoader.notFoundHandler);

    this.server = app.listen(PORT, () => {
      Logger.log(`Server Started :: http://localhost:${PORT}/`);
    });
  }

  getServer() {
    return this.server;
  }

  static errorHandler(err, req, res, next) {
    if (!err.status) {
      Logger.err(err);
      err.message = "Internel Server Error .";
    }
    if (res.headersSent) {
      return next(err);
    }
    if (err.status == 404) {
      return ExpressLoader.notFoundHandler(req, res);
    }
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internel Server Error .",
    });
  }

  static async notFoundHandler(req, res) {
    let { menuContent, information } = req;
    res.status(404).render("page-error", { menuContent, information });
  }

  static errorCatcher(handler) {
    return (...args) => handler(...args).catch(args[2]);
  }
}
module.exports = ExpressLoader;
