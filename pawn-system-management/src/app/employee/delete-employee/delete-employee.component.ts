import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  nameEmp: string = '';
  idEmp: string = '';

  constructor(private service: EmployeeService,
              public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idEmp = this.data.employeeId;
    this.nameEmp = this.data.fullName;
  }

  delete() {
    this.service.delete(this.idEmp).subscribe(data =>{
      this.service.isDelete = 'true';
      this.dialogRef.close();
    })
  }
}
