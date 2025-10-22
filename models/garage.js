let garage = [];

export function getAllGarage() {
  return garage;
}

export function addCar(cars) {
  garage.push(cars);
  return cars;
}

export function deleteCarById(cars) {
  const indexOf = garage.indexOf(cars);
  garage.splice(indexOf, 1);
}

export function editCarsById(id, newCar) {
  const car = garage.find((c) => c.id == id);
  if (!car){
    return null;
  } 
  car.marque = newCar.marque || car.marque;
  car.modele = newCar.marque|| car.modele;
  return car;
}
