import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTop10ContractComponent} from "./list-top10-contract/list-top10-contract.component";

const routes: Routes = [
  {path: 'listTop10Contract', component: ListTop10ContractComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
