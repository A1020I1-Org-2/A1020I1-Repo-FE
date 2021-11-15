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

  getPageList(pageNum: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/listCustomer?page=' + pageNum, this.httpOptions);
  }


  deleteCustomer(id: number | undefined): Observable<any> {
    return this.httpClient.delete<any>(this.API_URL +'/deleteCustomer/'+ id, this.httpOptions);
  }

  getCustomerById(id: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/getCustomer/' + id, this.httpOptions);
  }

  searchCustomer(customerId: string, dateOfBirthFrom: string, dateOfBirthTo: string, address: string, name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/searchCustomer?' + 'customerId=' + customerId + '&dateOfBirthForm=' +
      dateOfBirthFrom + '&dateOfBirthTo=' + dateOfBirthTo + '&address=' + address + '&name=' + name, this.httpOptions);
  }

  searchPageCustomer(customerId: string, dateOfBirthFrom: string, dateOfBirthTo: string, address: string, name: string, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/searchCustomer?' + 'customerId=' + customerId + '&dateOfBirthForm=' +
      dateOfBirthFrom + '&dateOfBirthTo=' + dateOfBirthTo + '&address=' + address + '&name=' + name + '&page=' + page, this.httpOptions);
  }

}
