import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPawnComponent } from './list-pawn/list-pawn.component';
import { DetailPawnComponent } from './detail-pawn/detail-pawn.component';
import {DialogListContract, ReturnPawnComponent} from './return-pawn/return-pawn.component';
import {PawnRoutingModule} from "./pawn-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material-module";



@NgModule({
  declarations: [
    ListPawnComponent,
    DetailPawnComponent,
    ReturnPawnComponent,
    DialogListContract
  ],
  imports: [
    CommonModule,
    PawnRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PawnModule { }
