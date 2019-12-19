/** Development environment. In Heroku we don't use .env file */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const apiRouter = require("./apiRouter.js");
const database = require("./database.js");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(apiRouter);

/** For images and bundle.js */
app.use("/static", express.static("dist/static"));

/** For index.html */
app.use("/*", express.static("dist"));
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
