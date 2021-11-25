import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomepageModule { }
