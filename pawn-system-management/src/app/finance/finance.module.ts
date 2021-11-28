import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFinanceComponent } from './show-finance/show-finance.component';



@NgModule({
    declarations: [
        ShowFinanceComponent
    ],
    exports: [
        ShowFinanceComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FinanceModule { }
