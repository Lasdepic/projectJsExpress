import express from "express";
import { addCarController, deleteCarsController, editCarsController, GarageController } from "./controller/GarageController.js";

const app = express();
const port = 3000;
app.use(express.json());

// Méthode GET
app.get("/cars", GarageController);

// Méthode POST
app.post('/cars', addCarController);

// Méthode DELETE
app.delete("/cars/:id", deleteCarsController);
// Méthode PUT
app.put("/cars", editCarsController);

app.listen(port, () => console.log("Start du serveur " + port));
