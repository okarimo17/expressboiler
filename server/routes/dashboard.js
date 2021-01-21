const Router = require("express").Router();
const { PageNotFound } = require("../errors");

const errorCatcher = require("../loaders/Express").errorCatcher;

module.exports = function (Services) {
  const {
    BlogService,
    SlideShowService,
    InformationService,
    UserService,
  } = Services;
  Router.get(
    "/",
    errorCatcher(async (req, res) => {
      let information = await InformationService.getInformation();
      res.render("dashboard/home", { information });
    })
  );

  Router.get(
    "/blog",
    errorCatcher(async (req, res) => {
      const blogs = await BlogService.getAllBlogs();
      res.render("dashboard/blog_list", { blogs });
    })
  );
  Router.get(
    "/blog/:id",
    errorCatcher(async (req, res) => {
      let { id } = req.params;
      const blog = await BlogService.getSingleBlog(id);
      if (!blog) {
        throw new PageNotFound("Blog Doesn't Exist");
      }
      res.render("dashboard/blog_single", { blog });
    })
  );

  Router.get(
    "/information",
    errorCatcher(async (req, res) => {
      let information = await InformationService.getInformation();
      res.render("dashboard/informations", { information });
    })
  );
  Router.get(
    "/contact",
    errorCatcher(async (req, res) => {
      let information = await InformationService.getInformation();
      res.render("dashboard/contact", { information });
    })
  );
  Router.get(
    "/slideshow",
    errorCatcher(async (req, res) => {
      let slides = await SlideShowService.getSlides();
      res.render("dashboard/home_slider", {
        slides,
      });
    })
  );

  Router.get(
    "/account",
    errorCatcher(async (req, res) => {
      let user = await UserService.findUserById({ id: req.session.userid });
      res.render("dashboard/account", {
        user,
      });
    })
  );

  /* routes comes here */

  Router.use("*", notFoundHandler);
  Router.use("*", errorHandler);

  function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.status == 404) {
      return res.status(404).render("dashboard/error");
    }
    next();
  }

  function notFoundHandler(req, res) {
    res.status(404).render("dashboard/error");
  }
  return Router;
};
