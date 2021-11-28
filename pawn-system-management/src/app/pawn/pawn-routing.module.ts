import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPawnComponent} from "./list-pawn/list-pawn.component";
import {ShowFinanceComponent} from "../finance/show-finance/show-finance.component";
import {ReturnPawnComponent} from "./return-pawn/return-pawn.component";

const routes: Routes = [
  {path:'pawn-list',component: ListPawnComponent},
  {path:'show-finance',component: ShowFinanceComponent},
  {path:'return-pawn',component: ReturnPawnComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PawnRoutingModule { }
