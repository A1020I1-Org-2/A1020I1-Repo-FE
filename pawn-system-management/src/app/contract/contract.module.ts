import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePawnContractComponent} from './create-pawn-contract/create-pawn-contract.component';
import {UpdateContractComponent} from './update-contract/update-contract.component';
import {ListTop10ContractComponent} from './list-top10-contract/list-top10-contract.component';
import {ListContractComponent} from './list-contract/list-contract.component';
import {DeleteContractComponent} from './delete-contract/delete-contract.component';
import {DetailContractComponent} from './detail-contract/detail-contract.component';
import {ContractRoutingModule} from "./contract-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DeleteListTop10ContractComponent} from './delete-list-top10-contract/delete-list-top10-contract.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EditListTop10Component} from './edit-list-top10/edit-list-top10.component';
import {MatButtonModule} from "@angular/material/button";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";


@NgModule({
  declarations: [
    CreatePawnContractComponent,
    UpdateContractComponent,
    ListTop10ContractComponent,
    ListContractComponent,
    DeleteContractComponent,
    DetailContractComponent,
    DeleteListTop10ContractComponent,
    EditListTop10Component,


  ],
  exports: [
    UpdateContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    NgxTrimDirectiveModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ContractModule {
}
