import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Title} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

export interface DialogMessage {
  mode: number
  message: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isOpenToast: boolean = false;
  isSubmit: boolean = false;

  formLogin: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl('')
  });

  constructor(private loginService: LoginService,
              private titleService: Title,
              private dialog: MatDialog,
              private router: Router,
              private element: ElementRef) { }

  ngOnInit(): void {
    this.titleService.setTitle("Đăng nhập");
    this.setFocus();
    let remember = this.loginService.getRememberMe();
    if(remember != null){
      this.login.userName.setValue(remember.username);
      this.login.password.setValue(remember.password);
      this.doLogin(remember.username, remember.password);
    }
    if(this.loginService.getUserName() !== null){
      this.login.userName.setValue(this.loginService.getUserName());
    }
    if(this.loginService.message === 'success'){
      setTimeout(() => {
        this.showMessage('Cập nhập mật khẩu thành công', 2)
      }, 400);
    }
  }

  setFocus(){
    const elm = this.element.nativeElement.querySelector('#username');
    if(!elm?.autofocus){
      elm?.focus();
    }
  }

  hideToast(): void{
    this.isOpenToast = false;
  }

  doSubmit(): void{
    if(this.formLogin.valid){
      this.isSubmit = false;
      this.isOpenToast = false;
      this.doLogin(this.login.userName.value, this.login.password.value);
    }else{
      this.isSubmit = true;
    }
  }

  doLogin(username: string, password: string){
    this.loginService.doLogin(username, password).subscribe(account => {
      if(account === null){
        this.setFocus();
        this.isOpenToast = true;
      }else{
        this.isOpenToast = false;
        this.loginService.username = account.userName;
        this.loginService.role = account.role;
        this.loginService.saveUserName(account.userName);
        this.loginService.saveToken(account.token);
        this.loginService.saveRole(account.role);
        this.checkDateChangePassword(account.lastUpdate);
        if (this.formLogin.controls.rememberMe.value){
          this.loginService.setRememberMe(this.login.userName.value, this.login.password.value, 5);
        }
      }
    }, error => {
      this.isOpenToast = true;
    })
  }

  get login(){
    return this.formLogin.controls;
  }

  checkDate(date: string): boolean{
    let now = new Date();
    let lastUpdate = new Date(date);
    let diff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.floor(diff) > 30;
  }

  showMessage(message: string, mode: number): MatDialogRef<any>{
    return this.dialog.open(DialogMessage, {
      disableClose: true,
      autoFocus: false,
      position: {
        top: '5%'
      },
      width: '33%',
      data: {message: message, mode: mode}
    });
  }

  checkDateChangePassword(lastUpdate: string){
    if (this.checkDate(lastUpdate)){
      const alert = this.showMessage('Có vẻ như bạn chưa thay đổi mật khẩu trong 30 ngày qua. ' +
        'Bạn cần thay đổi mật khẩu', 1);
      alert.afterClosed().subscribe(result =>{
        if (result.message == 'yes'){
          this.loginService.saveUserName(this.login.userName.value);
          this.router.navigateByUrl("/change-password").then();
        }
      })
    }else{
      this.router.navigateByUrl("/home").then();
    }
  }
}

@Component({
  selector: '',
  templateUrl: './dialog-change-password.html'
})
export class DialogMessage{
  constructor(public dialogRef: MatDialogRef<DialogMessage>,
              @Inject(MAT_DIALOG_DATA) public data: DialogMessage) {
  }

  closeDialog(): void{
    this.dialogRef.close({message: 'no'});
  }

  selectChange(): void{
    this.dialogRef.close({message: 'yes'});
  }
}
