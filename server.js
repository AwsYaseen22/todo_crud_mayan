const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to DB")
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
