import express from "express";
import { addCarController, deleteCarsController, editCarsController, GarageController } from "./controller/GarageController.js";
import { addpiloteController, deletepilotesController, editpilotesController, pilotesController } from "./controller/PiloteController.js";
import { deletepiloteById } from "./models/pilote.js";

const app = express();
const port = 3000;
app.use(express.json());

// Méthode GET
app.get("/cars", GarageController);
app.get("/pilote", pilotesController);

// Méthode POST
app.post('/cars', addCarController);
app.post('/pilote', addpiloteController);

// Méthode DELETE
app.delete("/cars/:id", deleteCarsController);
app.delete("/pilote/:id", deletepilotesController);
// Méthode PUT
app.put("/cars", editCarsController);
app.put("/pilote", editpilotesController);


app.listen(port, () => console.log("Start du serveur " + port));
