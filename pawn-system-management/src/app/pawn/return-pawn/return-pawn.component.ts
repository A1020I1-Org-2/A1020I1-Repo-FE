import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-return-pawn',
  templateUrl: './return-pawn.component.html',
  styleUrls: ['./return-pawn.component.css']
})
export class ReturnPawnComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Trả đồ");
  }

}
