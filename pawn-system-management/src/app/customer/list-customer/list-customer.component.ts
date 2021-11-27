import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../interface/customer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "../delete-customer/delete-customer.component";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../services/alert.service";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customers!: Customer[];
  customer!: Customer;
  searchCustomer!: FormGroup;
  totalPage = 0;
  indexPage = 1;

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
      this.totalPage = data.totalPages;
    });
  }

  getPage(pageNum: number){
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
        this.indexPage = data.pageable.pageNumber + 1;
      })
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
      this.indexPage = 1;
      this.totalPage = data.totalPages;
      console.log(this.customers)
    }, () => {
      this.alertService.showMessageErrors("Không thể tìm kiếm khách hàng như theo yêu cầu!");
    })
  }
}
