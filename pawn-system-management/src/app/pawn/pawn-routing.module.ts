import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPawnComponent} from "./list-pawn/list-pawn.component";
import {ShowFinanceComponent} from "../finance/show-finance/show-finance.component";
import {ReturnPawnComponent} from "./return-pawn/return-pawn.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {path:'pawn-list', canActivate: [AuthGuard],component: ListPawnComponent},
  {path:'show-finance', canActivate: [AuthGuard],component: ShowFinanceComponent},
  {path:'return-pawn', canActivate: [AuthGuard],component: ReturnPawnComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PawnRoutingModule { }
