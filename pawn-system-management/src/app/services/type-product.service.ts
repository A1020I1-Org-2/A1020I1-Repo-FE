import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {
  private baseURL = 'http://localhost:8080/pawn/typeProductList';
  constructor(private http: HttpClient) { }

  findAllTypeProduct(): Observable<any>{
    return this.http.get<any>(this.baseURL);
  }
}
