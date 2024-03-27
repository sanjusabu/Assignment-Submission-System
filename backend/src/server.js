const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require("dotenv").config()
// const routes = require("./routes")
const db = require("./config/database")

app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use(bodyParser.json());
// app.use("/api", routes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

db.execute('SELECT 1')
  .then(([rows, fields]) => {
    console.log('Database connection successful');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });