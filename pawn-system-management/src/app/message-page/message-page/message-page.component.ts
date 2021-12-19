import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chat} from "../../interface/chat";
import {ChatService} from "../../services/chat.service";
import {EmployeeService} from "../../services/employee.service";
import {IEmployee} from "../../employee/IEmployee";
import {Title} from "@angular/platform-browser";
import {Employee} from "../../interface/employee";
import {formatDate} from "@angular/common";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-chat',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef | any;

  listContentMessage: Chat[] = [];
  formGroup!: FormGroup;
  booleanCustomer!: boolean;
  widthClassContent!: any;
  idEmployee!: string;
  showNotification!: boolean;
  messageLatestUnseenArr: Chat[] = [];
  objForUpdateMessageLatest: any[] = [];
  idForGetMess! : any;
  listEmployee!: IEmployee[];
  nameReceiver!: string;
  messageLatestArr: Chat[] = [];
  attachmentEmployeeWithChat: any[] = [];


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private employeeService: EmployeeService,
    private title: Title,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nhắn tin');
    if(this.loginService.getUserName() !== ''){
      this.employeeService.findByAccount(this.loginService.getUserName()).subscribe(employee => {
        this.idEmployee = employee.employeeId;
      })
    }
    this.employeeService.getAllEmployee().subscribe(
      (data) => {
        this.listEmployee = data;
      },error => {

      },() => {
        this.getMessageAllUser();
      }
    );

    this.formGroup = this.formBuilder.group({
      sender: this.idEmployee,
      receiver: ['',Validators.required],
      content: ['',Validators.required],
      time: [''],
      status: "pending",
    });

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
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
        this.messageLatestUnseenArr = [];
        this.messageLatestArr = [];
        for (let i = 0; i < data.length; i++){
          let messageLatest: any = Object.values(data[i])[Object.keys(data[i]).length-1];
          if (messageLatest.receiver == this.idEmployee){
            this.messageLatestArr.push(messageLatest);
            if (messageLatest.status != "seen"){
              this.objForUpdateMessageLatest.push({id: data[i].key, key: Object.keys(data[i])[Object.keys(data[i]).length-1], status: "seen"});
              this.showNotification = true;
              this.messageLatestUnseenArr.push(messageLatest);
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
          }else if (messageLatest.sender == this.idEmployee){
            this.messageLatestArr.push(messageLatest);
          }
        }

        this.messageLatestArr = this.messageLatestArr.filter((thing, index) => {
          let _thing = JSON.stringify(thing);
          return index === this.messageLatestArr.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
          });
        });
        this.objForUpdateMessageLatest = this.objForUpdateMessageLatest.filter((thing, index) => {
          let _thing = JSON.stringify(thing);
          return index === this.objForUpdateMessageLatest.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
          });
        });

        if (this.messageLatestUnseenArr.length > 0){
          this.showNotification = true;
        }else {
          this.showNotification = false;
        }

        this.changeDetectorRef.detectChanges();
        this.AttachmentEmployeeChat();
      }
    );
  }

  getMessageOnePerson(idPartner: any, name: any) {
    this.nameReceiver = name;
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
    if (this.messageLatestUnseenArr.length > 0){
      for (let i = 0; i < this.messageLatestUnseenArr.length; i++){
        if (this.messageLatestUnseenArr[i].sender == item && this.messageLatestUnseenArr[i].receiver == this.idEmployee){
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

  private AttachmentEmployeeChat() {
    this.attachmentEmployeeWithChat = [];
    for (let i = 0; i < this.listEmployee.length; i++){
      if (this.listEmployee[i].employeeId != this.idEmployee){
        let obj:Employee = this.listEmployee[i];
        let contentLatest: any = "";
        let isNUll: boolean = false;
        for (let j = 0; j < this.messageLatestArr.length; j++){
          if (this.messageLatestArr[j].sender == this.listEmployee[i].employeeId || this.messageLatestArr[j].receiver == this.listEmployee[i].employeeId){
            contentLatest = this.messageLatestArr[j].content;
            this.attachmentEmployeeWithChat.push({obj, contentLatest});
            isNUll = false;
            break;
          }else {
            isNUll = true;
          }
        }
        if (isNUll){
          this.attachmentEmployeeWithChat.push({obj, contentLatest});
          isNUll = false;
        }
      }
    }
  }
}

