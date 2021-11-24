import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toast: ToastrService) { }
  showAlertSuccess(message: string | undefined){
    this.toast.success(message, 'Thông báo: ');
  }
  showMessageErrors(message: string | undefined){
    this.toast.success(message, 'Thông báo: ');
  }
}
