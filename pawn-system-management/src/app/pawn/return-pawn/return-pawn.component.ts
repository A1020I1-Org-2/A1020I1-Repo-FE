import {Component, Inject, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AlertService} from "../../services/alert.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../services/contract.service";
import {Contract} from "../../interface/contract";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

function checkDate(control: AbstractControl): ValidationErrors | null {
  let now = new Date();
  let date = new Date(control.value);
  let between = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  // console.log(between);
  return between < -1 ? {checkDate: true} : null;
}

@Component({
  selector: 'app-return-pawn',
  templateUrl: './return-pawn.component.html',
  styleUrls: ['./return-pawn.component.css']
})
export class ReturnPawnComponent implements OnInit {
  formContract!: FormGroup;
  contract!: Contract;
  constructor(private title: Title,
              private alert: AlertService,
              private dialog: MatDialog,
              private contractService: ContractService,) { }

  ngOnInit(): void {
    this.title.setTitle("Trả đồ");
    this.formContract = new FormGroup({
      idContract: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      loanMoney: new FormControl('', [Validators.required]),
      interestMoney: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      returnPawn: new FormControl('', [checkDate, Validators.required]),
    })
    if(this.contractService.contract !== undefined){
      this.chooseContract(this.contractService.contract);
      this.contractService.contract = undefined;
    }
  }

  openListContract() {
    let dialog = this.dialog.open(DialogListContract, {
      disableClose: true,
      autoFocus: false,
      width: '70%',
    });

    dialog.afterClosed().subscribe(result => {
      if(result.message !== 'no'){
        this.contractService.getInfo(result.message).subscribe(contract => {
          this.contract = contract;
          this.chooseContract(contract);
        });
      }
    })
  }

  doSubmit() {
    this.contract.liquidationDate = this.formContract.controls.returnPawn.value;
    this.contractService.paymentContract(this.contract).subscribe(result => {
      this.formContract.reset();
      this.alert.showAlertSuccess('Thanh toán hợp đồng thành công!!!');
    }, error => {
      this.alert.showMessageErrors('Thanh toán hợp đồng thất bại!!!');
    })
  }

  private chooseContract(contract: Contract) {
    this.formContract.patchValue({
      idContract: contract.contractId,
      customerName: contract.customer.name,
      productName: contract.productName,
      loanMoney: contract.loanMoney,
      interestMoney: contract.interestMoney,
      startDate: formatDate(contract.startDate, "yyyy-MM-dd", 'en-US'),
      endDate: formatDate(contract.endDate, "yyyy-MM-dd", 'en-US')
    })
  }
}

@Component({
  selector: '',
  templateUrl: './dialog-list-contract.html'
})
export class DialogListContract implements OnInit{
  listContract: Contract[] = [];
  pageNow: number = 0;
  totalPage: number = 0;
  keyword: string = '';

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: Contract[],
              private contractService: ContractService,) {
  }

  ngOnInit(): void {
    this.getListContract(0);
  }

  getListContract(page: number){
    this.contractService.getListContractOpen(this.keyword, page).subscribe(list => {
      this.listContract = list.content;
      this.pageNow = list.number;
      this.totalPage = list.totalPages;
    })
  }

  closeDialog(): void{
    this.dialogRef.close({message: 'no'});
  }

  selectContract(id: string): void{
    this.dialogRef.close({message: id});
  }
}
