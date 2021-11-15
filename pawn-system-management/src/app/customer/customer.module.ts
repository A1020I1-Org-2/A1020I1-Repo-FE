import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import {CustomerRoutingModule} from "./customer-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ListCustomerComponent,
    DeleteCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
  ],
  entryComponents:[DeleteCustomerComponent]
})
export class CustomerModule { }
