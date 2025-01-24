import express from "express";
import { signup, login, logout } from "../Controllers/auth.controller.js";
import cors from "cors";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);

export default Router;

