const db = require("../db/queries");

async function updateBird(req, res) {
    console.log("Update");
}

async function deleteBird(req, res) {
    const bird = req.body;
    await db.addBird(bird);
    res.redirect("/");
}

module.exports = {
    deleteBird,
    updateBird
};