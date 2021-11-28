import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListContractComponent} from "./list-contract/list-contract.component";
import {CommonModule} from "@angular/common";


import {ListTop10ContractComponent} from "./list-top10-contract/list-top10-contract.component";
import {UpdateContractComponent} from "./update-contract/update-contract.component";
import {CreateLiquidationContractComponentComponent} from "./create-liquidation-contract-component/create-liquidation-contract-component.component";
import {CreatePawnContractComponent} from "./create-pawn-contract/create-pawn-contract.component";

const routes: Routes = [
  {path: 'list-top-10-contract', component: ListTop10ContractComponent},
  {path: 'list-contract',component: ListContractComponent},
  {path: 'edit-contract', component: UpdateContractComponent},
  {path: 'create-liquidation-contract', component:CreateLiquidationContractComponentComponent},
  {path:'create-pawn',component:CreatePawnContractComponent}
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
