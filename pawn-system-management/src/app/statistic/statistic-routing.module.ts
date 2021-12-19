import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StatisticLiquidationComponent} from './statistic-liquidation/statistic-liquidation.component';
import {StatisticInterestComponent} from './statistic-interest/statistic-interest.component';
import {StatisticExpectedComponent} from './statistic-expected/statistic-expected.component';
import {AuthGuard} from "../services/auth.guard";
const routes: Routes = [
  {
    path: 'statistic-liquidation', canActivate: [AuthGuard],
    component: StatisticLiquidationComponent
  },
  {
    path: 'statistic-interest', canActivate: [AuthGuard],
    component: StatisticInterestComponent
  },
  {
    path: 'statistic-expected', canActivate: [AuthGuard],
    component: StatisticExpectedComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [AuthGuard]
})
export class StatisticRoutingModule { }
