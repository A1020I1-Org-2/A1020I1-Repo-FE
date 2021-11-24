import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFinanceComponent } from './show-finance/show-finance.component';
import {RouterModule} from "@angular/router";
import {FinanceRouterModule} from "./finance-router.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ShowFinanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FinanceRouterModule,
    ReactiveFormsModule
  ]
})
export class FinanceModule { }
