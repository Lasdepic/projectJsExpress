import express from "express";
const router = express.Router();

import { addCarController, deleteCarsController, editCarsController, GarageController } from "../../controller/GarageController.js";

router.get("/cars", GarageController);
router.post("/cars", addCarController);
router.delete("/cars/:id", deleteCarsController);
router.put("/cars", editCarsController);

export default router;