import {Component, Inject, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-list-top10-contract',
  templateUrl: './delete-list-top10-contract.component.html',
  styleUrls: ['./delete-list-top10-contract.component.css']
})
export class DeleteListTop10ContractComponent implements OnInit {
  id!:string;
  constructor(private contractService: ContractService, private dialog: MatDialogRef<DeleteListTop10ContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.id = this.data.contractId;
  }

  deleteListTop10() {
    this.contractService.deleteListTop10(this.id).subscribe(()=>{
      this.dialog.close();
    })
  }

  notDelete() {

  }
}
