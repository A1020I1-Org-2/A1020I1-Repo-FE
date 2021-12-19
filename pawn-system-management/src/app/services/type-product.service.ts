import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {
  private API_TYPE_PRODUCT = "http://localhost:8080/typeProduct";
  private baseURL = 'http://localhost:8080/pawn/typeProductList';
  constructor(private http: HttpClient, private loginService: LoginService) { }
  getAllTypeProduct(): Observable<any> {
    return this.http.get<any>(this.API_TYPE_PRODUCT,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }

  findAllTypeProduct(): Observable<any>{
    return this.http.get<any>(this.baseURL,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
}
