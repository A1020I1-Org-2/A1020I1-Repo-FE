import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class PawnService {
  httpOptions: any;
  public API: string = "http://localhost:8080/pawn";
  constructor(private http: HttpClient, private loginService: LoginService) {
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
    return this.http.get<any>(this.API + '/pawnList',{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
  // getAllPawn(): Observable<any>{
  //   return this.http.get<any>(this.API + '/pawnList',this.httpOptions);
  // }
  getPawnById(id: String): Observable<any>{
    return this.http.get<any>(this.API+'/pawnView/' + id,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getSearchPawn(search: string, typeSearch: string,page: number): Observable<any> {
    return this.http.get<any>(this.API + '/pawnSearch?search=' + search +'&typeSearch=' +typeSearch  +'&page=' + page,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  searchPawn(search: string, typeSearch: string): Observable<any> {
    return this.http.get<any>(this.API + '/pawnSearch?search=' + search +'&typeSearch=' +typeSearch,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    } );
  }
}
