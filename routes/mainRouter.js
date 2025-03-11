const { Router } = require("express");
const mainController = require("../controllers/mainController");
const mainRouter = Router();

mainRouter.get("/", mainController.getBirds);

mainRouter.get("/family/:familyName", mainController.getFamily);
mainRouter.get("/range/:rangeName", mainController.getRange);
mainRouter.get("/diet/:dietName", mainController.getDiet);
mainRouter.get("/migration/:migrationName", mainController.getMigration);
mainRouter.get("/habitat/:habitatName", mainController.getHabitat);
mainRouter.get("/conservation/:conservationName", mainController.getConservation);

module.exports = mainRouter;