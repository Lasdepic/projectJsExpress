import { getAllpilotes, addpilote, deletepiloteById, editpilotesById, getOneByID, piloteLogin } from "../models/pilote.js";

const pilotes = getAllpilotes();
export function pilotesController(req, res) {
  if (pilotes.length === 0) {
    return res.status(400).json({ message: "Aucun pilote trouvé" });
  }
  return res.status(200).json(pilotes);
}

export function addpiloteController(req, res) {
  const existing = pilotes.find((c) => c.email === req.body.email);
  if (existing) {
    return res.status(400).json({ message: "Le pilote à déjà un compte" });
  }
  const created = addpilote(req.body, res);
  
  if (created) {
    return res.status(200).json({ message: "Pilote ajouté", pilote: created });
  }

  return res.status(500).json({ message: "Erreur lors de l'ajout du pilote" });
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

export function getOneByIdController(req, res) {
  const id = req.params.id;
  const pilote = getOneByID(id);
  if (!pilote) {
    return res.status(404).json({ message: "Pilote non trouvé" });
  }
  return res.status(200).json(pilote);
}

export function piloteLoginController(req, res){
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const pilote = piloteLogin(email, password);
  if (!pilote) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  return res.status(200).json({ message: "Connexion réussie", pilote });
}