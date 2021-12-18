import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import {DialogDeleteAll, ListEmployeeComponent} from './list-employee/list-employee.component';
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
import {EmployeeRoutingModule} from "./employee-routing.module";
import {HomepageModule} from "../homepage/homepage.module";



// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  declarations: [
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ListEmployeeComponent,
    ViewEmployeeComponent,
    DeleteEmployeeComponent,
    EditInfomationEmmployeeComponent,
    DialogDeleteAll
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
        MatButtonModule,
        EmployeeRoutingModule,
        HomepageModule
    ]
})
export class EmployeeModule { }
