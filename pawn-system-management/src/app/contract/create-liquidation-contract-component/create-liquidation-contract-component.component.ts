import { Component, OnInit } from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {Contract} from "../../interface/contract";
import {Customer} from "../../interface/customer";
import {Employee} from "../../interface/employee";

@Component({
  selector: 'app-create-liquidation-contract-component',
  templateUrl: './create-liquidation-contract-component.component.html',
  styleUrls: ['./create-liquidation-contract-component.component.css']
})
export class CreateLiquidationContractComponentComponent implements OnInit {
 liquidationContract: any;
 liquidationProductList: Contract[] | undefined;
 customerList: Customer[] | undefined;
 employeeList: Employee[] | undefined;

  constructor(
    public contractService: ContractService,
  ) { }

  ngOnInit(): void {
    this.createLiquidationContract();
    this.getLiquidationProductList();
    this.getCustomerList();
    this.getEmployeeList();
  }
  createLiquidationContract() {
    let contract;
    this.contractService.saveLiquidationContract(contract).subscribe(data => {
        this.liquidationContract = data;
      }
    )
  }

  getLiquidationProductList(){
    this.contractService.getLiquidationProductList().subscribe(data =>{
      this.liquidationProductList = data.content;
    })
  }

  getCustomerList(){
    this.contractService.getCustomerList().subscribe(data =>{
      this.customerList = data.content;
    })
  }

  getEmployeeList(){
    this.contractService.getEmployeeList().subscribe(data =>{
      this.employeeList = data.content;
    })
  }
}
