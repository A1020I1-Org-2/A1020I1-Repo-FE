import {Injectable} from '@angular/core';
import {Contract} from "../interface/contract";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeProduct} from "../interface/type-product";
import {StatusContract} from "../interface/status-contract";
import {TypeContract} from "../interface/type-contract";
import {ContractEdit} from "../interface/ContractEdit";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  contract!: Contract[];
  readonly URL = "http://localhost:8080/contract/";
  readonly URL_SEARCH_TOP10 = "http://localhost:8080/contract/listTop10/search?key=";

  constructor(private httpClient: HttpClient) {
  }
  getListTypeProduct():Observable<TypeProduct[]>{
    return this.httpClient.get<TypeProduct[]>(this.URL+ "listTypeProduct");
  }
  getListStatusContract():Observable<StatusContract[]>{
    return this.httpClient.get<StatusContract[]>(this.URL +"listStatusContract");
  }
  getListTypeContract():Observable<TypeContract[]>{
    return this.httpClient.get<TypeContract[]>(this.URL+"listTypeContract");
  }
  getListTop10Contract(): Observable<any> {
    return this.httpClient.get<any>(this.URL + "listTop10");
  }

  getInfo(id: string): Observable<Contract> {
    return this.httpClient.get<Contract>(this.URL + "info/" + id);
  }

  searchContractListTop10(key: string): Observable<any> {
    return this.httpClient.get<any>(this.URL_SEARCH_TOP10 + key);
  }

  deleteListTop10(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL + "delete/" + id);
  }

  editContract(contract: ContractEdit): Observable<ContractEdit> {
    return this.httpClient.put<ContractEdit>(this.URL + 'edit',contract);
  }
}
