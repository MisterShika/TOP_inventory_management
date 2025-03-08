const { Router } = require("express");
const mainController = require("../controllers/mainController");
const mainRouter = Router();

mainRouter.get("/", mainController.getBirds);
mainRouter.get("/family/:familyName", mainController.getFamily);

module.exports = mainRouter;