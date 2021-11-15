import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.css']
})
export class DeleteContractComponent implements OnInit {

  // @ts-ignore
  id: string;
  name = '';
  constructor(public dialog: MatDialogRef<DeleteContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public contractService: ContractService,
              ) { }

  ngOnInit(): void {
    this.id = this.data.contractId;
  }

  delete() {
    this.contractService.deleteContract(this.id).subscribe(()=>{
      this.dialog.close();
      // this.alertService.showAlertSuccess("Xóa thành công.")

    });

  }

}
