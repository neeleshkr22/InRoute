import mongoose from "mongoose";
require("dotenv").config();


const db = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
};

module.exports = db;
