import mongoose from "../config/database.js";

const carSchema = new mongoose.Schema({
  marque: { type: String },
  modele: { type: String },
  chevaux: { type: Number }
});

const Garage = mongoose.model("Garage", carSchema);

export async function getAllGarage() {

  return await Garage.find();
}

export async function addCar(car) {
  return await Garage.create(car);
}

export async function deleteCarById(id) {

  return await Garage.findByIdAndDelete(id);
}

export async function editCarsById(id, newCar) {
  const car = await Garage.findById(id);
  if (!car) {
    return null;
  }
  car.marque = newCar.marque || car.marque;
  car.modele = newCar.modele || car.modele;
  
  return await car.save();
}
