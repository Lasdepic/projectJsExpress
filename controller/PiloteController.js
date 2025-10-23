import { getAllpilotes, addpilote, deletepiloteById, editpilotesById, getOneByID, piloteLogin } from "../models/pilote.js";

export async function pilotesController(req, res) {
  try {
    const pilotes = await getAllpilotes();
    if (!pilotes || pilotes.length === 0) {
      return res.status(400).json({ message: "Aucun pilote trouvé" });
    }
    return res.status(200).json(pilotes);
  } catch (err) {
    return res.status(400).json({ message: err.message || "Erreur lors de la récupération des pilotes" });
  }
}

export async function addpiloteController(req, res) {
  try {
    const pilotes = await getAllpilotes();
    const existing = (pilotes || []).find((c) => c.email === req.body.email);
    if (existing) {
      return res.status(400).json({ message: "Le pilote à déjà un compte" });
    }
    const created = await addpilote(req.body);
    return res.status(200).json({ message: "Pilote ajouté", pilote: created });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Erreur lors de l'ajout du pilote" });
  }
}

export async function deletepilotesController(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deletepiloteById(id);
    if (!deleted) {
      return res.status(400).json({ message: "Le pilote n'existe pas" });
    }
    return res.status(200).json({ message: "pilote supprimée" });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Erreur lors de la suppression du pilote" });
  }
}

export async function editpilotesController(req, res) {
  try {
    const id = req.body.id;
    const pilote = await editpilotesById(id, req.body);
    if (!pilote) {
      return res.status(400).json({ message: "Le pilote n'existe pas" });
    }
    return res.status(200).json({ message: "Pilote modifié" });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Erreur lors de la modification du pilote" });
  }
}

export async function getOneByIdController(req, res) {
  try {
    const id = req.params.id;
    const pilote = await getOneByID(id);
    if (!pilote) {
      return res.status(404).json({ message: "Pilote non trouvé" });
    }
    return res.status(200).json(pilote);
  } catch (err) {
    return res.status(400).json({ message: err.message || "Erreur lors de la recherche du pilote" });
  }
}

export async function piloteLoginController(req, res){
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const pilote = await piloteLogin(email, password);
    if (!pilote) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    return res.status(200).json({ message: "Connexion réussie", pilote });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Erreur lors de la connexion" });
  }
}