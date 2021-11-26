import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployee} from "../employee/IEmployee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  URL = "http://localhost:8080/employee/";

  getAll(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  finById(id:string):Observable<IEmployee>{
    return this.http.get<IEmployee>(this.URL+'viewEmployee/'+id);
  }

  delete(id:string):Observable<IEmployee>{
    return this.http.delete<IEmployee>(this.URL+'delete/'+id);
  }

  search(key:String):Observable<any>{
    return this.http.get<any>(this.URL+"/search?key="+key);
  }

  getPage(key:number):Observable<any>{
    const url = `${this.URL}?page=${key}`;
    return this.http.get<any>(url);
  }

  create(employee:IEmployee):Observable<any>{
    return this.http.post<any>(this.URL + 'createEmployee', employee);
  }

  update(employee:IEmployee, id:string):Observable<any>{
    return this.http.put<any>(this.URL + 'updateEmployee/'+id, employee);
  }
}
