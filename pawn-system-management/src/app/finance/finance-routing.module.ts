import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShowFinanceComponent} from "./show-finance/show-finance.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {path: "finance", canActivate: [AuthGuard], component: ShowFinanceComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [AuthGuard]
})
export class FinanceRoutingModule { }
