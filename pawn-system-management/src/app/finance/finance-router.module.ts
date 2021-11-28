import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowFinanceComponent} from "./show-finance/show-finance.component";
import {RouterModule, Routes} from "@angular/router";
import {ListPawnComponent} from "../pawn/list-pawn/list-pawn.component";

const routers: Routes = [
  {path: 'show-finance', component: ShowFinanceComponent},
  {path: 'pawn-list', component: ListPawnComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ]
})
export class FinanceRouterModule { }
