const db = require("../db/queries");

async function makeForm(req, res) {
    res.render("addBird", {
        title: "Add Bird"
    });
}

async function postBird(req, res) {
    const bird = req.body;
    await db.addBird(bird);
    res.redirect("/");
}

module.exports = {
    makeForm,
    postBird
};