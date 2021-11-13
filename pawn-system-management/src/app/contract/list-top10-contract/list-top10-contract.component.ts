import {Component, OnInit} from '@angular/core';
import {Contract} from "../../interface/contract";
import {ContractService} from "../../services/contract.service";

import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-top10-contract',
  templateUrl: './list-top10-contract.component.html',
  styleUrls: ['./list-top10-contract.component.css']
})
export class ListTop10ContractComponent implements OnInit {
  listTop10Contract: Contract[] = [];
  getInforList!: Contract;
  searchListTop10!: FormGroup;


  constructor(private contractService: ContractService,private router: Router) {
  }

  ngOnInit(): void {
    this.getListTop10();
    this.searchListTop10 = new FormGroup({
      key: new FormControl('')
    })
  }

  getListTop10() {
    this.contractService.getListTop10Contract().subscribe(
      (data) => {

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

  getIdDelete(contractId: string) {
    this.contractService.getInfo(contractId).subscribe((data) => {
      this.getInforList = data;
      console.log(data)
    })
  }

  deleteContract() {
    this.contractService.deleteListTop10(this.getInforList.contractId).subscribe(() => {
      this.ngOnInit();
    })
  }
}
