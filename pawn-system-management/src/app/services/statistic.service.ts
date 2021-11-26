import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private API = 'http://localhost:8080/statistical';

  constructor(public httpClient: HttpClient) {
  }


  getStatisticInterest(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(this.API + '/statisticInterest?start=' + startDate + '&end=' + endDate);
  }

  getStatisticExpected(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(this.API + '/statisticExpected?start=' + startDate + '&end=' + endDate);
  }

  getStatisticLiquidation(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(this.API + '/statisticLiquidation?start=' + startDate + '&end=' + endDate);
  }
}
