const db = require("../db/queries");

async function getBirds(req, res) {
    const birdList = await db.getAllBirds();
    res.render("index", {
        title: "Birds",
        birds: birdList,
    });
}

async function getSingleBird(req, res) {
    const birdId = req.params.birdID;
    const singleBird = await db.getBird(birdId);
    res.render("singleBird", {
        title: "Single Bird",
        bird: singleBird,
    });
}

async function getFamily(req, res) {
    const { familyName } = req.params;
    const family = await db.getAllFamily(familyName);
    res.render("index", {
        title: `Birds by Family`,
        birds: family,
    });
}

async function getRange(req, res) {
    const { rangeName } = req.params;
    const range = await db.getAllRange(rangeName);
    res.render("index", {
        title: `Birds by Range`,
        birds: range,
    });
}

async function getDiet(req, res) {
    const {dietName} = req.params;
    const diet = await db.getAllDiet(dietName);
    res.render("index", {
        title: `Birds by Diet`,
        birds: diet,
    });
}

async function getMigration(req, res) {
    const {migrationName} = req.params;
    const migration = await db.getAllMigration(migrationName);
    res.render("index", {
        title: `Birds by Migration Pattern`,
        birds: migration,
    });  
}

async function getHabitat(req, res) {
    const {habitatName} = req.params;
    const habitat = await db.getAllHabitat(habitatName);
    res.render("index", {
        title: `Birds by Habitat`,
        birds: habitat,
    });  
}

async function getConservation(req, res) {
    const {conservationName} = req.params;
    const conservation = await db.getAllConservation(conservationName);
    res.render("index", {
        title: `Birds by Conservation Status`,
        birds: conservation,
    }); 
}

module.exports = {
    getBirds,
    getSingleBird,
    getFamily,
    getRange,
    getDiet,
    getMigration,
    getHabitat,
    getConservation
};