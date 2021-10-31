import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditInfomationEmmployeeComponent } from './edit-infomation-emmployee/edit-infomation-emmployee.component';



@NgModule({
  declarations: [
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ListEmployeeComponent,
    ViewEmployeeComponent,
    DeleteEmployeeComponent,
    EditInfomationEmmployeeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
