import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateLiquidationContractComponentComponent} from "./create-liquidation-contract-component/create-liquidation-contract-component.component";

const routes: Routes = [
  {path: 'create-liquidation-contract', component:CreateLiquidationContractComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
