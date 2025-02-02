import express from "express";
import { getObstacles, addObstacle, generateObstacles } from "../Controllers/obstacles.controller.js";

const obstaclesRouter = express.Router();

// GET /api/obstacles - Get all obstacles
obstaclesRouter.get("/", getObstacles);

// POST /api/obstacles - Add a new obstacle
obstaclesRouter.post("/", addObstacle);

// POST /api/obstacles/generate - Generate random obstacles
obstaclesRouter.post("/generate", generateObstacles);

export default obstaclesRouter;