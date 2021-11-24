import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPawnComponent } from './list-pawn/list-pawn.component';
import { DetailPawnComponent } from './detail-pawn/detail-pawn.component';
import { ReturnPawnComponent } from './return-pawn/return-pawn.component';
import { ListContractComponent } from './list-contract/list-contract.component';
import {PawnRoutingModule} from "./pawn-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListPawnComponent,
    DetailPawnComponent,
    ReturnPawnComponent,
    ListContractComponent,
  ],
    imports: [
        CommonModule,
        PawnRoutingModule,
        ReactiveFormsModule
    ]
})
export class PawnModule { }
