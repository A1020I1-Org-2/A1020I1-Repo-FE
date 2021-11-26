import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IEmployee} from "../IEmployee";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {numbers} from "@material/dialog";

@Component({
  selector: 'app-edit-infomation-emmployee',
  templateUrl: './edit-infomation-emmployee.component.html',
  styleUrls: ['./edit-infomation-emmployee.component.css']
})
export class EditInfomationEmmployeeComponent implements OnInit {
  editForm!: FormGroup;

  employee!: IEmployee;
  empId!: string;

  constructor(private service: EmployeeService, public router: ActivatedRoute, public route: Router) { }

  ngOnInit(): void {
    this.empId = this.router.snapshot.params['id'];
    this.service.finById(this.empId).subscribe(data =>{
      console.log(data);
      this.editForm.patchValue({
        employeeId: data.employeeId,
        address: data.address,
        dOB: data.dOB,
        email: data.email,
        fullName: data.fullName,
        gender: data.gender,
        idCard: data.idCard,
        img: data.img,
        phone: data.phone,
        salary: data.salary
      })
    })

    this.editForm = new FormGroup({
      employeeId: new FormControl(),
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

  update() {
    console.log(this.editForm.value);
    this.service.update(this.editForm.value, this.empId).subscribe(data =>{
      this.route.navigate(['employee'])
    })
  }
}
