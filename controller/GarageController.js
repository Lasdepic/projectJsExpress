import {
  getAllGarage,
  addCar,
  editCarsById,
  deleteCarById,
} from "../models/garage.js";

export async function GarageController(req, res) {
  try {
    const garage = await getAllGarage();
    return res.status(200).json(garage);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

export async function addCarController(req, res) {
  try {
    const payload = req.body || {};
    const garage = await getAllGarage();
    const exists = (garage || []).some(
      (c) => c.marque === payload.marque && c.modele === payload.modele
    );
    if (exists) {
      return res.status(400).json({ message: "La voiture existe déjà" });
    }
    const created = await addCar(payload);
    return res.status(200).json(created);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

export async function deleteCarsController(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteCarById(id);
    if (!deleted) {
      return res.status(400).json({ message: "La voiture n'existe pas" });
    }
    return res.status(200).json({ message: "Voiture supprimée", deleted });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

export async function editCarsController(req, res) {
  try {
    const id = req.params.id || req.body.id;
    if (!id) {
      return res.status(400).json({ message: "Identifiant manquant" });
    }
    const updated = await editCarsById(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "La voiture n'existe pas" });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

