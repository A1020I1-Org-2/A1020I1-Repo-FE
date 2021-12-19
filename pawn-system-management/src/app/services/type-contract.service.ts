import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeContract} from "../interface/type-contract";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class TypeContractService {
  private API_TYPE_CONTRACT = "http://localhost:8080/typeContract";
  constructor(private http: HttpClient, private loginService: LoginService) { }
  getAllTypeContract(): Observable<TypeContract[]>{
    return this.http.get<TypeContract[]>(this.API_TYPE_CONTRACT + '/listTypeContract',{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }
}
