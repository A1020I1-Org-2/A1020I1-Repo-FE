import { Injectable } from '@angular/core';
import {Contract} from "../interface/contract";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract!: Contract[];
  private API = "http://localhost:8080/contract";
  private API_SEARCH = "http://localhost:8080/contract/search";
  constructor(private http: HttpClient) { }

  getAllContract(): Observable<any>{
    return this.http.get<any>(this.API + '/listContract')
  }
  getPageList(pageNum: number): Observable<any>{
    return this.http.get<any>(this.API + '/listContract?page=' +pageNum);

  }
  getInfo(id: string): Observable<any>{
    return this.http.get<any>(this.API + '/detail/' + id)
  }
  deleteContract(id: string): Observable<Contract>{
    return this.http.delete<Contract>(this.API + '/delete/' + id)
  }
  searchContract(customer: string, productName: string,  statusContract: string, typeContract: string, startDateFrom: string,
                 endDateTo: string): Observable<any>{
    return this.http.get<any>(this.API_SEARCH + '?customer=' + customer + '&productName=' + productName + '&statusContract='
      + statusContract + '&typeContract=' + typeContract + '&startDateFrom=' + startDateFrom + '&endDateTo=' + endDateTo);
  }
  getPageSearch(pageNumber: number, customer: string, productName: string,  statusContract: string, typeContract: string, startDateFrom: string,
                endDateTo: string): Observable<any>{
    return this.http.get<any>(this.API_SEARCH +  '?page=' + pageNumber + '&customer=' + customer + '&productName=' + productName + '&statusContract='
      + statusContract + '&typeContract=' + typeContract + '&startDateFrom=' + startDateFrom + '&endDateTo=' + endDateTo);

  }
}
