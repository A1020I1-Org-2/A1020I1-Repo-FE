
import {Component, OnInit} from '@angular/core';
import {Contract} from "../../interface/contract";
import {ContractService} from "../../services/contract.service";

import {FormControl, FormGroup} from "@angular/forms";

import {MatDialog} from "@angular/material/dialog";
import {DeleteListTop10ContractComponent} from "../delete-list-top10-contract/delete-list-top10-contract.component";
import {EditListTop10Component} from "../edit-list-top10/edit-list-top10.component";
import {Title} from "@angular/platform-browser";



@Component({
  selector: 'app-list-top10-contract',
  templateUrl: './list-top10-contract.component.html',
  styleUrls: ['./list-top10-contract.component.css']
})
export class ListTop10ContractComponent implements OnInit {

  listTop10Contract: Contract[] = [];
  getInforList!: Contract;
  searchListTop10!: FormGroup;


  constructor(private contractService: ContractService,
              private dialog: MatDialog,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("Top 10 giao dịch mới nhất");
    this.getListTop10();
    this.searchListTop10 = new FormGroup({
      key: new FormControl('')
    })
  }

  getListTop10() {
    this.contractService.getListTop10Contract().subscribe(
      (data) => {
        console.log(data);
        this.listTop10Contract = data;
      },
      () => {
        console.log("Error");
      },
      () => {
        console.log("Complete");
      }
    );
  }

  getId(contractId: string) {
    this.contractService.getInfo(contractId).subscribe((data) => {
      this.getInforList = data;
      console.log(data)
    })
  }

  searchContractListTop10() {
    if (this.searchListTop10.value.key == '') {
      this.getListTop10();
    }
    this.contractService.searchContractListTop10(this.searchListTop10.value.key).subscribe(
      (data) => {
        this.listTop10Contract = data;
        console.log(data);
      }
    )
  }

  openDialog(contractId: string) {
    this.contractService.getInfo(contractId).subscribe((data)=>{
      const dialog = this.dialog.open(DeleteListTop10ContractComponent,{
          width: '500px',
          data: data,
          disableClose: true,
          autoFocus: false
        }
      );
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })

  }

  openDialogEdit(contractId: string) {
    this.contractService.getInfo(contractId).subscribe((data)=>{
      const  dialog = this.dialog.open(EditListTop10Component,{
        width: '60%',
        data: data,
        disableClose: true,
        autoFocus: false
      })
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }

  seacrhEnter($event: KeyboardEvent) {
    if (this.searchListTop10.value.key == '') {
      this.getListTop10();
    }
    this.contractService.searchContractListTop10(this.searchListTop10.value.key).subscribe(
      (data) => {
        this.listTop10Contract = data;
        console.log(data);
      }
    )
  }

}
