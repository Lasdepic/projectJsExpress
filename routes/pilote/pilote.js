import { Router } from "express";
import { addpiloteController, deletepilotesController, editpilotesController, piloteLoginController, pilotesController, getOneByIdController } from "../../controller/PiloteController.js";

const router = Router();

// Méthode GET
router.get("/pilote", pilotesController);
router.get("/pilote/:id", getOneByIdController);

// Méthode POST
router.post('/pilote', addpiloteController);
router.post('/pilote/login', piloteLoginController);

// Méthode DELETE
router.delete("/pilote/:id", deletepilotesController);

// Méthode PUT
router.put("/pilote", editpilotesController);

export default router;
