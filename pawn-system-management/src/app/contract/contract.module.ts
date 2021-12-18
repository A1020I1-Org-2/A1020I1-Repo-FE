
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
import {DeleteListTop10ContractComponent} from './delete-list-top10-contract/delete-list-top10-contract.component';
import {EditListTop10Component} from './edit-list-top10/edit-list-top10.component';
import {MatButtonModule} from "@angular/material/button";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule} from "ngx-toastr";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {HomepageModule} from "../homepage/homepage.module";




@NgModule({

    declarations: [
        CreatePawnContractComponent,
        UpdateContractComponent,
        ListTop10ContractComponent,
        ListContractComponent,
        DeleteContractComponent,
        CreateLiquidationContractComponentComponent,
        DeleteListTop10ContractComponent,
        EditListTop10Component,

    ],
    exports: [
      ListContractComponent,
      DeleteContractComponent,
      ContractRoutingModule,
      UpdateContractComponent,
      CreateLiquidationContractComponentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        ContractRoutingModule,
        NgxTrimDirectiveModule,
        MatButtonModule,
        AngularFireModule.initializeApp(environment.firebaseConfigNhanNH),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        ToastrModule.forRoot(),
        HomepageModule
    ]
})
export class ContractModule {
}
