import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShowFinanceComponent} from "./show-finance/show-finance.component";

const routes: Routes = [
  {path: "finance", component: ShowFinanceComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FinanceRoutingModule { }
