import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CustomerModule} from "./customer/customer.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MatDialogModule} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "./customer/delete-customer/delete-customer.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomerModule,
    ToastrModule.forRoot(),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DeleteCustomerComponent]
})
export class AppModule { }
