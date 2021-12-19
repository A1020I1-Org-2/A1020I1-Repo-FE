import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private API = 'http://localhost:8080/statistical';

  constructor(public httpClient: HttpClient, private loginService: LoginService) {
  }


  getStatisticInterest(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(this.API + '/statisticInterest?start=' + startDate + '&end=' + endDate,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getStatisticExpected(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(this.API + '/statisticExpected?start=' + startDate + '&end=' + endDate,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }

  getStatisticLiquidation(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(this.API + '/statisticLiquidation?start=' + startDate + '&end=' + endDate,{
      headers: new HttpHeaders({'Authorization': this.loginService.getToken()})
    });
  }
}
