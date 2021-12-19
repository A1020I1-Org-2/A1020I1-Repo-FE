import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {EmployeeService} from "../../services/employee.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Customer} from "../../interface/customer";
import {Employee} from "../../interface/employee";
import {AlertService} from "../../services/alert.service";
import {LoginService} from "../../services/login.service";

function checkDate(control: AbstractControl): ValidationErrors | null {
  let now = new Date();
  let dateOfBirth = new Date(control.value);
  let between = (now.getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365);
  return between < 18 ? {checkDate: true} : null;
}

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  formEdit: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required, checkDate]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    idCard: new FormControl('',
      [Validators.required, Validators.pattern('^(\\d{9}|\\d{11})$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(\\d{10,12})$')])
  });
  employeeCurrent!: Employee;
  constructor(private title: Title,
              private employeeService: EmployeeService,
              private alert: AlertService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.title.setTitle("Thông tin cá nhân");
    if(this.loginService.getUserName() !== ''){
      this.employeeService.findByAccount(this.loginService.getUserName()).subscribe(employee => {
        this.employeeCurrent = employee;
        this.formEdit.patchValue({
          username: employee.account.userName,
          fullName: employee.fullName,
          gender: employee.gender ? 'true': 'false',
          dateOfBirth: formatDate(employee.dateOfBirth, 'yyyy-MM-dd', 'en-US'),
          email: employee.email,
          address: employee.address,
          idCard: employee.idCard,
          phoneNumber: employee.phone,
        })
      })
    }
  }

  cancelEdit() {
    this.ngOnInit()
  }

  onSubmit() {
    if(this.formEdit.valid){
      this.employeeService.update({
        employeeId: this.employeeCurrent.employeeId,
        address: this.form.address.value,
        dateOfBirth: this.form.dateOfBirth.value,
        email: this.form.email.value,
        fullName: this.form.fullName.value,
        gender: this.form.gender.value == "true",
        idCard: this.form.idCard.value,
        img: this.employeeCurrent.img,
        phone: this.form.phoneNumber.value,
        salary: this.employeeCurrent.salary
      }).subscribe(result => {
        this.alert.showAlertSuccess("Cập nhập thành công");
        this.ngOnInit();
      }, error => {
        this.alert.showMessageErrors('Cập nhập thất bại')
      })
    }
  }

  get form(){
    return this.formEdit.controls;
  }
}
