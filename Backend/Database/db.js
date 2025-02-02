import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const db = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};

export default db;
