const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");

// Deletes an item from DB using item ID
router.delete("/api/items/:itemId", (req, res) => {
  Item.deleteOne({ _id: mongoose.Types.ObjectId(req.params.itemId) }, err => {
    if (err) {
      console.log("error:", err);
      return res.send(500);
    }
    console.log("save success");
    return res.send(204);
  });
});

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

//In arrow fn-s remember RETURN!
//201-created:The request has been fulfilled and has resulted in one or more new resources being created.
//500-internal server error
//204-no content(in this case: success)
