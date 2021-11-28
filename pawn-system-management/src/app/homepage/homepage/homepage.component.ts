import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PawnType} from "./PawnType";
import {RegisterService} from "../register.service";
import {Register} from "../Register";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  form!: FormGroup;
  pawnTypes!: PawnType[];
  createSuccess: boolean = false;

  constructor(public registerService: RegisterService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Trang chủ");
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required,
        Validators.pattern("^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$")]),
      email: new FormControl('', [Validators.required,
        Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{10}|[0-9]{12})$")]),
      address: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      pawnTypeId: new FormControl('', [Validators.required]),
    });
    this.getAllType();
  }

  getAllType() {
    this.registerService.getAllType().subscribe(res => {
      this.pawnTypes = res;
      this.form.controls.pawnTypeId.setValue(res[0].pawnTypeId)
    });
  }

  get f(){
    return this.form.controls;
  }

  compareFn(c1: Register, c2: Register): boolean {
    return c1 && c2 ? c1.registerId === c2.registerId : c1 === c2;
  }

  fadeOutLink() {
    setTimeout( () => {
      this.createSuccess = false;
    }, 2000);
  }


  submit(){
    if (this.form.valid){
      this.registerService.create(this.form.value).subscribe(res => {
        this.createSuccess = true;
        this.fadeOutLink();
      })
    }
  }
}
