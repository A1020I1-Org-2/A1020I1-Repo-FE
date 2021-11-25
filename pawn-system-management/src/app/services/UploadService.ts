// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
// import { AngularFireStorage } from "@angular/fire/storage";
// import { Observable } from "rxjs";
// import { FileUpload } from "../interface/FileUpload";
// import {finalize} from "rxjs/operators";
//
// export class UploadService{
//   private basePath = '/imgPawn';
//   constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
//   }
//
//   pushFileToStorage(fileUpload: FileUpload): Observable<string> {
//     const filePath = `${this.basePath}/${fileUpload.file.name}`;
//     const storageRef = this.storage.ref(filePath);
//     const uploadTask = this.storage.upload(filePath, fileUpload.file);
//
//     uploadTask.snapshotChanges().pipe(
//       finalize(() => {
//         storageRef.getDownloadURL().subscribe(downloadURL => {
//           fileUpload.url = downloadURL;
//           fileUpload.name = fileUpload.file.name;
//           this.saveFileData(fileUpload);
//         });
//       })
//     ).subscribe();
//     return this.storage.ref(this.basePath + "/" + fileUpload.file.name).getDownloadURL();
//   }
//
//   private saveFileData(fileUpload: FileUpload): void {
//     this.db.list(this.basePath).push(fileUpload);
//   }
//
//   getFiles(numberItems: number): AngularFireList<FileUpload> {
//     return this.db.list(this.basePath, ref =>
//       ref.limitToLast(numberItems));
//   }
// }
