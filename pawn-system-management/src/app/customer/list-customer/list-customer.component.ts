import { Component, OnInit } from '@angular/core';

import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../interface/customer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "../delete-customer/delete-customer.component";
import {AlertService} from "../../services/alert.service";
import {Title} from "@angular/platform-browser";
import {FormGroup,FormControl } from '@angular/forms';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ValidateCustomer } from './customer-validate';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customers: Customer[] = [];
  customer!: Customer;
  searchCustomer!: FormGroup;
  totalPage: number[] = [];
  pageNow: number = 1;
  idCustomerEdit: any;
  customerCurrent!: Customer;
  emptyObject = this.customerCurrent == null;
  customerValidate!: ValidateCustomer;
  constructor(public customerService: CustomerService,
              public dialog: MatDialog,
              public alertService: AlertService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Danh sách khách hàng");
    this.searchCustomer = new FormGroup({
      dateOfBirthFrom: new FormControl(''),
      dateOfBirthTo: new FormControl(''),
      address: new FormControl(''),
      name: new FormControl(''),
    });
    this.getListCustomer();
  }

  getListCustomer(){
    this.customerService.getListCustomer().subscribe(data => {
      this.customers = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0);
      }
    });
  }

  getPage(pageNum: number) {
    if (this.searchCustomer.value.dateOfBirthFrom == '') {
      this.searchCustomer.value.dateOfBirthFrom = '1900-1-1';
      this.searchCustomer.value.dateOfBirthTo = '';
    }
    if (this.searchCustomer.value.dateOfBirthTo == '') {
      this.searchCustomer.value.dateOfBirthFrom = '';
      this.searchCustomer.value.dateOfBirthTo = '2500-1-1';
    }
    this.customerService.searchPageCustomer(this.searchCustomer.value.dateOfBirthFrom, this.searchCustomer.value.dateOfBirthTo,
      this.searchCustomer.value.address, this.searchCustomer.value.name, pageNum).subscribe((data) => {
      this.customers = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0);
      }
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
      this.getListCustomer();
    });
  }

  edit(customer: Customer) {
    this.customerCurrent = customer;
    this.customerCurrent.dateOfBirth = this.customerCurrent.dateOfBirth.substring(0, 10);
    this.emptyObject = false;
    this.idCustomerEdit = customer.customerId;
    this.customerValidate = new ValidateCustomer(true, this.customerCurrent, this.customers);
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
        this.getListCustomer();
        this.alertService.showAlertSuccess("Cập nhật khách hàng thành công")
      })
    } else {
      this.emptyObject = true;
    }
  }

  openDialog(id: any, name:any): void {
    const dialogRef = this.dialog.open(DeleteCustomerComponent, {
      width: '500px',
      data: {customerId: id, name: name},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  search() {
    if (this.searchCustomer.value.dateOfBirthFrom == '') {
      this.searchCustomer.value.dateOfBirthFrom = '1900-1-1';
    }
    if (this.searchCustomer.value.dateOfBirthTo == '') {
      this.searchCustomer.value.dateOfBirthTo = '2500-1-1';
    }
    if (this.searchCustomer.value.address == '') {
      this.searchCustomer.value.address = '';
    }
    if (this.searchCustomer.value.name == '') {
      this.searchCustomer.value.name = '';
    }
    this.customerService.searchCustomer(this.searchCustomer.value.dateOfBirthFrom, this.searchCustomer.value.dateOfBirthTo,
      this.searchCustomer.value.address, this.searchCustomer.value.name).subscribe((data) => {
      this.customers = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0);
      }
    }, () => {
      this.alertService.showMessageErrors("Không thể tìm kiếm khách hàng như theo yêu cầu!");
    })
  }
}
