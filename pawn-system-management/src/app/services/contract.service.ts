
import {Injectable} from '@angular/core';

import {Contract} from "../interface/contract";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeProduct} from "../interface/type-product";
import {StatusContract} from "../interface/status-contract";
import {TypeContract} from "../interface/type-contract";
import {ContractEdit} from "../interface/ContractEdit";
import {ContractDTO} from "../model/ContractDTO";
import { ContractDto } from '../dto/contractDto';
import {FileUpload} from "../interface/FileUpload";
import {finalize} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LoginService} from "./login.service";



@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract: Contract | undefined = undefined ;

  private API = "http://localhost:8080/contract";
  private API_SEARCH = "http://localhost:8080/contract/search";
  readonly URL = "http://localhost:8080/contract/";
  readonly URL_SEARCH_TOP10 = "http://localhost:8080/contract/listTop10/search?key=";
  private APIUpdateStatusContractPawn: string = "http://localhost:8080/contract/update-status-contract";
  private APICreateLiquidationContract: string = "http://localhost:8080/contract/create-liquidation-contract";
  private APIGetProductList: string = "http://localhost:8080/contract/get-liquidation-product-list";
  private APIGetCustomerList: string = "http://localhost:8080/customer/getCustomerList";
  private APIGetEmployeeList: string = "http://localhost:8080/employee/getEmployeeList";
  private APISearchLiquidationProduct: string = "http://localhost:8080/contract/search-liquidation-product";
  private APISearchCustomer: string = "http://localhost:8080/customer/searchCustomer";
  private APISearchEmployee: string = "http://localhost:8080/employee/searchEmployee";
  private APIProductList: string = "http://localhost:8080/contract/getListTypeProduct";
  private APIContractOpen: string = "http://localhost:8080/contract/get-list-contract-open";
  private APIPaymentContract: string = "http://localhost:8080/contract/payment-contract";
  private basePath = '/imgPawn';
  private readonly API_TYPE_PRODUCT = "http://localhost:8080/typeProduct/listTypeProduct";

  constructor(private httpClient: HttpClient,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage,
              private loginService: LoginService) {
  }
  //hòa code
  getAllContract(): Observable<any>{
    return this.httpClient.get<any>(this.API + '/listContract',{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }

  getPageList(pageNum: number): Observable<any>{
    return this.httpClient.get<any>(this.API + '/listContract?page=' +pageNum,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  getInfo(id: string): Observable<any>{
    return this.httpClient.get<any>(this.API + '/detail/' + id,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  // getInfo(id: string): Observable<Contract> {
  //   return this.httpClient.get<Contract>(this.URL + "info/" + id);
  // }
  deleteContract(id: string): Observable<Contract>{
    return this.httpClient.delete<Contract>(this.API + '/delete/' + id,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }
  searchContract(customer: string, productName: string,  statusContract: string, typeContract: string, startDateFrom: string,
                 endDateTo: string): Observable<any>{
    return this.httpClient.get<any>(this.API_SEARCH + '?customer=' + customer + '&productName=' + productName + '&statusContract='
      + statusContract + '&typeContract=' + typeContract + '&startDateFrom=' + startDateFrom + '&endDateTo=' + endDateTo,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  getPageSearch(pageNumber: number, customer: string, productName: string,  statusContract: string, typeContract: string, startDateFrom: string,
                endDateTo: string): Observable<any> {
    return this.httpClient.get<any>(this.API_SEARCH + '?page=' + pageNumber + '&customer=' + customer + '&productName=' + productName + '&statusContract='
      + statusContract + '&typeContract=' + typeContract + '&startDateFrom=' + startDateFrom + '&endDateTo=' + endDateTo,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
//hòa //
//khánh code
  getListTypeProduct():Observable<TypeProduct[]>{
    return this.httpClient.get<TypeProduct[]>(this.URL+ "listTypeProduct",{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  getListStatusContract():Observable<StatusContract[]>{
    return this.httpClient.get<StatusContract[]>(this.URL +"listStatusContract",{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  getListTypeContract():Observable<TypeContract[]>{
    return this.httpClient.get<TypeContract[]>(this.URL+"listTypeContract",{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  getListTop10Contract(): Observable<any> {
    return this.httpClient.get<any>(this.URL + "listTop10",{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }



  searchContractListTop10(key: string): Observable<any> {
    return this.httpClient.get<any>(this.URL_SEARCH_TOP10 + key,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  deleteListTop10(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL + "delete/" + id,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  editContract(contract: ContractEdit): Observable<ContractEdit> {
    return this.httpClient.put<ContractEdit>(this.URL + 'edit', contract,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
//khánh//
  //mai code

  saveLiquidationContract(contract: ContractDTO): Observable<ContractDTO> {
    return this.httpClient.post<ContractDTO>(this.APICreateLiquidationContract, contract,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getLiquidationProductList(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetProductList)
  }

  getTypeProductList(): Observable<any> {
    return this.httpClient.get<any>(this.APIProductList,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }

  getCustomerList(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetCustomerList,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }

  getEmployeeList(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetEmployeeList,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }

  searchLiquidationProduct(productName: string, receiveMoney: string, name: string): Observable<any> {
    if(String(receiveMoney).match(/^[\d]*$/g) === null){
      receiveMoney = '0';
    }
    // console.log(String(receiveMoney).match(/^[\d]*$/g));
    // console.log(name);
    return this.httpClient.get<any>(this.APISearchLiquidationProduct +
      '?product_name=' + productName + '&receive_money=' + receiveMoney + '&name=' + name,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  searchCustomer(searchCus: string): Observable<any> {
    return this.httpClient.get<any>(this.APISearchCustomer + '?searchValue=' + searchCus)
  }

  searchEmployee(searchEm: string): Observable<any> {
    return this.httpClient.get<any>(this.APISearchEmployee + '?searchValue=' + searchEm)
  }

  getPageListCustomer(pageNum: number, searchName: string): Observable<any> {
    const url = this.APISearchCustomer + '?page=' + pageNum + '&searchValue=' + searchName;
    return this.httpClient.get<any>(url,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getPageListEmployee(pageNum: number, searchName: string): Observable<any> {
    const url = this.APISearchEmployee + '?page=' + pageNum + '&searchValue=' + searchName;
    return this.httpClient.get<any>(url,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getPageListProduct(pageNum: number, productName: string, receiveMoney: number, name: string): Observable<any> {
    const url = this.APISearchLiquidationProduct + '?page=' + pageNum + '&product_name=' + productName +
      '&receive_money=' + receiveMoney + '&name=' + name;
    return this.httpClient.get<any>(url,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  updateStatusContractPawn(contractID: string): Observable<any> {
    return this.httpClient.get<any>(this.APIUpdateStatusContractPawn + '?contractID=' + contractID,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });


  }
//mai//
  //nhân code
  saveNewContractPawn(contract:ContractDto):Observable<any>{
    return this.httpClient.post<any>(this.API+"/createPawn",contract,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<string> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return this.storage.ref(this.basePath + "/" + fileUpload.file.name).getDownloadURL();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getListContractOpen(keyword: string, page: number): Observable<any>{
    return this.httpClient.get<any>(this.APIContractOpen + "?page=" + page + "&keyword=" + keyword,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  paymentContract(contract: Contract): Observable<any>{
    return this.httpClient.post<any>(this.APIPaymentContract, contract,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }
}
