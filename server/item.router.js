const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");

// Deletes an item from DB using item ID
router.delete("/:itemId", (req, res) => {
  Item.deleteOne({ _id: mongoose.Types.ObjectId(req.params.itemId) }, err => {
    if (err) return res.send(500);
    console.log("Item deleted");
    return res.send(204);
  });
});

//edit item title
router.post("/:itemId", async (req, res) => {
    console.log("router", req.params.itemId, req.body.changeTitle);
    let doc = await Item.findOne({ _id: req.params.itemId});
    doc.title = req.body.changeTitle;
    await doc.save();
    if (doc.title !== req.body.changeTitle) {
      return res.status(500).send("Error on editing item title");
    }
    res.sendStatus(200);
  });

// creates a new item
router.post("/", (req, res) => {
  const props = {
    imgSrc: req.body.imgSrc,
    title: req.body.title,
    price: req.body.price
  };
  const newItem = new Item(props);
  newItem.save(err => {
    if (err) {
      console.log("Error", err);
      res.send(500);
      return;
    }
    console.log("Successful createItem!");
    res.sendStatus(201);
  });
});

//Returns all items from DB
router.get("/", (req, res) => {
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
router.get("/:itemId", (req, res) => {
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
