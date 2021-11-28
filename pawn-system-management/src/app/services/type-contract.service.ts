import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeContract} from "../interface/type-contract";

@Injectable({
  providedIn: 'root'
})
export class TypeContractService {
  private API_TYPE_CONTRACT = "http://localhost:8080/typeContract";
  constructor(private http: HttpClient) { }
  getAllTypeContract(): Observable<TypeContract[]>{
    return this.http.get<TypeContract[]>(this.API_TYPE_CONTRACT + '/listTypeContract')
  }
}
