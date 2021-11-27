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
  private basePath = '/imgCustomer';
  public APICustomer: string = "http://localhost:8080/customer"
  public customers: Customer[] = [];
  constructor(
    public http: HttpClient,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }
  getListCustomer(): Observable<any> {
    return this.http.get(this.APICustomer + "/list");
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<any>(this.APICustomer + '/create', customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.APICustomer + "/update", customer);
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
