const express = require("express");
const router = express.Router();
const DB = require("./database.js");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  imgSrc: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

// creates a new item
router.post("/api/items", (req, res) => {
  const props = {
    imgSrc: "google.com",
    title: "Yamaha white digital piano",
    price: 1200,
    category: "Digital Pianos"
  };
  const item1 = new Item(props);
  item1.save(err => {
    if (err) {
      console.log("Error", err);
      res.send(500);
      return;
    }
    console.log("Successful createItem!");
    res.send(201);
  });
});

//201-created:The request has been fulfilled and has 
//resulted in one or more new resources being created.

//500-internal server error
//Returns all items from DB
router.get("/api/items", (req, res) => {
  Item.find({}, function(err, items) {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send(err);
      return;
    }
    res.send(items);
  });
});

//Returns an item from DB, finds using Id

router.get("/api/items/:itemId", (req, res) => {
  Item.findById(req.params.itemId, function(err, item) {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send(err);
      return;
    }
    res.send(item);
  });
});

module.exports = router;
