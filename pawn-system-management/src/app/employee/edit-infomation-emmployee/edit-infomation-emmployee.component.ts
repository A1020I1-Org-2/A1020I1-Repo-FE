import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IEmployee} from "../IEmployee";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-infomation-emmployee',
  templateUrl: './edit-infomation-emmployee.component.html',
  styleUrls: ['./edit-infomation-emmployee.component.css']
})
export class EditInfomationEmmployeeComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    employeeId: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    gender: new FormControl('false', [Validators.required]),
    idCard: new FormControl('', [Validators.required]),
    img: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required])
  });
  isSubmit: boolean = false;
  employee!: IEmployee;
  empId!: string;

  constructor(private service: EmployeeService, public router: ActivatedRoute, public route: Router) { }

  ngOnInit(): void {
    this.empId = this.router.snapshot.params['id'];
    this.service.finById(this.empId).subscribe(data =>{
      this.editForm.controls.employeeId.setValue(data.employeeId);
      this.editForm.controls.address.setValue(data.address);
      this.editForm.controls.dateOfBirth.setValue(data.dateOfBirth.toString().substr(0, 10));
      this.editForm.controls.email.setValue(data.email);
      this.editForm.controls.fullName.setValue(data.fullName);
      this.editForm.controls.gender.setValue(data.gender ? 'true': 'false');
      this.editForm.controls.idCard.setValue(data.idCard);
      this.editForm.controls.img.setValue(data.img);
      this.editForm.controls.phone.setValue(data.phone);
      this.editForm.controls.salary.setValue(data.salary);
    });


  }

  update() {
    if(this.editForm.valid){
      this.isSubmit = false;
      this.service.update({
        employeeId: this.editForm.controls.employeeId.value,
        address: this.editForm.controls.address.value,
        dateOfBirth: new Date(this.editForm.controls.dateOfBirth.value),
        email: this.editForm.controls.email.value,
        fullName: this.editForm.controls.fullName.value,
        gender: this.editForm.controls.gender.value === 'true',
        idCard: this.editForm.controls.idCard.value,
        img: this.editForm.controls.img.value,
        phone: this.editForm.controls.phone.value,
        salary: this.editForm.controls.salary.value
      }).subscribe(data =>{
        this.service.isUpdate = 'true';
        this.route.navigateByUrl("/employee").then();
      })
    }else{
      this.isSubmit = true;
    }
  }

  get form(){
    return this.editForm.controls;
  }
}
