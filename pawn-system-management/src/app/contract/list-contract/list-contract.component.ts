import { Component, OnInit } from '@angular/core';
import {TypeContract} from "../../interface/type-contract";
import {StatusContract} from "../../interface/status-contract";
import {Customer} from "../../interface/customer";
import {Contract} from "../../interface/contract";
import {FormControl, FormGroup} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {TypeContractService} from "../../services/type-contract.service";
import {StatusContractService} from "../../services/status-contract.service";
import {CustomerService} from "../../services/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteContractComponent} from "../delete-contract/delete-contract.component";

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.css']
})
export class ListContractComponent implements OnInit {

  listTypeContract: TypeContract[] = [];
  listStatusContract: StatusContract[] = [];
  listCustomer: Customer[] = [];
  listContract: Contract[] = [];
  searchContract!: FormGroup;
  getInforList!: Contract;
  searchStatus= '';
  indexPage= 1;
  totalPage= 0;
  constructor(private contractService: ContractService,
              private typeContractService: TypeContractService,
              private statusContractService: StatusContractService,
              private customerService: CustomerService,
              private dialog: MatDialog,
              ) { }
  ngOnInit(): void {
    this.getList();
    this.searchContract = new FormGroup({
      customer: new FormControl(''),
      productName: new FormControl(''),
      statusContract: new FormControl(''),
      typeContract: new FormControl(''),
      startDateFrom: new FormControl(''),
      endDateTo: new FormControl(''),
    })
  };
  getList() {
    this.contractService.getAllContract().subscribe((data)=>{
      this.listContract = data.content;
      this.totalPage = data.totalPages;
    });
    this.customerService.getAllCustomer().subscribe((data)=>{

    });
    this.typeContractService.getAllTypeContract().subscribe((data)=>{
      this.listTypeContract = data;
    });
    this.statusContractService.getAllStatusContract().subscribe((data)=>{
      this.listStatusContract = data;
    });

  }

  delete(id: string) {
    const dialog = this.dialog.open(DeleteContractComponent, {
      width: '500px',
      data: {contractId: id}
    });
    dialog.afterClosed().subscribe(() =>{
      this.ngOnInit();
    });

  }



  search() {
    if(this.searchContract.value.customer == ''){
      this.searchContract.value.customer = "";
    };
    if(this.searchContract.value.productName == ''){
      this.searchContract.value.productName = "";
    };
    if(this.searchContract.value.statusContract == ''){
      this.searchContract.value.statusContract = '';
    };
    if(this.searchContract.value.typeContract == ''){
      this.searchContract.value.typeContract = '';
    };
    if(this.searchContract.value.startDateFrom == ''){
      this.searchContract.value.startDateFrom = "1900-01-01";
    };
    if(this.searchContract.value.endDateTo == ''){
      this.searchContract.value.endDateTo = "3000-01-01";
    };
    this.contractService.searchContract(this.searchContract.value.customer, this.searchContract.value.productName,
      this.searchContract.value.statusContract, this.searchContract.value.typeContract, this.searchContract.value.startDateFrom,
      this.searchContract.value.endDateTo).subscribe((data)=>{
      this.listContract = data.content;
    }, () =>{

    })
  }



  getId(contractId: string) {
    this.contractService.getInfo(contractId).subscribe((data)=>{
      this.getInforList = data;
    })
  }

  getPage(pageNumber: number) {
    if(this.searchContract.value.startDateFrom == ''){
      this.searchContract.value.startDateFrom = "1900-01-01";
    };
    if(this.searchContract.value.endDateTo == ''){
      this.searchContract.value.endDateTo = "3000-01-01";
    };
    this.contractService.getPageSearch(pageNumber, this.searchContract.value.customer, this.searchContract.value.productName,
      this.searchContract.value.statusContract, this.searchContract.value.typeContract, this.searchContract.value.startDateFrom,
      this.searchContract.value.endDateTo).subscribe(data =>{
      this.listContract = data.content;
      this.indexPage = data.pageable.pageNumber + 1;
    })

  }

  searchEnter($event: KeyboardEvent) {
    if(this.searchContract.value.customer == ''){
      this.searchContract.value.customer = "";
    };
    if(this.searchContract.value.productName == ''){
      this.searchContract.value.productName = "";
    };
    if(this.searchContract.value.statusContract == ''){
      this.searchContract.value.statusContract = '';
    };
    if(this.searchContract.value.typeContract == ''){
      this.searchContract.value.typeContract = '';
    };
    if(this.searchContract.value.startDateFrom == ''){
      this.searchContract.value.startDateFrom = "1900-01-01";
    };
    if(this.searchContract.value.endDateTo == ''){
      this.searchContract.value.endDateTo = "3000-01-01";
    };
    this.contractService.searchContract(this.searchContract.value.customer, this.searchContract.value.productName,
      this.searchContract.value.statusContract, this.searchContract.value.typeContract, this.searchContract.value.startDateFrom,
      this.searchContract.value.endDateTo).subscribe((data)=>{
      this.listContract = data.content;
    }, () =>{

    })

  }

}
