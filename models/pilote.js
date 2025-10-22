let pilotes = [
  {
    id: 1,
    nom: "Clement",
    prenom: "Jordan",
    email: "clementjordan34@gmail.com",
    password: "Lasdepic.34",
  },
  {
    id: 2,
    nom: "Fournier",
    prenom: "Brian",
    email: "brianfournier@gmail.com",
    password: "Briandu34!",
  },
];

export function getAllpilotes() {
  return pilotes;
}

export function addpilote(pilote, res) {
  const newPilote = {
    id: pilotes.length + 1,
    nom: pilote.nom,
    prenom: pilote.prenom,
    email: pilote.email,
    password: pilote.password,
  };

  // regex pour l'email et le password
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

  // pour ajouter un pilote besoin d'un mail et un password
  if (!newPilote.email || !newPilote.password) {
    return res.status(400).json({ message: "Une erreur dans le password" });
  }

  // On vérifie le mail si il correspond au regex
  if (!emailRegex.test(newPilote.email)) {
    return res.status(400).json({ message: "Une erreur dans l'email " });
  }

  // On vérifie le password si il correspond au regex
  if (!passwordRegex.test(newPilote.password)) {
    return null;
  }

  pilotes.push(newPilote);
  return newPilote;
}

export function deletepiloteById(piloteToDelete) {
  const index = pilotes.indexOf(piloteToDelete);
  if (index !== -1) {
    pilotes.splice(index, 1);
    return true;
  }
  return false;
}

export function editpilotesById(id, newpilote) {
  const pilote = pilotes.find((c) => c.id == id);
  if (!pilote) {
    return null;
  }
  pilote.nom = newpilote.nom || pilote.nom;
  pilote.prenom = newpilote.prenom || pilote.prenom;
  return pilote;
}

export function getOneByID(id) {
  const pilote = pilotes.find((c) => c.id == id);
  return pilote || null;
}

export function piloteLogin(email, password) {
  // vérif des paramètres, email et password
  if (!email || !password) {
    return null;
  }

  // recherche du pilote avec un email et un password
  const pilote = pilotes.find(
    (p) => p.email === email && p.password === password
  );
  return pilote || null;
}
