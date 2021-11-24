import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PawnService {
  httpOptions: any;
  public API: string = "http://localhost:8080/pawn";
  constructor(private http: HttpClient) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer` + this.tokenStorage.getToken(),
    //     'Access-Control-Allow-Origin': 'http://localhost:4200',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //   }),
    // };
  }
  getAllPawn(): Observable<any>{
    return this.http.get<any>(this.API + '/pawnList');
  }
  // getAllPawn(): Observable<any>{
  //   return this.http.get<any>(this.API + '/pawnList',this.httpOptions);
  // }
  getPawnById(id: String): Observable<any>{
    return this.http.get<any>(this.API+'/pawnView/' + id);
  }
  getSearchPawn(search: string, typeSearch: string,page: number): Observable<any> {
    return this.http.get<any>(this.API + '/pawnSearch?search=' + search +'&typeSearch=' +typeSearch  +'&page=' + page);
  }
  searchPawn(search: string, typeSearch: string): Observable<any> {
    return this.http.get<any>(this.API + '/pawnSearch?search=' + search +'&typeSearch=' +typeSearch );
  }
}
