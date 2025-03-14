const db = require("../db/queries");


async function postUpdate(req, res) {
    const bird = req.body;
    await db.updateBird(bird);
    res.redirect("/");
}

async function removeBird(req, res) {
    const bird = req.params.birdID;
    await db.deleteBird(bird);
    res.redirect("/");
}

async function editBirdPopulate(req, res) {
    const birdId = req.params.birdID;
    const singleBird = await db.getBird(birdId);
    res.render("editBird", {
        title: "Single Bird",
        bird: singleBird,
    });
}

module.exports = {
    removeBird,
    postUpdate,
    editBirdPopulate
};