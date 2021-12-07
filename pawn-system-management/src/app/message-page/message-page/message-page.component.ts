import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chat} from "../../interface/chat";
import {ChatService} from "../../services/chat.service";
import {map} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef | any;

  listContentMessage: Chat[] = [];
  formGroup!: FormGroup;
  booleanCustomer!: boolean;
  widthClassContent!: any;
  idEmployee!: string;
  tmpListIdUser: any;
  showNotification!: boolean;
  messageUnseenArr: any[] = [];
  objForUpdateMessageLatest: any[] = [];
  idForGetMess! : any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("nhắn tin");
    this.tmpListIdUser = ['NV-0001', 'NV-0002', 'NV-0003', "NV-0004"];
    this.idEmployee = "NV-0003";

    this.formGroup = this.formBuilder.group({
      sender: this.idEmployee,
      receiver: ['',Validators.required],
      content: ['',Validators.required],
      time: [''],
      status: "pending",
    });

    this.getMessageAllUser();
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
        this.messageUnseenArr = [];
        for (let i = 0; i < data.length; i++){
          let messageLatest: any = Object.values(data[i])[Object.keys(data[i]).length-1];
          if (messageLatest.receiver == this.idEmployee){
            if (messageLatest.status != "seen"){
              this.objForUpdateMessageLatest.push({id: data[i].key, key: Object.keys(data[i])[Object.keys(data[i]).length-1], status: "seen"});
              this.showNotification = true;
              this.messageUnseenArr.push(Object.values(data[i])[1]);
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
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  getMessageWithId(idPartner: any) {
    this.formGroup.controls.receiver?.setValue(idPartner);
    let tmpIdEmployee = parseInt(this.idEmployee.substring(3));
    let tmpIdPartner = parseInt(idPartner.substring(3));
    if (tmpIdEmployee > tmpIdPartner) {
      this.idForGetMess = idPartner + "-" + this.idEmployee;
    }else {
      this.idForGetMess = this.idEmployee + "-" + idPartner;
    }
    this.chatService.getAllChat(this.idForGetMess).snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(
      (data) => {
        this.seen();
        this.listContentMessage = data;
      }
    );
  }

  checkUnseen(item: any) {
    if (this.messageUnseenArr.length > 0){
      for (let i = 0; i < this.messageUnseenArr.length; i++){
        if (this.messageUnseenArr[i].sender == item && this.messageUnseenArr[i].receiver == this.idEmployee){
          return true;
        }
      }
    }
    return false;
  }


  seen() {
    this.objForUpdateMessageLatest.filter(
      (obj, index) => {
        if (obj.id == this.idForGetMess){
          let indexNeedRemove = this.objForUpdateMessageLatest.findIndex(o => o.id == this.idForGetMess);
          this.chatService.update(
            this.objForUpdateMessageLatest[index].id,
            this.objForUpdateMessageLatest[index].key,
            {status: "seen"}).then(
            () => {}
          ).catch(
            (err) => {}
          );
          this.objForUpdateMessageLatest.splice(indexNeedRemove,1);
        }
      }
    );
  }

  submitContent() {
    let currentDateTime = new Date();
    if (this.formGroup.get('content')?.invalid){

    }else {
      let objChat: Chat = {
        sender: this.formGroup.get('sender')?.value,
        receiver: this.formGroup.get('receiver')?.value,
        content: this.formGroup.get('content')?.value,
        time: currentDateTime.toString(),
        status: this.formGroup.get('status')?.value
      };
      this.chatService.create(objChat, this.idForGetMess).then(()=>{});
      this.formGroup.get('content')?.setValue('');
    }
  }
}
