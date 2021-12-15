import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {map} from "rxjs/operators";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formGroup!: FormGroup;
  idEmployee!: string;
  showNotification!: boolean;
  messageUnseenArr: any[] = [];
  objForUpdateMessageLatest: any[] = [];
  username: string = '';
  role: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.loginService.username !== undefined){
      this.username = this.loginService.username;
      console.log(":))")
    }else{
      this.username = localStorage.getItem("username") + '';
    }
    if(this.loginService.role !== undefined){
      this.role = this.loginService.role;
    }else{
      this.role = localStorage.getItem("role") + '';
    }
    this.idEmployee = "NV-0001";

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

  logout() {
    this.router.navigateByUrl("/login").then();
  }
}
