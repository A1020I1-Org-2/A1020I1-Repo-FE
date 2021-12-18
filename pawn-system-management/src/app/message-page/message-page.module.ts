import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './message-page/message-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {HomepageModule} from "../homepage/homepage.module";



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
        AngularFireModule.initializeApp(environment.firebaseConfigThanhNHM),
        RouterModule.forRoot([
            {path: "chat", component: MessagePageComponent}
        ]),
        HomepageModule
    ]
})
export class MessagePageModule { }
