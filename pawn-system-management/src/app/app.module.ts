import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import {CustomerModule} from "./customer/customer.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "./customer/delete-customer/delete-customer.component";
import {ToastrModule} from "ngx-toastr";
import {HomepageModule} from "./homepage/homepage.module";
import {AppRoutingModule} from "./app-routing.module";
import {StatisticModule} from "./statistic/statistic.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      LoginModule,
      CustomerModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      MatDialogModule,
      HomepageModule,
      StatisticModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DeleteCustomerComponent]
})
export class AppModule { }
