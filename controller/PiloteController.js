import { getAllpilotes, addpilote, deletepiloteById, editpilotesById } from "../models/pilote.js";

const pilotes = getAllpilotes();
export function pilotesController(req, res) {
  if (pilotes.length === 0) {
    return res.status(400).json({ message: "Aucun pilote trouvé" });
  }
  return res.status(200).json(pilotes);
}

export function addpiloteController(req, res) {
  const existing = pilotes.find((c) => c.id == req.body.id);
  if (existing) {
    return res.status(400).json({ message: "Le pilote existe déjà" });
  }
  addpilote(req.body);
  return res.status(200).json({ message: "pilote ajoutée au pilotes" });
}

export function deletepilotesController(req, res) {
  const existing = pilotes.find((c) => c.id == req.params.id);
  if (!existing) {
    return res.status(400).json({ message: "Le pilote n'existe pas" });
  }
  deletepiloteById(existing);
  return res.status(200).json({ message: "pilote supprimée" });
}

export function editpilotesController(req, res) {
  const id = req.body.id;
  const pilote = editpilotesById(id, req.body);
  if (!pilote) {
    return res.status(400).json({ message: "Le pilote n'existe pas" });
  }
  return res.status(200).json({message : "Pilote modifié"});
}