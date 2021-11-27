import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {IEmployee} from "../IEmployee";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {Title} from "@angular/platform-browser";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employee!:IEmployee[];
  totalPage: number[] = [];
  pageNow: number = 1;
  searchName: string = '';

  constructor(private service:EmployeeService,
              public dialog: MatDialog,
              private title: Title,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.title.setTitle("Danh sách nhân viên");
    if(this.service.isCreate === 'true'){
      setTimeout(() => {
        this.alert.showAlertSuccess('Tạo mới nhân viên thành công');
        this.service.isCreate = '';
      }, 500);
    }else if(this.service.isCreate === 'false'){
      setTimeout(() => {
        this.alert.showAlertSuccess('Tạo mới nhân viên thất bại');
        this.service.isCreate = '';
      }, 500);
    }
    if(this.service.isUpdate === 'true'){
      setTimeout(() => {
        this.alert.showAlertSuccess('Cập nhập nhân viên thành công');
        this.service.isUpdate = '';
      }, 500);
    }else if(this.service.isUpdate === 'false'){
      setTimeout(() => {
        this.alert.showAlertSuccess('Cập nhập nhân viên thất bại');
        this.service.isUpdate = '';
      }, 500);
    }
    this.getPage(0);
  }

  getPage(page: number) {
    this.service.getPage(page, this.searchName).subscribe(data => {
      this.employee = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0)
      }
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
        if(this.service.isDelete === 'true'){
          setTimeout(() => {
            this.alert.showAlertSuccess('Xoá nhân viên thành công');
            this.service.isDelete = '';
          }, 500);
        }else if(this.service.isDelete === 'false'){
          setTimeout(() => {
            this.alert.showAlertSuccess('Xoá nhân viên thất bại');
            this.service.isDelete = '';
          }, 500);
        }
        this.getPage(0);
      });
    })
  }

  deleteAll(){
    const dialogRef = this.dialog.open(DialogDeleteAll, {
      width: '500px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      if(this.service.isDelete === 'true'){
        setTimeout(() => {
          this.alert.showAlertSuccess('Xoá tất cả nhân viên thành công');
          this.service.isDelete = '';
        }, 500);
      }else if(this.service.isDelete === 'false'){
        setTimeout(() => {
          this.alert.showAlertSuccess('Xoá tất cả nhân viên thất bại');
          this.service.isDelete = '';
        }, 500);
      }
      this.getPage(0);
    });
  }

  search() {
    this.service.search(this.searchName).subscribe(data => {
      this.employee = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0)
      }
    });
  }
}

@Component({
  selector: '',
  templateUrl: './dialog-delete-all.html'
})
export class DialogDeleteAll{
  constructor(private service: EmployeeService,
              public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  delete() {
    this.service.deleteAll().subscribe(data =>{
      this.service.isDelete = 'true';
      this.dialogRef.close();
    })
  }
}
