import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatisticRoutingModule} from "./statistic/statistic-routing.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,StatisticRoutingModule,
  HttpClientModule]
})
export class AppRoutingModule { }
