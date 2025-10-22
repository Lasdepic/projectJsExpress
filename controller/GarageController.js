import {
  getAllGarage,
  addCar,
  editCarsById,
  deleteCarById,
} from "../models/garage.js";
const garage = getAllGarage();

export function GarageController(req, res) {
  if (garage.length === 0) {
    return res.status(400).json({ message: "Aucune voiture trouvée" });
  }
  return res.status(200).json(garage);
}

export function addCarController(req, res) {
  const cars = garage.find((c) => c.id == req.body.id);
  if (cars) {
    return res.status(400).json({ message: "La voiture existe déjà" });
  }
  addCar(req.body);
  return res.status(200).json({ message: "Voiture ajoutée au garage" });
}

export function deleteCarsController(req, res) {
  const cars = garage.find((c) => c.id == req.params.id);
  if (!cars) {
    return res.status(400).json({ message: "La voiture n'existe pas" });
  }
  deleteCarById(cars);
  return res.status(200).json({ message: "Voiture supprimée" });
}

export function editCarsController(req, res) {
  const id = req.body.id;
  const car = editCarsById(id, req.body);
  if (!car) {
    return res.status(400).json({ message: "La voiture n'existe pas" });
  }
  return res.status(200).json({ message: "Voiture modifiée " });
}

