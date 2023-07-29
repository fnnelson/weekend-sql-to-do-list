// Setup Express
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static files
app.use(express.static("server/public"));

// Listen to PORT
app.listen(PORT, () => {
  console.log("🙉 on PORT", PORT);
});