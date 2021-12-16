import {Component, Inject, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AlertService} from "../../services/alert.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../services/contract.service";
import {Contract} from "../../interface/contract";
import {DialogMessage} from "../../login/login/login.component";

@Component({
  selector: 'app-return-pawn',
  templateUrl: './return-pawn.component.html',
  styleUrls: ['./return-pawn.component.css']
})
export class ReturnPawnComponent implements OnInit {
  constructor(private title: Title,
              private alert: AlertService,
              private dialog: MatDialog,
              private contractService: ContractService,) { }

  ngOnInit(): void {
    this.title.setTitle("Trả đồ");
  }

  openListContract() {
    this.dialog.open(DialogListContract, {
      disableClose: true,
      autoFocus: false,
      width: '70%',
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
      // console.log(list);
      this.listContract = list.content;
      this.pageNow = list.number;
      this.totalPage = list.totalPages;
    })
  }

  closeDialog(): void{
    this.dialogRef.close({message: 'no'});
  }

  selectChange(): void{
    this.dialogRef.close({message: 'yes'});
  }


}
