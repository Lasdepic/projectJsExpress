import mongoose from "../config/database.js";
import bcrypt from "bcrypt";
const piloteSchema = new mongoose.Schema({
  name: {type: String},
  firstName: {type: String},
  email: {type: String},
  password: {type: String}
});

const SALT_ROUNDS = 10;
const Pilote = mongoose.model("Pilote", piloteSchema);

export async function getAllpilotes() {
  return await Pilote.find();
}

export async function addpilote(newPilote) {
 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!newPilote.email || !newPilote.password) {
    return res.status(400).json({message :"Mail et mot de passe requis"});
  }

  if (!emailRegex.test(newPilote.email)) {
    return res.status(400).json({message :"Mail invalide"});
  }

  if (!passwordRegex.test(newPilote.password)) {
    return res.status(400).json({message :"Mot de passe invalide"});
  }

  const hashedPassword = await bcrypt.hash(newPilote.password, SALT_ROUNDS);
  newPilote.password = hashedPassword;

  const pilote = new Pilote(newPilote);
  return await pilote.save();
}

export async function deletepiloteById(id) {
  // Méthode mongoose pour supprimer
  const result = await Pilote.findOneAndDelete(id);
  if (!result){
    return false;
  }
  return true;
}

export async function editpilotesById(id, newpilote) {
  const pilote = await Pilote.findById(id);
  if (!pilote) {
    return null;
  }
  pilote.name = newpilote.name || pilote.name;
  pilote.firstName = newpilote.firstName || pilote.firstName;
  return await pilote.save();
}

export async function getOneByID(id) {
  const pilote = await Pilote.findById(id);
  return pilote || null;
}

export async function piloteLogin(email, password) {
  // vérif des paramètres, email et password
  if (!email || !password) {
    return null;
  }

  // on récupére le mail 
  const pilote = await Pilote.findOne({ email: email });
  if (!pilote) return null;

  // compare le mp avec le hash
  const match = await bcrypt.compare(password, pilote.password);
  if (match) {
    return pilote;
  }
  return null;
}
