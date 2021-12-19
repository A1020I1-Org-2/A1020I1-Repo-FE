import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EditInfomationEmmployeeComponent} from "./edit-infomation-emmployee/edit-infomation-emmployee.component";
import {ViewEmployeeComponent} from "./view-employee/view-employee.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {path: "create", canActivate: [AuthGuard], component: CreateEmployeeComponent},
  {path: "employee", canActivate: [AuthGuard], component: ListEmployeeComponent},
  {path: "viewEmployee/:id", canActivate: [AuthGuard], component: EditInfomationEmmployeeComponent},
  {path: "view-employee", canActivate: [AuthGuard], component: ViewEmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class EmployeeRoutingModule { }
