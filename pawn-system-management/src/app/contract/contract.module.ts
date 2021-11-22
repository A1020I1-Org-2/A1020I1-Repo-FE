import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePawnContractComponent} from './create-pawn-contract/create-pawn-contract.component';
import {UpdateContractComponent} from './update-contract/update-contract.component';
import {ListTop10ContractComponent} from './list-top10-contract/list-top10-contract.component';
import {ListContractComponent} from './list-contract/list-contract.component';
import {DeleteContractComponent} from './delete-contract/delete-contract.component';
import {DetailContractComponent} from './detail-contract/detail-contract.component';
import {CreateLiquidationContractComponentComponent} from './create-liquidation-contract-component/create-liquidation-contract-component.component';
import {ContractRoutingModule} from "./contract-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    CreatePawnContractComponent,
    UpdateContractComponent,
    ListTop10ContractComponent,
    ListContractComponent,
    DeleteContractComponent,
    DetailContractComponent,
    CreateLiquidationContractComponentComponent
  ],
  exports: [
    CreateLiquidationContractComponentComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()

  ]
})
export class ContractModule {
}
