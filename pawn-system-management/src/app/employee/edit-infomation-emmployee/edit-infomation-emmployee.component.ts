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
  editForm!: FormGroup;
  isSubmit: boolean = false;
  employee!: IEmployee;
  empId!: string;

  constructor(private service: EmployeeService, public router: ActivatedRoute, public route: Router) { }

  ngOnInit(): void {
    this.empId = this.router.snapshot.params['id'];
    this.service.finById(this.empId).subscribe(data =>{
      console.log(data);
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
    })

    this.editForm = new FormGroup({
      employeeId: new FormControl(),
      address: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      idCard: new FormControl('', [Validators.required]),
      img: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    })
  }

  update() {
    console.log(this.editForm.value);
    this.service.update(this.editForm.value, this.empId).subscribe(data =>{
      this.route.navigateByUrl("/employee").then();
    })
  }

  get form(){
    return this.editForm.controls;
  }
}
