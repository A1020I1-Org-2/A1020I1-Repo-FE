import {Customer} from "../interface/customer";
import {Employee} from "../interface/employee";
import {StatusContract} from "../interface/status-contract";
import {TypeContract} from "../interface/type-contract";
import {TypeProduct} from "../interface/type-product";

export class ContractDto {
  contractId!: string;
  productImg!: string;
  productName!: string;
  interestMoney!: number;
  receiveMoney!: number;
  loanMoney!: number;
  liquidationDate!:string;
  startDate!:Date;
  endDate!: Date;
  quantity!:number;
  statusContract!: StatusContract;
  typeContract!: TypeContract;
  typeProduct!: TypeProduct;
  employeeId!: string;
  customerId!: string;


  constructor(contractId: string, productImg: string, productName: string, interestMoney: number, receiveMoney: number, loanMoney: number, liquidationDate: string, startDate: Date, endDate: Date, quantity: number, statusContract: StatusContract, typeProduct: TypeProduct, typeContract: TypeContract, employeeId: string, customerId: string) {
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
    this.typeProduct = typeProduct;
    this.typeContract = typeContract;
    this.employeeId = employeeId;
    this.customerId = customerId;
  }
}
