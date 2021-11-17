import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../interface/customer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "../delete-customer/delete-customer.component";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers!: Customer[];
  customer!: Customer;
  totalPage = 0;
  indexPage = 1;
  searchCustomer!: FormGroup;

  constructor(public customerService: CustomerService, public dialog: MatDialog,
              public alertService: AlertService) { }

  ngOnInit(): void {
    this.getListCustomer();
    this.searchCustomer = new FormGroup({
      customerId: new FormControl(''),
      dateOfBirthFrom: new FormControl(''),
      dateOfBirthTo: new FormControl(''),
      address: new FormControl(''),
      countContract: new FormControl(''),
      name: new FormControl(''),
    })
  }

  getListCustomer(){
    this.customerService.getListCustomer().subscribe(data => {
      this.customers = data.content;
      this.totalPage = data.totalPages;
      console.log(this.customers);
    });
  }

  getPage(pageNum: number){
    // this.customerService.getPageList(pageNum).subscribe(data =>{
    //   this.customers = data.content;
    //   this.indexPage = data.pageable.pageNumber + 1;
    // });

    if (this.searchCustomer.value.dateOfBirthFrom == '') {
      this.searchCustomer.value.dateOfBirthFrom = '';
    }
    if (this.searchCustomer.value.dateOfBirthTo == '') {
      this.searchCustomer.value.dateOfBirthTo = '';
    }
    if (this.searchCustomer.value.address == '') {
      this.searchCustomer.value.address = '';
    }
    if (this.searchCustomer.value.name == '') {
      this.searchCustomer.value.name = '';
    }
    this.customerService.searchPageCustomer(this.searchCustomer.value.customerId, this.searchCustomer.value.dateOfBirthFrom, this.searchCustomer.value.dateOfBirthTo,
      this.searchCustomer.value.address, this.searchCustomer.value.name, pageNum).subscribe((data) => {
        this.customers = data.content;
        this.indexPage  = data.pageable.pageNumber + 1;
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
      this.searchCustomer.value.dateOfBirthFrom = '1000-01-01';
    }
    if (this.searchCustomer.value.dateOfBirthTo == '') {
      this.searchCustomer.value.dateOfBirthTo = '9999-01-01';
    }
    if (this.searchCustomer.value.address == '') {
      this.searchCustomer.value.address = '';
    }
    if (this.searchCustomer.value.name == '') {
      this.searchCustomer.value.name = '';
    }
    this.customerService.searchCustomer(this.searchCustomer.value.customerId.trim(), this.searchCustomer.value.dateOfBirthFrom, this.searchCustomer.value.dateOfBirthTo,
      this.searchCustomer.value.address, this.searchCustomer.value.name).subscribe((data) => {
        this.customers = data.content;
      },() => {
        this.alertService.showMessageErrors('Không tìm thấy!');
      })
  };

  searchEnter($event: any) {
    if (this.searchCustomer.value.dateOfBirthFrom == '') {
      this.searchCustomer.value.dateOfBirthFrom = '1000-01-01';
    }
    if (this.searchCustomer.value.dateOfBirthTo == '') {
      this.searchCustomer.value.dateOfBirthTo = '9999-01-01';
    }
    if (this.searchCustomer.value.address == '') {
      this.searchCustomer.value.address = '';
    }
    if (this.searchCustomer.value.name == '') {
      this.searchCustomer.value.name = '';
    }
    this.customerService.searchCustomer(this.searchCustomer.value.customerId.trim(), this.searchCustomer.value.dateOfBirthFrom, this.searchCustomer.value.dateOfBirthTo,
      this.searchCustomer.value.address, this.searchCustomer.value.name).subscribe((data) => {
        this.customers = data.content;
      })
  }

  pageRefresh() {
    this.ngOnInit();
  }

}
