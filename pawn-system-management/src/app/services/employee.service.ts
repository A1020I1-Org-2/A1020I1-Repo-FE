import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployee} from "../employee/IEmployee";
import {LoginService} from "./login.service";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL: string = "http://localhost:8080/employee/";
  isCreate: string = '';
  isUpdate: string = '';
  isDelete: string = '';

  constructor(private http:HttpClient,
              private loginService: LoginService) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.URL,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  finById(id:string):Observable<IEmployee>{
    return this.http.get<IEmployee>(this.URL+'view-employee/'+id,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  delete(id:string):Observable<IEmployee>{
    return this.http.delete<IEmployee>(this.URL+'delete/'+id,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  search(key:String):Observable<any>{
    return this.http.get<any>(this.URL+"search?key="+key,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getPage(page:number, keyword: string):Observable<any>{
    return this.http.get<any>(this.URL+"search?key="+keyword+'&page='+page,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  create(employee:IEmployee):Observable<any>{
    return this.http.post<any>(this.URL + 'create-employee', employee,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  update(employee:IEmployee):Observable<any>{
    return this.http.put<any>(this.URL + 'update-employee', employee,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.URL + 'delete-all',{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getListEmployee(page:number):Observable<any>{
    return this.http.get<any>(this.URL+"getEmployeeList?page="+page,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  searchEmployee(searchValue:string,page:number):Observable<any>{
    return this.http.get<any>(this.URL+"searchEmployee?searchValue="+searchValue+"&page="+page,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  findByAccount(username: string): Observable<any>{
    return this.http.get(this.URL + 'find-by-account?username=' + username,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  // ThanhNHM
  getAllEmployee(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.URL+"get-all-employee",{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  existIdCard(idCard: string): Observable<any> {
    return this.http.get<any>(this.URL+'exist-id-card' + '?idCard='+idCard,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }
}
