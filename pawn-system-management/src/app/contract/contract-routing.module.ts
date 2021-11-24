import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListContractComponent} from "./list-contract/list-contract.component";
import {CommonModule} from "@angular/common";


import {ListTop10ContractComponent} from "./list-top10-contract/list-top10-contract.component";
import {UpdateContractComponent} from "./update-contract/update-contract.component";
import {CreateLiquidationContractComponentComponent} from "./create-liquidation-contract-component/create-liquidation-contract-component.component";


const routes: Routes = [
  {path: 'listTop10Contract', component: ListTop10ContractComponent}, 
  {path: 'listContract',component: ListContractComponent},
  {path: 'editContract', component: UpdateContractComponent},
  {path: 'create-liquidation-contract', component:CreateLiquidationContractComponentComponent}





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesContract)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
