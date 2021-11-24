import { Component, OnInit } from '@angular/core';
import {TypeContract} from "../../interface/type-contract";
import {StatusContract} from "../../interface/status-contract";
import {Customer} from "../../interface/customer";
import {Contract} from "../../interface/contract";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {TypeContractService} from "../../services/type-contract.service";
import {StatusContractService} from "../../services/status-contract.service";
import {CustomerService} from "../../services/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteContractComponent} from "../delete-contract/delete-contract.component";
import {AlertService} from "../alert.service";
function checkDate(form:AbstractControl): ValidationErrors|null {

  const startDate = new Date(form.value.startDateFrom);
  const endDate = new Date(form.value.endDateTo);
  let resultDate = (startDate.getTime() - endDate.getTime())/(1000*60*60*24);
  console.log(resultDate);
  if (resultDate > 0){
    return {checkDate: true};
  }

  return null;
}
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
  indexPagination: number = 1;
  totalPagination: number = 0;
  startDateFrom: any;
  endDateTo: any;
  constructor(private contractService: ContractService,
              private typeContractService: TypeContractService,
              private statusContractService: StatusContractService,
              private customerService: CustomerService,
              private toast: AlertService,
              private dialog: MatDialog,
              ) { }
  ngOnInit(): void {
    this.getList();
    this.searchContract = new FormGroup({
      customer: new FormControl('', [Validators.maxLength(10)]),
      productName: new FormControl('', [Validators.maxLength(10)]),
      statusContract: new FormControl(''),
      typeContract: new FormControl(''),
      dateGroup : new FormGroup({
        startDateFrom: new FormControl(''),
        endDateTo: new FormControl('')
      },[checkDate]),

    })
  };




  getList() {
    this.contractService.getAllContract().subscribe((data)=>{
      this.listContract = data.content;
      this.totalPagination = data.totalPages;
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


  getId(contractId: string) {
    this.contractService.getInfo(contractId).subscribe((data)=>{
      this.getInforList = data;
    })
  }
  getPageContract(pageNumber: number) {

    this.contractService.getPageSearch(pageNumber, this.searchContract.value.customer, this.searchContract.value.productName,
      this.searchContract.value.statusContract, this.searchContract.value.typeContract, this.searchContract.get('dateGroup.startDateFrom')?.value,
      this.searchContract.get('dateGroup.endDateTo')?.value).subscribe(data =>{
        this.listContract = data.content;
        this.indexPagination = data.pageable.pageNumber + 1;
        this.totalPagination = data.totalPages;
    })

  }
  search() {
    if(this.searchContract.valid){

      if(this.searchContract.value.customer == ''){
        this.searchContract.value.customer = "";
      }
      if(this.searchContract.value.productName == ''){
        this.searchContract.value.productName = "";
      }
      if(this.searchContract.value.statusContract == ''){
        this.searchContract.value.statusContract = '';
      }
      if(this.searchContract.value.typeContract == ''){
        this.searchContract.value.typeContract = '';
      }
      if(this.searchContract.get('dateGroup.startDateFrom')?.value == ''){
        this.searchContract.get('dateGroup.startDateFrom')?.setValue('1900-01-01');
      }
      if(this.searchContract.get('dateGroup.endDateTo')?.value== ''){
        this.searchContract.get('dateGroup.endDateTo')?.setValue('3000-01-01');
      }
      this.contractService.searchContract(this.searchContract.value.customer, this.searchContract.value.productName,
        this.searchContract.value.statusContract, this.searchContract.value.typeContract, this.searchContract.get('dateGroup.startDateFrom')?.value,
        this.searchContract.get('dateGroup.endDateTo')?.value).subscribe((data)=>{
        this.listContract = data.content;
        console.log(data)
      }, () =>{
        this.toast.showMessageErrors("Không tìm thấy kết quả như yêu cầu");
      })
    }
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

}
