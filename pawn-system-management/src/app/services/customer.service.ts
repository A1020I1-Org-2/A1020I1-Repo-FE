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
    return this.httpClient.delete<any>(this.API_URL +'/deleteCustomer/'+id,this.httpOptions);
  }

  searchCustomer(page: number, user_name: string,status: number, address: string, dateBirthFrom: string, dateBirthTo: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/searchCustomer' + '?page=' + page + '&username=' + user_name+ '&status=' + status + '&address=' + address
      + '&dateBirthFrom=' + dateBirthFrom + '&dateBirthTo=' + dateBirthTo ,this.httpOptions);
  }


}
