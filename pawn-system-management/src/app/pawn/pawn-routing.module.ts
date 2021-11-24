import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPawnComponent} from "./list-pawn/list-pawn.component";
import {ShowFinanceComponent} from "../finance/show-finance/show-finance.component";

const routes: Routes = [
  {path:'pawnList',component: ListPawnComponent},
  {path:'showFinance',component: ShowFinanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PawnRoutingModule { }
