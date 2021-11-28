import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string = 'http://localhost:8080/';
  FIRST_USERNAME: string = 'CTIwGGVDooOmNfUpvsFM';
  FIRST_PASSWORD: string = 'SxbaNxSguVlzGbNlsJep';
  message: string = '';

  constructor(private http: HttpClient) { }

  doLogin(userName: string, password: string): Observable<any>{
    return this.http.post<any>(this.API + 'login', {
      userName: userName,
      password: password
    });
  }

  doChangePassword(username: string, password: string, newPassword: string): Observable<any>{
    return this.http.post(this.API + 'change-password', {
      username: username,
      password: password,
      newPassword: newPassword
    })
  }

  saveToken(token: string): void{
    localStorage.setItem("Token", btoa(token));
  }

  getToken(): string{
    let token: string|null = localStorage.getItem('Token');
    return token == null ? '' : 'Token ' + atob(token);
  }

  removeToken(): void{
    localStorage.removeItem("Token");
  }

  saveUserName(username: string): void{
    localStorage.setItem('username', username);
  }

  getUserName(): string | null{
    return localStorage.getItem('username');
  }

  setMessage(message: string): void{
    this.message = message;
  }

  getMessage(): string{
    return this.message;
  }

  setRememberMe(username: string, password: string, days: number): void{
    this.removeRememberMe();
    let encodeUserName: string = username;
    let encodePassword: string = password;
    for(let i=0; i<11; i++){
      encodeUserName = btoa(encodeUserName);
      encodePassword = btoa(encodePassword);
    }
    encodeUserName = this.FIRST_USERNAME + encodeUserName;
    encodePassword = this.FIRST_PASSWORD + encodePassword;
    let d:Date = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = ``;
    document.cookie = `${encodeUserName}=${encodePassword}; ${expires}${cpath}`;
  }

  getRememberMe(): any {
    let cookie = this.getCookie();
    if(cookie == null){
      return null;
    }
    let decodeUserName: string = cookie.username;
    let decodePassword: string = cookie.password;
    decodeUserName = decodeUserName.substring(20, decodeUserName.length);
    decodePassword = decodePassword.substring(20, decodePassword.length);
    for (let i=0; i<11; i++){
      decodeUserName = atob(decodeUserName);
      decodePassword = atob(decodePassword);
    }
    return {
      username: decodeUserName,
      password: decodePassword
    }
  }

  removeRememberMe(): void{
    let cookie = this.getCookie();
    if(cookie == null){
      return;
    }
    let encodeUserName: string = cookie.username;
    let d:Date = new Date();
    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = ``;
    document.cookie = `${encodeUserName}=; ${expires}${cpath}`;
  }

  getCookie(): any {
    let decodeUserName: string = '';
    let decodePassword: string = '';
    let status: boolean = false;
    let cookie = document.cookie.split('; ');
    for (let i=0; i<cookie.length; i++){
      let temp = cookie[i].split('=');
      if(status){
        break;
      }
      temp.forEach(item => {
        if(item.indexOf(this.FIRST_USERNAME) == 0){
          status = true;
          decodeUserName = item;
        }
        if (item.indexOf(this.FIRST_PASSWORD) == 0){
          status = true;
          decodePassword = item;
        }
      })
    }
    if(!status){
      return null;
    }
    return {
      username: decodeUserName,
      password: decodePassword
    }
  }

  testJwt(): Observable<any>{
    return this.http.get<any>(this.API + "random", {
      headers: new HttpHeaders({
        'Authorization': this.getToken()
      })

    })
  }
}
