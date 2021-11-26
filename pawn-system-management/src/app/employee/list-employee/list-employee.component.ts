import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {IEmployee} from "../IEmployee";
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employee!:IEmployee[];
  totalPage!: number;
  pageNow: number = 1;

  constructor(private service:EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getPage(page: number) {
    this.service.getPage(page).subscribe(data => {
      this.employee = data.content;
      this.pageNow = data.pageable.pageNumber + 1;
    })
  }

  getAll(){
    this.service.getAll().subscribe(data =>{
      this.employee = data.content;
      this.totalPage = data.totalPages;
      console.log(data);
    })
  }

  delete(cusId: string): void {
    this.service.finById(cusId).subscribe(data =>{
      console.log(data.employeeId);
      console.log(typeof data.employeeId);

      const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
        width: '500px',
        data: {data1: data}
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        this.getAll();
      });
    })
  }
}
