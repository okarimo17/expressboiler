const route = require("express").Router();

module.exports = function (ErrorCatcher, Services) {
  const { TransitionService } = Services;
  route.post(
    "/",
    ErrorCatcher(async (req, res) => {
      const result = await TransitionService.createEmptyTrans();
      res.json({
        success: true,
        message: "Transition créé avec succès.",
        body: result,
      });
    })
  );

  route.put(
    "/",
    ErrorCatcher(async (req, res) => {
      const result = await TransitionService.updateTrans(req.body);
      res.json({
        success: true,
        message: "Transition mis à jour avec succès.",
        body: result,
      });
    })
  );
  route.delete(
    "/:transid",
    ErrorCatcher(async (req, res) => {
      let { transid } = req.params;
      const result = await TransitionService.removeTrans(transid);
      res.json({
        success: true,
        message: "Transition Supprimé avec succès.",
        body: result,
      });
    })
  );

  return route;
};
