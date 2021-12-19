import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthGuard]
})
export class LoginRoutingModule { }
