import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTop10ContractComponent} from "./contract/list-top10-contract/list-top10-contract.component";

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
