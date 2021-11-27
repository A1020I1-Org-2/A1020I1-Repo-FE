import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ValidateCustomer } from './customer-validate';
import { AlertService } from '../alert.service';
import { Title } from '@angular/platform-browser';
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
  customerValidate!: ValidateCustomer;
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertService: AlertService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Danh sách khách hàng");
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getListCustomer().subscribe(data => {
      console.log(data)
      this.customers = data;
    })
  }

  openDialogCreate() {
    this.customerService.customers = this.customers;
    let dialogRef = this.dialog.open(CreateCustomerComponent, {
      height: '680px',
      width: '1000px',
      disableClose: true,
      autoFocus: false,
      data: this.customers
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCustomer();
    });
  }

  edit(customer: Customer) {
    this.customerCurrent = customer;
    this.customerCurrent.dateOfBirth = this.customerCurrent.dateOfBirth.substring(0, 10);
    this.emptyObject = false;
    this.idCustomerEdit = customer.customerId;
    this.customerValidate = new ValidateCustomer(true, this.customerCurrent, this.customers)
    console.log(this.customerValidate)
  }

  closeEdit() {
    this.emptyObject = true;
  }

  editEmployee() {
    this.customerValidate.checkAge();
    if (this.customerValidate.isValid && this.customerValidate.isChange) {
      this.customerService.update({
        customerId: this.customerCurrent.customerId,
        name: this.customerValidate.name,
        dateOfBirth: this.customerValidate.dateOfBirth,
        email: this.customerValidate.email,
        address: this.customerValidate.address,
        phone: this.customerValidate.phone,
        gender: this.customerValidate.gender,
        idCard: this.customerValidate.idCard,
        img: this.customerValidate.img
      }).subscribe(data => {
        this.emptyObject = true;
        this.getAllCustomer();
        this.alertService.showAlertSuccess("Cập nhật khách hàng thành công")
      })
    } else {
      this.emptyObject = true;
    }
  }

}
