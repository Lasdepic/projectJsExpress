import express from "express";
import mongoose from "mongoose";
import carsRouter from "./routes/cars/cars.js";
import piloteRouter from "./routes/pilote/pilote.js";
import { connectDB } from "./config/database.js";

connectDB();
const app = express();
const port = 3000;
app.use(express.json());

app.use("/api", carsRouter);
app.use("/api", piloteRouter);

app.listen(port, () => console.log("Start du serveur " + port));




