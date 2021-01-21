if (!process.env.PRODUCTION) {
  require("dotenv").config();
}
const home_dir = __dirname;
const ExpressLoader = require("./server/loaders/Express");
let express = new ExpressLoader(home_dir);
