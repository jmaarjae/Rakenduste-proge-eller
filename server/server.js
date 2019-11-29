const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database.js");
const mongoose = require("mongoose");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
const Item = require("./item.model.js");
const bodyParser = require("body-parser");
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-r8uc0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

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

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Access successful!");
    //deleteAllItems();
    migrate();
    listen();
  })
  .catch(err => {
    console.error("DB Access error: ", err);
  });

//Miinus: tegevused asünkroonsed-ei tea millal kõik tooted salvestatud
function migrate() {
  console.log("Checking item counts.");

  Item.count({}, (err, countNr) => {
    if (err) throw err;
    if (countNr > 0) {
      console.log("Items already exist, skipping");
      return;
    }
    console.log("Items missing so creating them.");
    saveAllItems();
  });
}

function deleteAllItems() {
  Item.deleteMany({}, (err, doc) => {
    console.log("err", err, "doc", doc);
  });
}

function saveAllItems() {
  console.log("migrate started");
  const items = DB.getItems();

  items.forEach(item => {
    const document = new Item(item);
    document.save(err => {
      if (err) {
        console.log(err);
        throw new Error("Something happened during save");
      }
      console.log("Succesfully saved");
    });
  });
  console.log("items", items);
}
