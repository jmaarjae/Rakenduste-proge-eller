const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const database = require("./database.js");
const mongoose = require("mongoose");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
const Item = require("./item.model.js");
const bodyParser = require("body-parser");

/** Development environment. In Heroku we don't use .env file */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-r8uc0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);

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

database
  .connect()
  .then(() => {
    listen();
  })
  .catch(err => {
    console.log("error on database connect", err);
  });
