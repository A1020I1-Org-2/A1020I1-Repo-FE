import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../interface/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API = "http://localhost:8080/customer";

  constructor(private http: HttpClient) { }
  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.API + '/listCustomer')
  }
}
