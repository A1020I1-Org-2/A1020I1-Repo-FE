import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditInfomationEmmployeeComponent } from './edit-infomation-emmployee/edit-infomation-emmployee.component';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";



// noinspection AngularInvalidImportedOrDeclaredSymbol
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
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
  ]
})
export class EmployeeModule { }
