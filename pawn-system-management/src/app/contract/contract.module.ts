import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePawnContractComponent} from './create-pawn-contract/create-pawn-contract.component';
import {UpdateContractComponent} from './update-contract/update-contract.component';
import {ListTop10ContractComponent} from './list-top10-contract/list-top10-contract.component';
import {ListContractComponent} from './list-contract/list-contract.component';
import {DeleteContractComponent} from './delete-contract/delete-contract.component';
import {DetailContractComponent} from './detail-contract/detail-contract.component';
import {CreateLiquidationContractComponentComponent} from './create-liquidation-contract-component/create-liquidation-contract-component.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {ReactiveFormsModule} from "@angular/forms";


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
    CreatePawnContractComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ]
})
export class ContractModule {
}
