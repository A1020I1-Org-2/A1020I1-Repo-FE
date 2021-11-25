import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ContractDto } from '../dto/contractDto';
import {Observable} from "rxjs";
import {FileUpload} from "../interface/FileUpload";
import {finalize} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import { TypeProduct } from '../interface/type-product';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private basePath = '/imgPawn';

  private readonly API = "http://localhost:8080/contract/createPawn";
  private readonly API_TYPE_PRODUCT = "http://localhost:8080/typeProduct/listTypeProduct"

  constructor(private _httpClient:HttpClient,private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  saveNewContractPawn(contract:ContractDto):Observable<any>{
    return this._httpClient.post<any>(this.API,contract);
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

  getListTypeProduct():Observable<TypeProduct[]>{
    return this._httpClient.get<TypeProduct[]>(this.API_TYPE_PRODUCT);
  }
}
