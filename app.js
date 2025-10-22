import express from "express";
import carsRouter from "./routes/cars/cars.js";
import piloteRouter from "./routes/pilote/pilote.js";

const app = express();
const port = 3000;
app.use(express.json());

// route des api
app.use("/api", carsRouter);
app.use("/api", piloteRouter);

app.listen(port, () => console.log("Start du serveur " + port));
