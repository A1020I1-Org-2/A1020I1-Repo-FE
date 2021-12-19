import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Register} from "./Register";
import {PawnType} from "./homepage/PawnType";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL = 'http://localhost:8080/home';

  constructor(private httpClient: HttpClient) { }

  create(register: Register): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/create', register);
  }

  getAllType(): Observable<PawnType[]>{
    return this.httpClient.get<PawnType[]>(this.API_URL + '/types');
  }

}
