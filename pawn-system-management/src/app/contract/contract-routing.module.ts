import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListContractComponent} from "./list-contract/list-contract.component";
import {CommonModule} from "@angular/common";

const routesContract: Routes = [
  {path: 'listContract',component: ListContractComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesContract)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
