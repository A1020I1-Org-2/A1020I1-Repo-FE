import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {IEmployee} from "../IEmployee";
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employee!:IEmployee[];
  totalPage!: number;
  pageNow: number = 1;
  searchName!: string;

  constructor(private service:EmployeeService,
              public dialog: MatDialog,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Danh sách nhân viên");
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
      const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
        width: '500px',
        disableClose: true,
        data: data
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        this.getAll();
      });
    })
  }

  search() {
    this.service.search(this.searchName).subscribe(data => {
      this.employee = data.content;
    });
  }
}
