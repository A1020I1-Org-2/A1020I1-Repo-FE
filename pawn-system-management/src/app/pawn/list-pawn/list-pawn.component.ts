import { Component, OnInit } from '@angular/core';
import {PawnService} from "../../services/pawn.service";
import {Contract} from "../../interface/contract";
import {TypeProductService} from "../../services/type-product.service";
import {TypeProduct} from "../../interface/type-product";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../services/alert.service";
import {Title} from "@angular/platform-browser";
import {ContractService} from "../../services/contract.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-pawn',
  templateUrl: './list-pawn.component.html',
  styleUrls: ['./list-pawn.component.css']
})
export class ListPawnComponent implements OnInit {
  pawnList: Contract[] = [];
  typeProductList: TypeProduct[] = [];
  totalPage: number[] = [];
  pageNow: number = 1;
  idSelect: String = '';
  pawnInfo!: Contract;
  searchPawn!: FormGroup;
  constructor(private pawnService: PawnService,
              private typeProductService: TypeProductService,
              private alertService: AlertService,
              private contractService: ContractService,
              private router: Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Danh sách đồ cầm");
    this.getList();
    this.searchPawn = new FormGroup({
      search: new FormControl(''),
      typeSearch: new FormControl(''),
    })
  }

  getList(){
    this.pawnService.getAllPawn().subscribe((data)=> {
      console.log(data);
      this.pawnList = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0)
      }
    });
    this.typeProductService.findAllTypeProduct().subscribe((data) => {
      this.typeProductList = data;
    })
  }

  temp(contractId: String) {
    this.idSelect = contractId;
    this.pawnService.getPawnById(this.idSelect).subscribe((data) => {
      // console.log(data);
      this.pawnInfo = data;
    });
  }

  searchP() {
    this.pawnService.searchPawn(this.searchPawn.value.search.trim(),this.searchPawn.value.typeSearch).subscribe((data) => {
      this.pawnList = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0)
      }
    },()=> {
      this.alertService.showMessageErrors("Không tìm thấy!");
    })
  }

  searchP2($event: any) {
    this.pawnService.searchPawn(this.searchPawn.value.search.trim(),this.searchPawn.value.typeSearch).subscribe((data) => {
      this.pawnList = data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0)
      }
    },()=> {})
  }

  getPage(page: number) {
    this.pawnService.getSearchPawn(this.searchPawn.value.search.trim(),this.searchPawn.value.typeSearch,page).subscribe((data) => {
      this.pawnList= data.content;
      this.pageNow = data.number;
      this.totalPage = [];
      for(let i=0; i<data.totalPages; i++){
        this.totalPage.push(0)
      }
    })
  }

  createLiquidation(id: string){
    for (let i=0; i<this.pawnList.length; i++){
      if(id === this.pawnList[i].contractId){
        this.contractService.contract = this.pawnList[i];
        this.router.navigateByUrl('/create-liquidation-contract').then();
        break;
      }
    }
  }

  returnPawn(id: string){
    for (let i=0; i<this.pawnList.length; i++){
      if(id === this.pawnList[i].contractId){
        this.contractService.contract = this.pawnList[i];
        this.router.navigateByUrl('/return-pawn').then();
        break;
      }
    }
  }
}
