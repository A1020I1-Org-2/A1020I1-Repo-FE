import {StatusContract} from "../interface/status-contract";
import {TypeContract} from "../interface/type-contract";
import {TypeProduct} from "../interface/type-product";

export class ContractDTO {
  private contractId!:string;
  private productImg!:string;
  private productName!:string;
  private interestMoney!:number;
  private receiveMoney!:number;
  private loanMoney!:number;
  private liquidationDate!:string;
  private startDate!:string;
  private endDate!:string;
  private quantity!:number;
  private statusContract!:StatusContract;
  private customerId!:string;
  private typeContract!:TypeContract;
  private typeProduct!:TypeProduct;
  private employeeId!:string;

  constructor(contractId: string, productImg: string, productName: string, interestMoney: number, receiveMoney: number, loanMoney: number, liquidationDate: string, startDate: string, endDate: string, quantity: number, statusContract: StatusContract, customerId: string, typeContract: TypeContract, typeProduct: TypeProduct, employeeId: string) {
    this.contractId = contractId;
    this.productImg = productImg;
    this.productName = productName;
    this.interestMoney = interestMoney;
    this.receiveMoney = receiveMoney;
    this.loanMoney = loanMoney;
    this.liquidationDate = liquidationDate;
    this.startDate = startDate;
    this.endDate = endDate;
    this.quantity = quantity;
    this.statusContract = statusContract;
    this.customerId = customerId;
    this.typeContract = typeContract;
    this.typeProduct = typeProduct;
    this.employeeId = employeeId;
  }
}
