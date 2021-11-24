import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePawnContractComponent } from './create-pawn-contract/create-pawn-contract.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';
import { ListTop10ContractComponent } from './list-top10-contract/list-top10-contract.component';
import { ListContractComponent } from './list-contract/list-contract.component';
import { DeleteContractComponent } from './delete-contract/delete-contract.component';
import { CreateLiquidationContractComponentComponent } from './create-liquidation-contract-component/create-liquidation-contract-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {ContractRoutingModule} from "./contract-routing.module";



@NgModule({
    declarations: [
        CreatePawnContractComponent,
        UpdateContractComponent,
        ListTop10ContractComponent,
        ListContractComponent,
        DeleteContractComponent,
        CreateLiquidationContractComponentComponent,

    ],
    exports: [
      ListContractComponent,
      DeleteContractComponent,
      ContractRoutingModule,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class ContractModule { }
