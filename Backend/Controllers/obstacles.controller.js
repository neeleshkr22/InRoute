import fs from "fs";
import path from "path";
import * as turf from "@turf/turf";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const obstaclesFilePath = path.join(__dirname, "../public/obstacles.geojson");

// Initialize obstacles.geojson if it doesn't exist
if (!fs.existsSync(obstaclesFilePath)) {
    const initialData = {
        type: "FeatureCollection",
        features: []
    };
    fs.writeFileSync(obstaclesFilePath, JSON.stringify(initialData, null, 2));
}

export const readObstacles = () => {
    const data = fs.readFileSync(obstaclesFilePath);
    return JSON.parse(data);
};

export const writeObstacles = (obstacles) => {
    fs.writeFileSync(obstaclesFilePath, JSON.stringify(obstacles, null, 2));
};

export const getObstacles = (req, res) => {
    try {
        const obstacles = readObstacles();
        res.json(obstacles);
    } catch (err) {
        res.status(500).json({ error: "Error fetching obstacles" });
    }
};

export const addObstacle = (req, res) => {
    const { coordinates, description } = req.body;

    if (!coordinates || !description) {
        return res.status(400).json({ error: "Coordinates and description are required." });
    }

    try {
        const obstacles = readObstacles();
        const newObstacle = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates,
            },
            properties: {
                description,
                timestamp: new Date().toISOString(),
                verified: false,
                severity: Math.floor(Math.random() * 3) + 1 // 1-3 severity rating
            },
        };

        obstacles.features.push(newObstacle);
        writeObstacles(obstacles);

        res.status(201).json(newObstacle);
    } catch (err) {
        res.status(500).json({ error: "Error adding obstacle" });
    }
};

export const generateObstacles = (req, res) => {
    const { start, end, count = 5 } = req.body;

    if (!start || !end) {
        return res.status(400).json({ error: "Start and end coordinates are required." });
    }

    try {
        const obstacles = readObstacles();
        const line = turf.lineString([start, end]);
        const buffer = turf.buffer(line, 0.1, { units: 'kilometers' });
        const bbox = turf.bbox(buffer);

        const obstacleTypes = [
            "Construction work",
            "Uneven pavement",
            "Steep slope",
            "Narrow passage",
            "Missing ramp"
        ];

        for (let i = 0; i < count; i++) {
            let point;
            let isValidPoint = false;

            while (!isValidPoint) {
                point = turf.randomPosition(bbox);
                const pt = turf.point(point);
                isValidPoint = turf.booleanPointInPolygon(pt, buffer);
            }

            const newObstacle = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: point,
                },
                properties: {
                    description: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
                    severity: Math.floor(Math.random() * 3) + 1,
                    timestamp: new Date().toISOString(),
                    generated: true
                },
            };

            obstacles.features.push(newObstacle);
        }

        writeObstacles(obstacles);
        res.status(201).json(obstacles);
    } catch (err) {
        res.status(500).json({ error: "Error generating obstacles" });
    }
};