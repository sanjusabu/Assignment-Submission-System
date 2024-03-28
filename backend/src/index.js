const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

require("dotenv").config()
const routes = require("./routes")

const db = require("./config/database")

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  
    next();
  }); //cors error
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
