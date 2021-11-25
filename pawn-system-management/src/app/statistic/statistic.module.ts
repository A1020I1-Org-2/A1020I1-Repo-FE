import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticInterestComponent } from './statistic-interest/statistic-interest.component';
import { StatisticLiquidationComponent } from './statistic-liquidation/statistic-liquidation.component';
import { StatisticExpectedComponent } from './statistic-expected/statistic-expected.component';



@NgModule({
  declarations: [
    StatisticInterestComponent,
    StatisticLiquidationComponent,
    StatisticExpectedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StatisticModule { }
