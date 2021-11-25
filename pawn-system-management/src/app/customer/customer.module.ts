import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';



@NgModule({
  declarations: [
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ListCustomerComponent,
    DeleteCustomerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
