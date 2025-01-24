import db from "./Database/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Router from "./Routers/auth.route.js";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(Router);


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    db();
})