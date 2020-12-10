const http = require("http");
const express = require("express");
const morgan = require("morgan")
const helmet = require("helmet")


const app = express();
const server = http.createServer(app);

const logger = morgan("tiny")

const port = 3000;

app.use(logger)
app.use(helmet())

// Needed for Templates
const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

const path = require("path");
const {
    runInNewContext
} = require("vm");
const petArr = [
    "cat",
    "dog",
    "snake"
]


app.use(express.static("templates"));
const petObj = {
    cat: "this is my ugly cat peter",
    dog: "This is my dog casper he is crazy",
    snake: "I had corn snake name "


}
const petImg = {
    cat: "",
    dog: " ",
    snake: 'https://www.thesprucepets.com/thmb/qgOmVujhci8DgF1LXdRwOsEN984=/2592x2592/smart/filters:no_upscale()/corn-snake-from-the-lower-florida-keys-530475947-588124bc5f9b58bdb3ec9f93.jpg',

}





app.get("/", (req, res) => {
    res.render("home");
});

// Needed for templates rendering
app.get("/pets", (req, res) => {
    const pets = petArr
    res.render("pets", {
        locals: {
            pets
        },

    })
});

app.get("/pets/:id", (req, res) => {
    const id = req.params.id
    const des = petObj
    res.render("finalpage", {
        locals: {
            id,
            des: des[id],
            img: petImg[id]
        }


    })
})



server.listen(port, () => {
    console.log(`Running on host: port`);
});