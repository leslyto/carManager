import { Injectable } from '@angular/core'
import { Car } from '../car/car'

@Injectable()
export class CarService {
  
  private cars: Array<Car>
  private nextId: number
  
  constructor() {
    // For presentation purposes 12 dummy cars are added on the first launch of the app
    this.checkIfCarsExist()
  }

  public getCars(): Car[] {
    this.cars = JSON.parse(localStorage.getItem('cars'))
    return this.cars
  }

  public getCarById(_id: number) {
    return this.cars.find(function(element) {
      return _id === element._id
    })
  }

  public createCar(newCar) {
    let car = new Car()
    car._id = this.getNextId()
    car.brand = newCar.brand
    car.model = newCar.model
    car.description = newCar.description
    car.registrationNumber = newCar.registrationNumber
    car.fuelType = newCar.fuelType
    car.transmission = newCar.transmission
    
    this.cars.push(car)
    return this.updateLocalStorage(this.cars,car._id)
  }

  public editCar(car: Car) {
    for(let i=0; i < this.cars.length; i++){
      if(this.cars[i]["_id"] == car._id){
        this.cars[i] = car
      }
    }
    return this.updateLocalStorage(this.cars)
  }

  public removeCar(chosenCar: Car): void {
    this.cars = this.cars.filter((car) => car._id != chosenCar._id)
    this.updateLocalStorage(this.cars)
  }

  public paginateCars (page_size: number, page_number: number) {
    --page_number // because pages logically start with 1, but technically with 0
    return this.cars.slice(page_number * page_size, (page_number + 1) * page_size)
  }

  //setting default parameter carId to be undefined in cases where we don't need to increment carId (e.g. edit or delete car)
  private updateLocalStorage(cars,carId = undefined) {
    localStorage.setItem('cars',JSON.stringify(cars))
    if(carId !== undefined) 
      localStorage.setItem('carId',JSON.stringify(carId))
    return true
  }
  
  private checkIfCarsExist() {
    try {
      this.cars = this.getCars()
      if(typeof this.cars === 'undefined' || this.cars === null)
        throw 'No cars'

      let currentid = Number(localStorage.getItem('carId'))
      if(isNaN(currentid))
        throw 'Invalid Id'

    } catch(e) {
        console.log("Adding dummy cars")
        // Set dummy cars 
        this.cars = [
          { '_id': 1, 'brand': 'Audi', 'model': 'A4', 'registrationNumber': 'PB4333XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 2, 'brand': 'Audi', 'model': 'A4', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 3, 'brand': 'Audi', 'model': 'A5', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 4, 'brand': 'Audi', 'model': 'A6', 'description': 'black','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 5, 'brand': 'Audi', 'model': 'A7', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 6, 'brand': 'Audi', 'model': 'A8', 'description': 'red','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 7, 'brand': 'Audi', 'model': 'A5', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 8, 'brand': 'Audi', 'model': 'A1', 'description': 'purple','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 9, 'brand': 'Audi', 'model': 'A2', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 10, 'brand': 'Audi', 'model': 'A3', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 11, 'brand': 'Audi', 'model': 'A4', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
          { '_id': 12, 'brand': 'Audi', 'model': 'A5', 'description': 'darkBlue','registrationNumber': 'PB4123XK', 'fuelType': 'Petrol', 'transmission': 'Manual' },
        ]
        this.updateLocalStorage(this.cars,13)
    }
  }
    
  private getNextId() {
    let currentid = Number(localStorage.getItem('carId'))
    let nextid = currentid + 1
    return nextid
  }
}
