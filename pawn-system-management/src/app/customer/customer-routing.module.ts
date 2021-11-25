import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCustomerComponent} from "./list-customer/list-customer.component";

const routes: Routes = [
  { path: 'customer/listCustomer', component: ListCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
