import {Component, Inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Contract} from "../../interface/contract";
import {Router} from "@angular/router";
import {ContractEdit} from "../../interface/ContractEdit";
import {formatDate} from "@angular/common";
import {AlertService} from "../alert.service";

function checkDate(form:AbstractControl): ValidationErrors|null {

  const startDate = new Date(form.value.startDate);
  const endDate = new Date(form.value.endDate);
  let resultDate = (startDate.getTime() - endDate.getTime())/(1000*60*60*24);
  console.log(resultDate);
  if (resultDate > 0){
    return {checkDate: true};
  }
  return null;
}

function checkDateStart(param: AbstractControl): ValidationErrors | null {
  const now = new Date();
  const liquidationDate = new Date(param.value);
  let diff = (now.getTime() - liquidationDate.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 1 && diff > 0) {
    return null;
  } else {
    return {checkLiquidationDate: true};
  }
  return null;
}
@Component({
  selector: 'app-edit-list-top10',
  templateUrl: './edit-list-top10.component.html',
  styleUrls: ['./edit-list-top10.component.css']
})

export class EditListTop10Component implements OnInit {
  editContract!: FormGroup;
  id!: string;
  typeProductList: any;
  statusContract: any;
  typeContract: any;
  contractEdit !: ContractEdit;

  constructor(private fb: FormBuilder, private router: Router, private contractService: ContractService, private dialog: MatDialogRef<EditListTop10Component>,
              @Inject(MAT_DIALOG_DATA) public data: any, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.contractService.getListTypeProduct().subscribe((data) => {
      this.typeProductList = data;
    });
    this.contractService.getListStatusContract().subscribe((data) => {
      this.statusContract = data;
    });
    this.contractService.getListTypeContract().subscribe((data) => {
      this.typeContract = data;
    });



    this.editContract = new FormGroup({
      contractId: new FormControl(''),
      customer: new FormControl('', [Validators.required]),
      customerId: new FormControl(''),
      productName: new FormControl('', [Validators.required]),
      typeProduct: new FormControl(0, [Validators.required]),
      dateGroup : new FormGroup({
        startDate: new FormControl('',[Validators.required]),
        endDate: new FormControl('', [Validators.required])
      },[checkDate]),
      typeContract: new FormControl(0),
      statusContract: new FormControl(0, [Validators.required])
    });


    this.contractService.getInfo(this.data.contractId).subscribe((data) => {
      this.editContract.patchValue({
        contractId: data.contractId,
        customerId: data.customer.customerId,
        customer: data.customer.name,
        productName: data.productName,
        typeProduct: data.typeProduct.typeProductId,
        dateGroup:{
          startDate: formatDate(data.startDate, "yyyy-MM-dd", 'en-US'),
          endDate: formatDate(data.endDate, "yyyy-MM-dd", 'en-US'),
        },
        typeContract: data.typeContract.typeContractId,
        statusContract: data.statusContract.statusContractId
      });
      console.log(new Date(this.editContract.value.startDate).toISOString())
    });
  }



  onEditContract() {
    if (this.editContract.valid) {
      console.log(this.editContract.value);
      const value = this.editContract.value;
      this.contractEdit = new ContractEdit(value.contractId, value.customerId, value.customer, value.productName,
        value.typeProduct, value.dateGroup.startDate, value.dateGroup.endDate, value.statusContract);
      this.contractService.editContract(this.contractEdit).subscribe((data) => {
        this.dialog.close();
        this.alertService.showAlertSuccess("Sửa hợp đồng thành công!");
      })
    }
  }


}
