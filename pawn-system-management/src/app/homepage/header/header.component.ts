import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Chat} from "../../interface/chat";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  listContentMessage: Chat[] = [];
  formGroup!: FormGroup;
  idCustomer!: string;
  booleanCustomer!: boolean;
  widthClassContent!: any;
  tmpIdUser!: string;
  tmpListIdCustomer: any;
  showNotification!: boolean;
  messageUnseenArr: any[] = [];
  objForUpdateMessageLatest: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {

    this.tmpListIdCustomer = ['KH-0002', 'KH-0001', 'KH-0003', "KH-0004"];
    this.tmpIdUser = "KH-0003";

    if (this.tmpIdUser.substring(0,2) == ('KH')){
      this.widthClassContent = '100%';
      this.booleanCustomer = true;
      this.idCustomer = this.tmpIdUser;
      this.formGroup = this.formBuilder.group({
        receiver: "admin1",
        content: ['',Validators.required],
        status: "pending",
      });
      this.getMessageUser(this.idCustomer);
      this.getMessageAllUser();
    }else {
      this.getMessageAllUser();
      this.booleanCustomer = false;
      this.tmpIdUser = "admin1";
      this.formGroup = this.formBuilder.group({
        receiver: ['',Validators.required],
        content: ['',Validators.required],
        status: "pending",
      });

    }

  }
  private getMessageAllUser(){
    this.chatService.getAllUser().snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(
      data => {
        if (this.booleanCustomer){
          for (let i = 0; i < data.length; i++){
            if (data[i].key == this.tmpIdUser){
              let messageLatest: any = Object.values(data[i])[Object.keys(data[i]).length-1];
              if (messageLatest.receiver == this.tmpIdUser){
                if (messageLatest.status != "seen"){
                  if (this.objForUpdateMessageLatest.length <= 0){
                    this.objForUpdateMessageLatest.push({id: data[i].key, key: Object.keys(data[i])[Object.keys(data[i]).length-1], status: "seen"});
                  }
                  this.showNotification = true;
                }else {
                  this.objForUpdateMessageLatest = [];
                  this.showNotification = false;
                }
              }else {
                this.showNotification = false;
              }
              break;
            }
          }
          console.log(this.objForUpdateMessageLatest);
        }else {
          this.messageUnseenArr = [];
          for (let i = 0; i < data.length; i++){
            let messageLatest: any = Object.values(data[i])[Object.keys(data[i]).length-1];
            if (messageLatest.receiver == this.tmpIdUser){
              if (messageLatest.status != "seen"){
                this.objForUpdateMessageLatest.push({id: data[i].key, key: Object.keys(data[i])[Object.keys(data[i]).length-1], status: "seen"});
                this.showNotification = true;
                this.messageUnseenArr.push({id: data[i].key});
              }else {
                this.objForUpdateMessageLatest.filter(
                  (obj) => {
                    if (obj.id == data[i].key){
                      let indexNeedRemove = this.objForUpdateMessageLatest.findIndex(o => o.id == data[i].key);
                      this.objForUpdateMessageLatest.splice(indexNeedRemove,1);
                    }
                  }
                )
              }
            }
          }

          this.objForUpdateMessageLatest = this.objForUpdateMessageLatest.filter((thing, index) => {
            let _thing = JSON.stringify(thing);
            return index === this.objForUpdateMessageLatest.findIndex(obj => {
              return JSON.stringify(obj) === _thing;
            });
          });

          if (this.messageUnseenArr.length > 0){
            this.showNotification = true;
          }else {
            this.showNotification = false;
          }
        }
      }
    );
  }

  private getMessageUser(userName: string) {
    this.chatService.getAllChat(userName).snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c =>
            ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(
      data => {
        this.listContentMessage = data;
      }
    );
  }

}

