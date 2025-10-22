let pilotes = []; 

export function getAllpilotes() {
  return pilotes;
}

export function addpilote(pilote) {
  pilotes.push(pilote);
  return pilote;
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