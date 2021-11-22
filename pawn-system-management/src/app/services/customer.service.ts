import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL = 'http://localhost:8080/customer';
  httpOptions: any;
  constructor(private httpClient: HttpClient) { }

  getListCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/listCustomer', this.httpOptions);
  }

  deleteCustomer(id: number | undefined): Observable<any> {
    return this.httpClient.delete<any>(this.API_URL +'/deleteCustomer/'+ id, this.httpOptions);
  }

  searchCustomer(dateOfBirthFrom: string, dateOfBirthTo: string, address: string, name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/searchCustomer?dateOfBirthFrom=' + dateOfBirthFrom +
      '&dateOfBirthTo=' + dateOfBirthTo + '&address=' + address + '&name=' + name + '&page=0');
  }

  searchPageCustomer(dateOfBirthFrom: string, dateOfBirthTo: string, address: string, name: string, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/searchCustomer?dateOfBirthFrom=' + dateOfBirthFrom +
      '&dateOfBirthTo=' + dateOfBirthTo + '&address=' + address + '&name=' + name + '&page=' + page);
  }
}
