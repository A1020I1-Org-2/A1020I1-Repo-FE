import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';
import { FileUpload } from 'src/app/interface/FileUpload';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  formAddNewCustomer!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    private snackBar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.formAddNewCustomer = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^(KH-)[\\d]{4}$')]],
      name: ['', [Validators.required,]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      img: ['', [Validators.required]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
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
    let tempCus: Customer = this.formAddNewCustomer.value;
    tempCus.gender = this.formAddNewCustomer.controls.gender.value == "true" ? true : false;
    console.log(tempCus)
    this.customerService.create(tempCus).subscribe(data => {
      this.snackBar.open('Create New Customer Successfully !!!', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl('/');
    })
  }

}
