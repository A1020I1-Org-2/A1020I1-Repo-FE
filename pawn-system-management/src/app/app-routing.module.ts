import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmployeeComponent} from "./employee/list-employee/list-employee.component";
import {EmployeepRoutingModule} from "./employee/employee-routing.module";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), EmployeepRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
