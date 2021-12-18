import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFinanceComponent } from './show-finance/show-finance.component';
import {RouterModule} from "@angular/router";
import {FinanceRouterModule} from "./finance-router.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HomepageModule} from "../homepage/homepage.module";

@NgModule({
  declarations: [
    ShowFinanceComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FinanceRouterModule,
        ReactiveFormsModule,
        HomepageModule
    ]
})
export class FinanceModule { }
