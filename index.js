const express = require("express");
const dotEnv = require("dotenv");
var mongoose = require("mongoose");
const app = express();
dotEnv.config();

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("mongo connected");
  } catch (error) {
    throw error;
  }
};

app.listen(3000, () => {
  console.log(" yeah server connect");
  mongoConnection();
});
