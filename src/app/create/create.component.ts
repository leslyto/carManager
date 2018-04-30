import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CarService } from '../services/car.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  car_id: number
  form_action: string
  successMessage: boolean

  constructor(private carService: CarService, private route: ActivatedRoute) { }
  public form
  
  ngOnInit() {
    this.successMessage = false

    this.route.params.subscribe(params => {
      this.car_id = +params['id'] // (+) converts string 'id' to a number
      if(this.car_id) {
        this.form_action = "Save"
        let editCar = this.carService.getCarById(this.car_id)
        this.form = new FormGroup({
          brand: new FormControl(editCar.brand,Validators.required),
          model: new FormControl(editCar.model,Validators.required),
          description: new FormControl(editCar.description,Validators.maxLength(200)),
          registrationNumber: new FormControl(editCar.registrationNumber,Validators.required),
          fuelType: new FormControl(editCar.fuelType,Validators.required),
          transmission: new FormControl(editCar.transmission,Validators.required)
        })
      } else {
        this.form_action = "Create"
        this.form = new FormGroup({
          brand: new FormControl('',Validators.required),
          model: new FormControl('',Validators.required),
          description: new FormControl('',Validators.maxLength(200)),
          registrationNumber: new FormControl('',Validators.required),
          fuelType: new FormControl('',Validators.required),
          transmission: new FormControl('',Validators.required)
        })
      }
    })
  }

  onSubmit(car) {
    if(this.car_id){
      car._id = this.car_id
      if(this.carService.editCar(car))
        this.successMessage = true
    } else {
      if(this.carService.createCar(car)) {
        this.form.reset()
        this.successMessage = true
      }
    }
  }

}
