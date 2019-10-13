const homepage = require("./homepage.js");
const itempage = require("./itempage.js");

//console.log("index for webpack");

window.addEventListener("load", () => {
    homepage.setup();
    itempage.setup();
   });