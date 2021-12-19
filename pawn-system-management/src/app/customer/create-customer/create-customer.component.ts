import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';
import { FileUpload } from 'src/app/interface/FileUpload';
import { CustomerService } from 'src/app/services/customer.service';
import {AlertService} from "../../services/alert.service";


interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}

function checkExistId(customers: Customer[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    for (let i = 0; i < customers.length; i++) {
      if (control.value === customers[i].customerId) {
        return { checkExistId: true }
      }
    }
    return null;
  };
}

function checkExistIdCard(customers: Customer[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    for (let i = 0; i < customers.length; i++) {
      if (control.value === customers[i].idCard) {
        return { checkExistIdCard: true }
      }
    }
    return null;
  };
}

function checkAge(control: AbstractControl): ValidationErrors | null {
  const now = new Date();
  const birthday = new Date(control.value);
  let between = now.getTime() - birthday.getTime();
  let age = (between / (1000 * 60 * 60 * 24)) / 365;
  return age > 18 ? null : { checkAge: true };
}

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  formAddNewCustomer!: FormGroup;
  checkUpload: any = false;
  isExsitId: boolean = false;
  customers: Customer[] = [];
  loading: boolean = true
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    public router: Router,
    public alertService: AlertService,
    public dialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer[]
  ) { }

  ngOnInit(): void {
    this.customers = this.customerService.customers;
    this.formAddNewCustomer = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^(KH-)[\\d]{4}$'), checkExistId(this.data)]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$')]],
      dateOfBirth: ['', [Validators.required, checkAge]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^(\\d{10,12})$')]],
      gender: ['true', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('^(\\d{9}|\\d{11})$'), checkExistIdCard(this.data)]],
      img: ['', []]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
    this.checkUpload = true;
  }

  onLoad() {
    this.loading = false;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        let temp = new FileUpload(file);

        this.customerService.pushFileToStorage(this.currentFileUpload).subscribe(
          url => {
            this.formAddNewCustomer.controls.img.setValue(url);
          },
          error => {
            this.customerService.pushFileToStorage(temp).subscribe(
              url => {
                this.formAddNewCustomer.controls.img.setValue(url);
              },
              error => {
                console.log('error');
              }
            );
          }
        );
      }
    }
  }

  createCustomer() {
    this.customerService.create({
      customerId: this.formAddNewCustomer.controls.customerId.value,
      name: this.formAddNewCustomer.controls.name.value,
      dateOfBirth: this.formAddNewCustomer.controls.dateOfBirth.value,
      email: this.formAddNewCustomer.controls.email.value,
      address: this.formAddNewCustomer.controls.address.value,
      phone: this.formAddNewCustomer.controls.phone.value,
      gender: this.formAddNewCustomer.controls.gender.value == "true",
      idCard: this.formAddNewCustomer.controls.idCard.value,
      img: this.formAddNewCustomer.controls.img.value,
    }).subscribe(data => {
      this.dialogRef.close();
      this.alertService.showAlertSuccess("Tạo mới khách hàng thành công")
    },
      error => {
        this.alertService.showMessageErrors("Tạo mới khách hàng thất bại")
      }
    )
  }
}
