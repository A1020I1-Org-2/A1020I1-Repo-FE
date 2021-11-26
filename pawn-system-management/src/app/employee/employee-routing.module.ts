import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EditInfomationEmmployeeComponent} from "./edit-infomation-emmployee/edit-infomation-emmployee.component";

const routes: Routes = [
  {path: "create", component: CreateEmployeeComponent},
  {path: "employee", component: ListEmployeeComponent},
  {path: "viewEmployee/:id", component: EditInfomationEmmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeepRoutingModule { }
