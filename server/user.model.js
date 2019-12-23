const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Item = require("./item.model");
const Payment = require("./payments.model");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cart: {
    type: [String],
    default: []
  }
});

// Checks if user exists
userSchema.statics.login = function({ email, password }) {
  return new Promise((resolve, reject) => {
    this.findOne(
      {
        email
      },
      (err, userDoc) => {
        if (err) return reject(err);
        if (userDoc === null) return reject("User not found!");
        bcrypt.compare(password, userDoc.hash, function(err, result) {
          if (err) return reject(err);
          if (!result) return reject("Invalid password");
          resolve({
            email: userDoc.email,
            createdAt: userDoc.createdAt,
            _id: userDoc._id,
            cart: userDoc.cart
          });
        });
      }
    );
  });
};

// Creates a new user
userSchema.statics.signup = function({ email, password }) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) return reject(err);
      const user = new User({
        email,
        hash
      });
      user.save(err => {
        if (err) return reject(err);
        resolve({
          email: user.email,
          createdAt: user.createdAt,
          _id: user._id
        });
      });
    });
  });
};

userSchema.methods.getCartAmount = async function() {
  const items = await Item.getItems(this.cart);
  console.log("items", items);
  const amount = items.reduce((acc, item) => acc + item.price, 0);
  return { error: null, amount };
};

userSchema.methods.createPayment = function(amount) {
  const payment = new Payment({
    amount,
    userId: this._id,
    cart: this.cart
  });

  return new Promise((resolve, reject) => {
    payment.save(err => {
      if (err) {
        console.log("user.model: payment error", err);
        return reject("Payment creation failed.");
      }
      resolve("Payment successfully created");
    });
  });
};

userSchema.methods.clearCart = function() {
  return new Promise((resolve, reject) => {
    this.cart = [];
    this.save(err => {
      if (err) {
        console.log("err", err);
        return reject("Cart clearing failed.");
      }
      return resolve("Cart successfully cleared.");
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
