const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database")
const mongoose = require("mongoose");
require('dotenv').config();

var kittySchema = new mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var Kitten1 = new Kitten({ name: 'Noise' })

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-r8uc0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Access successful!");
        Kitten1.save(err =>{
          if(err){
          console.error("error occured");
        }
          else{
            console.log("succesfully saved");
          }
        })
    })
    .catch(err => {
        console.error("DB Access error: ", err);
    });


//GET all items
app.get("/api/items", (req, res)=>{
  res.json(DB.getItems());
});

//GET item with id

app.get("/api/items/:itemId", (req,res)=>{
  res.send(DB.getItem(req.params.itemId));
});

// brauseri default on get
 app.post("/hello", (req, res)=>{
   res.send("post hello");
});


app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get(`/items/*`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

//Cuz Heroku needs process.env.PORT
app.listen(PORT, () => {
  console.log("Server started", PORT);
  console.log(`http://localhost:${PORT}`);
});