import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private baseURL = 'http://localhost:8080/finance/financeView';
  constructor(private http: HttpClient,
              private loginService: LoginService) { }

  findAllFinance(): Observable<any>{
    return this.http.get<any>(this.baseURL,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
}
