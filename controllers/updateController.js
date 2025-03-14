const db = require("../db/queries");


async function postUpdate(req, res) {
    console.log("Update");
}

async function removeBird(req, res) {
    const bird = req.params.birdID;
    await db.deleteBird(bird);
    res.redirect("/");
}

module.exports = {
    removeBird,
    postUpdate
};