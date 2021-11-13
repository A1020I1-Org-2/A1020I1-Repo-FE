import {Injectable} from '@angular/core';
import {Contract} from "../interface/contract";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  contract!: Contract[];
  readonly URL = "http://localhost:8080/contract/";
  readonly URL_SEARCH_TOP10 = "http://localhost:8080/contract/listTop10/search?key=";

  constructor(private httpClient: HttpClient) {
  }

  getListTop10Contract(): Observable<any> {
    return this.httpClient.get<any>(this.URL + "listTop10");
  }

  getInfo(id: string): Observable<any> {
    return this.httpClient.get<any>(this.URL + "info/" + id);
  }

  searchContractListTop10(key: string): Observable<any> {
    return this.httpClient.get<any>(this.URL_SEARCH_TOP10 + key);
  }

  deleteListTop10(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL + "delete/" + id);
  }
}
