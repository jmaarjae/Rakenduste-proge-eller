const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./item.js");

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-r8uc0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get(`/items/*`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

//Cuz Heroku needs process.env.PORT
function listen() {
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http://localhost:${PORT}`);
  });
}

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Access successful!");
    listen();
  })
  .catch(err => {
    console.error("DB Access error: ", err);
  });
