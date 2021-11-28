import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {
  private API_TYPE_PRODUCT = "http://localhost:8080/typeProduct";
  private baseURL = 'http://localhost:8080/pawn/typeProductList';
  constructor(private http: HttpClient) { }
  getAllTypeProduct(): Observable<any> {
    return this.http.get<any>(this.API_TYPE_PRODUCT)
  }

  findAllTypeProduct(): Observable<any>{
    return this.http.get<any>(this.baseURL);
  }
}
