import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DatePipe} from "@angular/common";
import {StatisticModule} from "./statistic/statistic.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StatisticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
