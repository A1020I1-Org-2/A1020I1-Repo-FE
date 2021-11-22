import { Component, OnInit } from '@angular/core';
import {PawnService} from "../../services/pawn.service";
import {Contract} from "../../interface/contract";
import {TypeProductService} from "../../services/type-product.service";
import {TypeProduct} from "../../interface/type-product";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-list-pawn',
  templateUrl: './list-pawn.component.html',
  styleUrls: ['./list-pawn.component.css']
})
export class ListPawnComponent implements OnInit {
  pawnList: Contract[] = [];
  typeProductList: TypeProduct[] = [];
  totalPagination: number =0;
  idSelect: String = '';
  pawnInfo!: Contract;
  searchPawn!: FormGroup;
  indexPagination: number =1;
  constructor(private pawnService: PawnService,private typeProductService: TypeProductService,private alertService: AlertService) { }

  ngOnInit(): void {
    this.getList();
    this.searchPawn = new FormGroup({
      search: new FormControl(''),
      typeSearch: new FormControl(''),
    })
  }
  getList(){
    this.pawnService.getAllPawn().subscribe((data)=> {
      this.pawnList = data.content;
      this.totalPagination = data.totalPages;
    });
    this.typeProductService.findAllTypeProduct().subscribe((data) => {
      this.typeProductList = data;
    })
  }
  temp(contractId: String) {
    this.idSelect = contractId;
    this.pawnService.getPawnById(this.idSelect).subscribe((data) => {
      console.log(data);
      this.pawnInfo = data;
    });
  }

  searchP() {
    this.pawnService.searchPawn(this.searchPawn.value.search.trim(),this.searchPawn.value.typeSearch).subscribe((data) => {
      this.pawnList = data.content;
    },()=> {
      this.alertService.showMessageErrors("Không tìm thấy!");
    })
  }

  searchP2($event: any) {
    this.pawnService.searchPawn(this.searchPawn.value.search.trim(),this.searchPawn.value.typeSearch).subscribe((data) => {
      this.pawnList = data.content;
    },()=> {})
  }

  getPage(page: number) {
    this.pawnService.getSearchPawn(this.searchPawn.value.search.trim(),this.searchPawn.value.typeSearch,page).subscribe((data) => {
      this.pawnList= data.content;
      this.indexPagination  = data.pageable.pageNumber + 1;
    })
  }
}
