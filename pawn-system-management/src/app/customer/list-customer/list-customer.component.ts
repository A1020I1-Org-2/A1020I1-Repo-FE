import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../interface/customer";

interface Gender {
  value: number,
  viewValue: string
}

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers!: Customer[];
  totalPage = 0;
  indexPage = 1;

  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.getListCustomer()
  }


  getListCustomer(){
    this.customerService.getListCustomer().subscribe(data => {
      this.customers = data.content;
      this.totalPage = data.totalPages;
      console.log(data);
    })
  }

  getPage(pageNum: number){
    this.customerService.getPageList(pageNum).subscribe(data =>{
      this.customers = data.content;
      this.indexPage = data.pageable.pageNumber + 1;
    });
  }

}
