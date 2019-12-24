const express = require("express");
const router = express.Router();
const User = require("./user.model.js");
const Item = require("./item.model.js");
const { authMiddleware } = require("./middlewares.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Payment = require("./payments.model");

router.post("/:userId", async (req, res) => {
  console.log("router", req.user._id, req.body.email);
  let doc = await User.findOne({ _id: req.user._id });
  doc.email = req.body.email;
  await doc.save();
  if (doc.email !== req.body.email) {
    return res.status(500).send("Error on editing email");
  }
  res.sendStatus(200);
});

router.param("userId", (req, res, next, userId) => {
  User.findById(userId, (err, user) => {
    if (err || !user) return res.status(500).send("Error on user param");
    req.user = user;
    next();
  });
});

router.param("itemId", (req, res, next, itemId) => {
  Item.findById(itemId, (err, item) => {
    if (err || !item) return res.status(500).send("Error on item param");
    req.item = item;
    next();
  });
});

/** Returns an user object */
router.get("/:userId", authMiddleware, (req, res) => {
  res.send(req.user);
});

/** Add an item to a cart */
router.put("/:userId/cart/:itemId", (req, res) => {
  req.user.cart.push(req.item._id.toString());
  req.user.save(err => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error on cart save");
    }
    res.sendStatus(200);
  });
});

/** Remove an item from a cart */
router.delete("/:userId/cart/:itemId", (req, res) => {
  const index = req.user.cart.findIndex(
    itemId => itemId === req.item._id.toString()
  );
  req.user.cart.splice(index, 1);

  req.user.save(err => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error on cart save");
    }
    res.sendStatus(200);
  });
});

//Gets all users

router.get("/", (req, res) => {
  User.find({}, (err, docs) => {
    if (err) return handleError(err, res);
    res.status(200).json(docs);
  });
});

//Delete all users

router.delete("/", (req, res) => {
  User.deleteMany({}, (err, docs) => {
    if (err) return handleError(err, res);
    console.log(docs);
    console.log("Successfully deleted all users");
    res.send(204);
  });
});

function handleError(err, res) {
  console.log(err);
  res.send(500);
}

router.get("/:userId/payments", authMiddleware, (req, res) => {
  Payment.getUserPayments(req.user._id)
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      console.log("user router: payments error", err);
      res.send(500);
    });
});

//asyc ehk asynkroonne

//arvutab ostukorvi summa(getCartAmount),
//loob uue paymenti(createPayment),
//salvestab andmebaasi,
//tyhjendab ostukorvi

router.post("/:userId/checkout", authMiddleware, async (req, res) => {
  const { error, amount } = await req.user.getCartAmount();
  //console.log(req.body);
  if (error) return res.send(500);
  req.user
    .createPayment(amount)
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      return stripe.charges.create({
        //sest tegu sentidega
        amount: amount * 100,
        currency: "eur",
        source: req.body.id
      });
    })
    .then(stripeResponse => {
      console.log("stripe res", stripeResponse);
      res.send(200);
    })
    .catch(() => {
      res.send(500);
    });
});
//jesti jaoks
router.post("/", (req, res) => {
  User.signup(req.body)
  .then( user =>{
    res.status(200).json(user);
  })
  .catch( err =>{
    console.log('err', err);
    res.send(500);
  });
});

module.exports = router;
