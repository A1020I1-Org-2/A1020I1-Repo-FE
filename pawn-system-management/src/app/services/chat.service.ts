import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Chat} from "../interface/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbUrlChat: string = "/chat-v4";
  angularFireList: AngularFireList<Chat>;

  constructor(
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.angularFireList = angularFireDatabase.list(this.dbUrlChat);
  }

  getAllUser(): AngularFireList<any>{
    return this.angularFireList;
  }

  getAllChat(idCustomer: string): AngularFireList<Chat>{
    return this.angularFireDatabase.list(this.dbUrlChat + `/${idCustomer}`);
  }

  create(chat: Chat, idCustomer: string): any{
    return this.angularFireDatabase.list(this.dbUrlChat + `/${idCustomer}`).push(chat);
  }

  update(idForUpdate: string, key: any, value: any): Promise<void>{
    return this.angularFireDatabase.list(this.dbUrlChat + `/${idForUpdate}`).update(key, value);
  }

}
