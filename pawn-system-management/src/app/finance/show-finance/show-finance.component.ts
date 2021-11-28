import { Component, OnInit } from '@angular/core';
import {FinanceService} from "../../services/finance.service";
import {Finance} from "../../interface/finance";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-show-finance',
  templateUrl: './show-finance.component.html',
  styleUrls: ['./show-finance.component.css']
})
export class ShowFinanceComponent implements OnInit {
  financeInfo!: Finance;
  constructor(private financeService: FinanceService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Tài chính");
    this.financeService.findAllFinance().subscribe((data) => {
      this.financeInfo = data;
    },()=>{
      console.log("loi")
    });
  }

}
