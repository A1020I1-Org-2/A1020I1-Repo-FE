import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogMessage, LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {LoginRoutingModule} from "./login-routing.module";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    LoginComponent,
    DialogMessage,
    ChangePasswordComponent,
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    LoginRoutingModule,
    RouterModule,
    MatButtonModule
  ]
})
export class LoginModule { }
