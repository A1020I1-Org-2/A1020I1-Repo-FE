import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerRoutingModule} from "./customer/customer-routing.module";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomerRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
