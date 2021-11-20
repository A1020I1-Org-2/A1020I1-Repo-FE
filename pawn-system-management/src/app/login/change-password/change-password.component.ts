import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

function checkPassword(input: AbstractControl): ValidationErrors | null {
  if (input.value.newPassword !== input.value.confirmPassword){
    return {checkPassword: true}
  }
  return null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isOpenToast: boolean = false;
  isSubmit: boolean = false;
  username: string | null = '';
  formChangePassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordGroup: new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [checkPassword])
  });
  constructor(private titleService: Title,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Đổi mật khẩu");
    if (this.loginService.getUserName() !== null){
      this.username = this.loginService.getUserName();
    }else{
      this.router.navigateByUrl("/login").then();
    }
  }

  hideToast(): void{
    this.isOpenToast = false;
  }

  doSubmit(): void{
    this.isOpenToast = true;
    if(this.formChangePassword.valid){
      this.isSubmit = false;
      if(this.username !== null){
        this.loginService.doChangePassword(this.username, this.form.password.value, this.newPassword?.value)
          .subscribe(account => {
            if(account === null){
              this.isOpenToast = true;
            }else{
              this.isOpenToast = false;
              this.loginService.message = 'success';
              this.router.navigateByUrl('/login').then();
              this.loginService.removeRememberMe();
            }
          }, error => {
            this.isOpenToast = true;
          })
      }
    }else{
      this.isSubmit = true;
    }
  }

  get form(){
    return this.formChangePassword.controls;
  }

  get newPassword(){
    return this.formChangePassword.get("passwordGroup.newPassword")
  }

  get confirmPassword(){
    return this.formChangePassword.get("passwordGroup.confirmPassword")
  }

  cancel(){
    this.router.navigateByUrl("/login").then();
  }
}
