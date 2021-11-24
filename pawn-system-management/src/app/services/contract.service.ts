import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../interface/contract";
import {ContractDTO} from "../model/ContractDTO";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private APIUpdateStatusContractPawn: string = "http://localhost:8080/contract/update-status-contract";
  private APICreateLiquidationContract: string = "http://localhost:8080/contract/create-liquidation-contract";
  private APIGetProductList: string = "http://localhost:8080/contract/get-liquidation-product-list";
  private APIGetCustomerList: string = "http://localhost:8080/customer/getCustomerList";
  private APIGetEmployeeList: string = "http://localhost:8080/employee/getEmployeeList";
  private APISearchLiquidationProduct: string = "http://localhost:8080/contract/search-liquidation-product";
  private APISearchCustomer: string = "http://localhost:8080/customer/searchCustomer";
  private APISearchEmployee: string = "http://localhost:8080/employee/searchEmployee";
  private APIProductList: string = "http://localhost:8080/contract/getListTypeProduct";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  saveLiquidationContract(contract: ContractDTO): Observable<ContractDTO> {
    return this.httpClient.post<ContractDTO>(this.APICreateLiquidationContract, contract);
  }

  getLiquidationProductList(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetProductList)
  }

  getTypeProductList(): Observable<any> {
    return this.httpClient.get<any>(this.APIProductList)
  }

  getCustomerList(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetCustomerList)
  }

  getEmployeeList(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetEmployeeList)
  }

  searchLiquidationProduct(productName: string, receiveMoney: number, name: string): Observable<any> {
    return this.httpClient.get<any>(this.APISearchLiquidationProduct +
      '?product_name=' + productName + '&receive_money=' + receiveMoney + '&name=' + name);
  }

  searchCustomer(searchCus: string): Observable<any> {
    return this.httpClient.get<any>(this.APISearchCustomer + '?searchValue=' + searchCus)
  }

  searchEmployee(searchEm: string): Observable<any> {
    return this.httpClient.get<any>(this.APISearchEmployee + '?searchValue=' + searchEm)
  }

  getPageListCustomer(pageNum: number, searchName: string): Observable<any> {
    const url = this.APISearchCustomer + '?page=' + pageNum + '&searchName=' + searchName;
    return this.httpClient.get<any>(url);
  }

  getPageListEmployee(pageNum: number, searchName: string): Observable<any> {
    const url = this.APISearchEmployee + '?page=' + pageNum + '&searchName=' + searchName;
    return this.httpClient.get<any>(url);
  }

  getPageListProduct(pageNum: number, productName: string, receiveMoney: number, name: string): Observable<any> {
    const url = this.APISearchLiquidationProduct + '?page=' + pageNum + '&product_name=' + productName +
      '&receive_money=' + receiveMoney + '&name=' + name;
    return this.httpClient.get<any>(url);
  }

  updateStatusContractPawn(contractID: string): Observable<any> {
    return this.httpClient.get<any>(this.APIUpdateStatusContractPawn + '?contractID=' + contractID);
  }
}
