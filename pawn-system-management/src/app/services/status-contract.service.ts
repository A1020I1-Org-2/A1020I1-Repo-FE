import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatusContract} from "../interface/status-contract";

@Injectable({
  providedIn: 'root'
})
export class StatusContractService {
  private API_STATUS = "http://localhost:8080/statusContract";
  constructor(private http: HttpClient) { }
  getAllStatusContract(): Observable<StatusContract[]>{
    return this.http.get<StatusContract[]>(this.API_STATUS + '/listStatusContract')
  }
}
