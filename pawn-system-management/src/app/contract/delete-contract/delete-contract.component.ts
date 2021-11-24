import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../services/contract.service";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.css']
})
export class DeleteContractComponent implements OnInit {

  id= '';
  name = '';
  constructor(public dialog: MatDialogRef<DeleteContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public contractService: ContractService,
              private alertService: AlertService,
              ) { }

  ngOnInit(): void {
    this.id = this.data.contractId;
  }

  delete() {
    this.contractService.deleteContract(this.id).subscribe(()=>{
      this.dialog.close();
      this.alertService.showAlertSuccess("Xóa thành công.")

    }, error => {
      this.alertService.showMessageErrors('Hợp đồng này đã được xóa!');
    });

  }

}
