import { Component } from '@angular/core'
import { CarService } from '../services/car.service'
import { Car } from '../car/car'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  carsOnPage: Array<Car>
  pageSize: number // show how many cars are displayed on page
  maxSize: number // max size of pagination buttons to be displayed
  page: number // page of pagination

  modalDataCar: Car

  constructor(private carService: CarService, private modalService: NgbModal) {
    this.page = 1 
    this.pageSize = 9 
    this.maxSize = 6 
    this.carsOnPage = this.getCarsForPage(this.page)
  }
  
  getCarsForPage(page) {
    return this.carsOnPage = this.carService.paginateCars(this.pageSize,page)
  }

  removeCar(car){
    this.carService.removeCar(car)
    this.getCarsForPage(this.page)
  }

  openModalConfirmation(content,car) {
    this.modalDataCar = car
    this.modalService.open(content)
  }

  getCarsLength() {
    return this.carService.getCars().length
  }

}

