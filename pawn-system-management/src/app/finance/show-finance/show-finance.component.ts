import { Component, OnInit } from '@angular/core';
import {FinanceService} from "../../services/finance.service";
import {Finance} from "../../interface/finance";

@Component({
  selector: 'app-show-finance',
  templateUrl: './show-finance.component.html',
  styleUrls: ['./show-finance.component.css']
})
export class ShowFinanceComponent implements OnInit {
  financeInfo!: Finance;
  constructor(private financeService: FinanceService) { }

  ngOnInit(): void {
    this.financeService.findAllFinance().subscribe((data) => {
      this.financeInfo = data;
    },()=>{
      console.log("loi")
    });
  }

}
