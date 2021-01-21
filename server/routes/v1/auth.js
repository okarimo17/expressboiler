const route = require("express").Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60000,
  max: 6,
  message: {
    message: "trop de tentatives de connexion",
  },
});

module.exports = function (ErrorCatcher, Serives) {
  const { UserService, AuthService } = Serives;

  // route.post('/register',ErrorCatcher(async (req,res,next)=>{
  //     let user = await UserService.createUser(req.body);
  //     res.json({
  //         success:true,
  //         body: user
  //     })
  // }))

  route.post(
    "/login",
    limiter,
    AuthService.guest,
    ErrorCatcher(async (req, res) => {
      let user = await UserService.loginUser(req.body);
      AuthService.login(req, res, user.id);

      res.json({
        success: true,
        message: "Connexion réussie, redirection ...",
        redirect: "/",
      });
    })
  );

  route.get(
    "/logout",
    ErrorCatcher(async (req, res) => {
      if (AuthService.isLogged(req)) await AuthService.logout(req, res);
      res.redirect("/dashboard");
      //   res.json({
      //       succes:true,
      //       message:'logged out succes'
      //   })
    })
  );
  return route;
};
