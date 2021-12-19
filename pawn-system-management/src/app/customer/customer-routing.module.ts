import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCustomerComponent} from "./list-customer/list-customer.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  { path: 'customer/list-customer', canActivate: [AuthGuard], component: ListCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CustomerRoutingModule { }
