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
  const { MailService } = Serives;

  route.post(
    "/home",
    limiter,
    ErrorCatcher(async (req, res) => {
      let result = await MailService.sendHomeMail(req.body);
      res.json({
        ...result,
      });
    })
  );

  route.post(
    "/contact",
    limiter,
    ErrorCatcher(async (req, res) => {
      let result = await MailService.sendContactMail(req.body);
      res.json({
        ...result,
      });
    })
  );

  route.post(
    "/service",
    limiter,
    ErrorCatcher(async (req, res) => {
      let result = await MailService.sendServiceContactMail(req.body);
      res.json({
        ...result,
      });
    })
  );

  return route;
};
