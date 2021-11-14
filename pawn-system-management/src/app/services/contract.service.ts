import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../interface/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  APICreateLiquidationContract:string = "http://localhost:8080/contract/create-liquidation-contract";
  APIGetProductList:string = "http://localhost:8080/contract/get-liquidation-product-list";
  APIGetCustomerList:string = "http://localhost:8080/contract/get-customer-list";
  APIGetEmployeeList:string = "http://localhost:8080/contract/get-employee-list";

  constructor(
    private httpClient: HttpClient
  ) { }
  saveLiquidationContract(contract: any){
    return this.httpClient.post<Contract>(this.APICreateLiquidationContract,contract);
  }
  getLiquidationProductList():Observable<any>{
    return  this.httpClient.get<any>(this.APIGetProductList)
  }
  getCustomerList():Observable<any>{
    return  this.httpClient.get<any>(this.APIGetCustomerList)
  }
  getEmployeeList():Observable<any>{
    return  this.httpClient.get<any>(this.APIGetEmployeeList)
  }
}
