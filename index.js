const express = require("express");
const app = express();
const path = require("path");
const templatepath = path.join(__dirname + "/template/views");
const fetch = require("node-fetch");
const port = process.env.PORT || 8000;
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// views engine
app.set("view engine", "hbs");
app.set("views", templatepath);
// routes
app.get("/", (req, res) => {
    res.redirect("/joke");
});
app.get("/joke", async (req, res) => {
    const request = await fetch(
        "https://sv443.net/jokeapi/v2/joke/Programming?type=single"
    );
    const body = await request.json();
    const joke = body.joke;
    res.render("index", { joke });
});
app.listen(port, () => {
    console.log(`server is up! port ${port}`);
});
