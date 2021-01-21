const Services = require("../services");
const { PageNotFound } = require("../errors");

const errorCatcher = function errorCatcher(handler) {
  return (...args) => handler(...args).catch(args[2]);
};

module.exports = function (app) {
  const {
    AuthService,
    edjsHTML,
    InformationService,
    BlogService,
    edjsHTML,
    DateService,
  } = Services;
  let EDHTML = edjsHTML();
  app.use("/v1", require("./v1")(Services));

  async function getCommonData(req, res, next) {
    req.information = await InformationService.getInformation();
    next();
  }

  app.get(
    "/",
    getCommonData,
    errorCatcher(async (req, res) => {
      // let blogs = await BlogService.getBlogs(3);
      // let slides = await SlideShowService.getSlides();
      // let testimonials = await TestimonialService.getTestimonials();
      // let transitions = await TransitionService.getTransitions(2);
      res.render("home", {
        information: req.information || {},
      });
    })
  );

  app.get(
    "/blog/:blogid",
    getCommonData,
    errorCatcher(async (req, res) => {
      let { blogid } = req.params;
      let blog = await BlogService.getSingleBlog(blogid);
      if (!blog) {
        throw new PageNotFound();
      }
      blog = blog.dataValues;
      blog.content = EDHTML.parse({ blocks: blog.content }).join("");
      blog.createdAt = DateService.formatDate(blog.createdAt);

      // res.render("single_blog", {
      //   blog,
      //   information: req.information,
      // });
      res.redirect("home");
    })
  );

  app.use(
    "/dashboard",
    AuthService.redirectLogin,
    require("./dashboard")(Services)
  );

  app.use("/clme-login", AuthService.redirectDash, (req, res) => {
    res.render("dashboard/login");
  });

  app.get(
    "*",
    // getCommonData,
    errorCatcher(async (req, res) => {
      throw new PageNotFound("page not found");
    })
  );
};
