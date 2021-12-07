import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './message-page/message-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";



@NgModule({
  declarations: [
    MessagePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfigNhanNH),
    RouterModule.forRoot([
      {path: "chat", component: MessagePageComponent}
    ])
  ]
})
export class MessagePageModule { }
