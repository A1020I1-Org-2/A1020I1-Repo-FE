import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployee} from "../employee/IEmployee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL: string = "http://localhost:8080/employee/";
  isCreate: string = '';
  isUpdate: string = '';
  isDelete: string = '';

  constructor(private http:HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  finById(id:string):Observable<IEmployee>{
    return this.http.get<IEmployee>(this.URL+'view-employee/'+id);
  }

  delete(id:string):Observable<IEmployee>{
    return this.http.delete<IEmployee>(this.URL+'delete/'+id);
  }

  search(key:String):Observable<any>{
    return this.http.get<any>(this.URL+"search?key="+key);
  }

  getPage(page:number, keyword: string):Observable<any>{
    return this.http.get<any>(this.URL+"search?key="+keyword+'&page='+page);
  }

  create(employee:IEmployee):Observable<any>{
    return this.http.post<any>(this.URL + 'create-employee', employee);
  }

  update(employee:IEmployee):Observable<any>{
    return this.http.put<any>(this.URL + 'update-employee', employee);
  }

  deleteAll(): Observable<any>{
    return this.http.delete<any>(this.URL + 'delete-all');
  }
}
