import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interface/customer';
import { FileUpload } from '../interface/FileUpload';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_CUSTOMER: string = "http://localhost:8080/customer";
  private basePath = '/imgCustomer';
  httpOptions: any;
  public customers: Customer[] = [];

  constructor(
    public http: HttpClient,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  getListCustomer(): Observable<any> {
    return this.http.get<any>(this.API_CUSTOMER + '/list-customer');
  }

  getListCustomer1(page:number):Observable<any>{
    return this.http.get<any>(this.API_CUSTOMER+"/getCustomerList?page="+page);
  }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.API_CUSTOMER + '/get-all-customer')
  }

  deleteCustomer(id: number | undefined): Observable<any> {
    return this.http.delete<any>(this.API_CUSTOMER +'/deleteCustomer/'+ id, this.httpOptions);
  }

  searchCustomer(dateOfBirthFrom: string, dateOfBirthTo: string, address: string, name: string): Observable<any> {
    return this.http.get<any>(this.API_CUSTOMER + '/search-customer?dateOfBirthFrom=' + dateOfBirthFrom +
      '&dateOfBirthTo=' + dateOfBirthTo + '&address=' + address + '&name=' + name + '&page=0');
  }

  searchCustomer1(searchValue:string,page:number):Observable<any>{
    return this.http.get<any>(this.API_CUSTOMER+"/searchCustomer?searchValue="+searchValue+"&page="+page);
  }

  searchPageCustomer(dateOfBirthFrom: string, dateOfBirthTo: string, address: string, name: string, page: number): Observable<any> {
    return this.http.get<any>(this.API_CUSTOMER + '/search-customer?dateOfBirthFrom=' + dateOfBirthFrom +
      '&dateOfBirthTo=' + dateOfBirthTo + '&address=' + address + '&name=' + name + '&page=' + page);
  }


  create(customer: Customer): Observable<Customer> {
    console.log(customer);
    return this.http.post<any>(this.API_CUSTOMER + '/create', customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.API_CUSTOMER + "/update", customer);
  }
  pushFileToStorage(fileUpload: FileUpload): Observable<string> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return this.storage.ref(this.basePath + "/" + fileUpload.file.name).getDownloadURL();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
}
