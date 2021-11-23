import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ValidateCustomer } from './customer-validate';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customers: Customer[] = [];
  formEditCustomer!: FormGroup;
  idCustomerEdit: any;
  customerCurrent!: Customer;
  emptyObject = this.customerCurrent == null ? true : false;
  customerValidate: ValidateCustomer = new ValidateCustomer(true, "", "", "", "", "", "", "")
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getListCustomer().subscribe(data => {
      console.log(data)
      this.customers = data;
    })
  }

  openDialogCreate() {
    let dialogRef = this.dialog.open(CreateCustomerComponent, {
      height: '680px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCustomer();
    });
  }

  edit(customer: Customer) {
    this.customerCurrent = customer;
    this.customerCurrent.dateOfBirth = this.customerCurrent.dateOfBirth.substring(0, 10);
    // console.log(this.customerCurrent.dateOfBirth)
    this.emptyObject = false;
    this.idCustomerEdit = customer.customerId;
    // console.log(this.emptyObject)
    // console.log(this.customerCurrent)
    this.customerValidate = new ValidateCustomer(true, this.customerCurrent.name, this.customerCurrent.dateOfBirth, this.customerCurrent.email, this.customerCurrent.address, this.customerCurrent.phone, this.customerCurrent.idCard, this.customerCurrent.img)
    console.log(this.customerValidate)
  }

  editEmployee() {
    this.customerValidate.checkAge();
    // console.log(this.customerValidate)
    if (this.customerValidate.isValid) {
      this.customerService.update({
        customerId: this.customerCurrent.customerId,
        name: this.customerValidate.name,
        dateOfBirth: this.customerValidate.dateOfBirth,
        email: this.customerValidate.email,
        address: this.customerValidate.address,
        phone: this.customerValidate.phone,
        gender: this.customerCurrent.gender,
        idCard: this.customerValidate.idCard,
        img: this.customerValidate.img
      }).subscribe(data => {
        console.log(data)
        this.emptyObject = true;
        this.getAllCustomer();
      })
    }
  }
}
