require('dotenv').config();

const express = require('express');
const app = express();
const mainRouter = require("./routes/mainRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});