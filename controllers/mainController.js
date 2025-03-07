const db = require("../db/queries");

async function getBirds(req, res) {
    // if(req.query.search){
    //     const searchedUser = await db.getUser(req.query.search);
    //     console.log(searchedUser);
    //     res.render("index", {
    //         title: "Search",
    //         users: searchedUser,
    //         searchData: true
    //     });
    // }else{
    //     const usernames = await db.getAllUsernames();
    //     res.render("index", {
    //         title: "User list",
    //         users: usernames,
    //     });
    // }
    const birdList = await db.getAllBirds();
    res.render("index", {
        title: "Birds",
        birds: birdList,
    });
}

module.exports = {
    getBirds,
};