import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {PageNotFoundRoutingModule} from "./page-not-found-routing.module";
import {RouterModule} from "@angular/router";
import {HomepageModule} from "../homepage/homepage.module";



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
    imports: [
        CommonModule,
        PageNotFoundRoutingModule,
        RouterModule,
        HomepageModule
    ]
})
export class PageNotFoundModule { }