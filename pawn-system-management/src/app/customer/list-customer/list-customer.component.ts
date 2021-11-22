import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';

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
    console.log(this.customerCurrent.dateOfBirth)
    this.emptyObject = false;
    this.idCustomerEdit = customer.customerId;
    console.log(this.emptyObject)
    console.log(this.customerCurrent)
  }

  editEmployee() {
    this.customerService.update(this.customerCurrent).subscribe(data => {
      console.log(data)
      this.emptyObject = true;
      this.getAllCustomer();
    })
  }


}
