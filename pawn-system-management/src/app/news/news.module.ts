import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNewsComponent } from './list-news/list-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';



@NgModule({
  declarations: [
    ListNewsComponent,
    CreateNewsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewsModule { }
