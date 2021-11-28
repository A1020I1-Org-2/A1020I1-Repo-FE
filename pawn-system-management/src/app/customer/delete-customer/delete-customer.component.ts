import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../services/customer.service";
import {AlertService} from "../../services/alert.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  public nameCustomer: any;
  public idCustomer: any;

  constructor(public dialogRef: MatDialogRef<DeleteCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public customerService: CustomerService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.nameCustomer = this.data.name;
    this.idCustomer = this.data.customerId;
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.idCustomer).subscribe(data =>{
      this.dialogRef.close();
      this.alertService.showAlertSuccess('Xóa Khách hàng thành công!');
    })
  }

}
