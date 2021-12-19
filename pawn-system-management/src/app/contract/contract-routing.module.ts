import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListContractComponent} from "./list-contract/list-contract.component";
import {CommonModule} from "@angular/common";


import {ListTop10ContractComponent} from "./list-top10-contract/list-top10-contract.component";
import {UpdateContractComponent} from "./update-contract/update-contract.component";
import {CreateLiquidationContractComponentComponent} from "./create-liquidation-contract-component/create-liquidation-contract-component.component";
import {CreatePawnContractComponent} from "./create-pawn-contract/create-pawn-contract.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {path: 'list-top-10-contract', canActivate: [AuthGuard], component: ListTop10ContractComponent},
  {path: 'list-contract', canActivate: [AuthGuard],component: ListContractComponent},
  {path: 'edit-contract', canActivate: [AuthGuard], component: UpdateContractComponent},
  {path: 'create-liquidation-contract', canActivate: [AuthGuard], component:CreateLiquidationContractComponentComponent},
  {path:'create-pawn', canActivate: [AuthGuard],component:CreatePawnContractComponent}
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ContractRoutingModule { }
