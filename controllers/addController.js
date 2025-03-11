const db = require("../db/queries");

async function makeForm(req, res) {
    res.render("addBird", {
        title: "Add Bird"
    });
}

module.exports = {
    makeForm,
};