import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatusContract} from "../interface/status-contract";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class StatusContractService {
  private API_STATUS = "http://localhost:8080/statusContract";
  constructor(private http: HttpClient, private loginService: LoginService) { }
  getAllStatusContract(): Observable<StatusContract[]>{
    return this.http.get<StatusContract[]>(this.API_STATUS + '/listStatusContract',{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    })
  }
}
