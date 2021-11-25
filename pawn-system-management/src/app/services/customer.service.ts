import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API = "http://localhost:8080/customer/";

  constructor(private _httpClient:HttpClient) { }

  getListCustomer(page:number):Observable<any>{
    return this._httpClient.get<any>(this.API+"getCustomerList?page="+page);
  }

  searchCustomer(searchValue:string,page:number):Observable<any>{
    return this._httpClient.get<any>(this.API+"/searchCustomer?searchValue="+searchValue+"&page="+page);
  }
}
