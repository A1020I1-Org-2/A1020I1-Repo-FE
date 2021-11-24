import {Injectable} from '@angular/core';

import {Contract} from "../interface/contract";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeProduct} from "../interface/type-product";
import {StatusContract} from "../interface/status-contract";
import {TypeContract} from "../interface/type-contract";
import {ContractEdit} from "../interface/ContractEdit";
import {ContractDTO} from "../model/ContractDTO";


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract!: Contract[];
  readonly URL = "http://localhost:8080/contract/";
  readonly URL_SEARCH_TOP10 = "http://localhost:8080/contract/listTop10/search?key=";

  constructor(private httpClient: HttpClient) {
  }
  getListTypeProduct():Observable<TypeProduct[]>{
    return this.httpClient.get<TypeProduct[]>(this.URL+ "listTypeProduct");
  }
  getListStatusContract():Observable<StatusContract[]>{
    return this.httpClient.get<StatusContract[]>(this.URL +"listStatusContract");
  }
  getListTypeContract():Observable<TypeContract[]>{
    return this.httpClient.get<TypeContract[]>(this.URL+"listTypeContract");
  }
  getListTop10Contract(): Observable<any> {
    return this.httpClient.get<any>(this.URL + "listTop10");
  }

  getInfo(id: string): Observable<Contract> {
    return this.httpClient.get<Contract>(this.URL + "info/" + id);
  }

  searchContractListTop10(key: string): Observable<any> {
    return this.httpClient.get<any>(this.URL_SEARCH_TOP10 + key);
  }

  deleteListTop10(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL + "delete/" + id);
  }

  editContract(contract: ContractEdit): Observable<ContractEdit> {
    return this.httpClient.put<ContractEdit>(this.URL + 'edit',contract);

  private APIUpdateStatusContractPawn: string = "http://localhost:8080/contract/update-status-contract";
  private APICreateLiquidationContract: string = "http://localhost:8080/contract/create-liquidation-contract";
  private APIGetProductList: string = "http://localhost:8080/contract/get-liquidation-product-list";
  private APIGetCustomerList: string = "http://localhost:8080/customer/getCustomerList";
  private APIGetEmployeeList: string = "http://localhost:8080/employee/getEmployeeList";
  private APISearchLiquidationProduct: string = "http://localhost:8080/contract/search-liquidation-product";
  private APISearchCustomer: string = "http://localhost:8080/customer/searchCustomer";
  private APISearchEmployee: string = "http://localhost:8080/employee/searchEmployee";
  private APIProductList: string = "http://localhost:8080/contract/getListTypeProduct";

  

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
