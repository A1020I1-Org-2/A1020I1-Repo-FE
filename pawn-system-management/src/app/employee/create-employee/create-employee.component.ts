import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {EmployeepRoutingModule} from "../employee-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createForm!: FormGroup;

  constructor(private service:EmployeeService, public router: Router) {
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      employeeId: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dOB: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      idCard: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    })
  }

  submit() {
    console.log(this.createForm.value);
    this.service.create(this.createForm.value).subscribe(data =>{
      this.router.navigate(['employee'])
    })
    // if (this.createForm.valid) {
    //   this.service.create(this.createForm.value).subscribe(res => {
    //     // this.router.navigate(['customer/create'])
    //     // this.createSuccess = true;
    //     // this.fadeOutLink();
    //     console.log(res);
    //   })
    //   alert('Registered successfully!');
    //   console.log(this.createForm.value);
    // }
  }
}
