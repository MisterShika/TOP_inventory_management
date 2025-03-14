const { Router } = require("express");
const mainController = require("../controllers/mainController");
const addController = require("../controllers/addController");
const updateController = require("../controllers/updateController");
const mainRouter = Router();

mainRouter.get("/", mainController.getBirds);

mainRouter.get("/bird/:birdID", mainController.getSingleBird);

mainRouter.get("/family/:familyName", mainController.getFamily);
mainRouter.get("/range/:rangeName", mainController.getRange);
mainRouter.get("/diet/:dietName", mainController.getDiet);
mainRouter.get("/migration/:migrationName", mainController.getMigration);
mainRouter.get("/habitat/:habitatName", mainController.getHabitat);
mainRouter.get("/conservation/:conservationName", mainController.getConservation);

mainRouter.get("/add-birds", addController.makeForm);
mainRouter.post("/add-birds", addController.postBird);

mainRouter.get("/delete-bird/:birdID", updateController.removeBird);

mainRouter.get("/edit-bird/:birdID", updateController.editBirdPopulate);
mainRouter.post("/edit-bird", updateController.postUpdate);

module.exports = mainRouter;