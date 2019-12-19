
/** Development environment. In Heroku we don't use .env file */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const database = require("./database.js");
const apiRouter = require("./apiRouter.js");

app.use(bodyParser.json());
app.use(apiRouter);

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
