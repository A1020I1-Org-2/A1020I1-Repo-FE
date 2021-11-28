import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private baseURL = 'http://localhost:8080/finance/financeView';
  constructor(private http: HttpClient) { }

  findAllFinance(): Observable<any>{
    return this.http.get<any>(this.baseURL);
  }
}
