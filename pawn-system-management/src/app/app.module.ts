import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import {CustomerModule} from "./customer/customer.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "./customer/delete-customer/delete-customer.component";
import {ToastrModule} from "ngx-toastr";

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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DeleteCustomerComponent]
})
export class AppModule { }
