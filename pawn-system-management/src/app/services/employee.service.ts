import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API = "http://localhost:8080/employee/"
  constructor(private _httpClient:HttpClient) { }

  getListEmployee(page:number):Observable<any>{
    return this._httpClient.get<any>(this.API+"getEmployeeList?page="+page);
  }

  searchEmployee(searchValue:string,page:number):Observable<any>{
    return this._httpClient.get<any>(this.API+"/searchEmployee?searchValue="+searchValue+"&page="+page);
  }
}
