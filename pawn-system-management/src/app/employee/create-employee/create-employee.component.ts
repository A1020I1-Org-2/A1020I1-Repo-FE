import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {EmployeepRoutingModule} from "../employee-routing.module";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createForm!: FormGroup;
  isSubmit: boolean = false;

  constructor(private service:EmployeeService,
              public router: Router,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("Tạo mới nhân viên");
    this.createForm = new FormGroup({
      employeeId: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl('true', [Validators.required]),
      idCard: new FormControl('', [Validators.required]),
      img: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    })
  }

  submit() {
    console.log(this.createForm);
    // this.service.create(this.createForm.value).subscribe(data =>{
    //   this.router.navigate(['employee'])
    // })
    if (this.createForm.valid) {
      this.isSubmit = false;
      this.service.create(this.createForm.value).subscribe(res => {
        this.router.navigateByUrl("/employee").then();
      })

    }else{
      this.isSubmit = true;
    }
  }

  get form(){
    return this.createForm.controls;
  }
}
