
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ContractModule} from "./contract/contract.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PawnModule} from "./pawn/pawn.module";
import {ToastrModule} from "ngx-toastr";



import {MaterialModule} from "./material-module";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";




@NgModule({
  declarations: [
    AppComponent
  ],

    imports: [
      BrowserModule,
      AppRoutingModule,
      PawnModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule,
      ContractModule,
      HttpClientModule,
      MatDialogModule,
      BrowserAnimationsModule,
      MaterialModule,
      MatDividerModule,
      MatButtonModule,
      MatIconModule,
      ToastrModule.forRoot(),
    ],




  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

