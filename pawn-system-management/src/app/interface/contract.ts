import {TypeContract} from "./type-contract";
import {TypeProduct} from "./type-product";
import {StatusContract} from "./status-contract";
import {Customer} from "./customer";

export interface Contract {
  contractId: string,
  contractImg: string,
  productName: string,
  interestMoney: number,
  receiveMoney: number,
  loanMoney: number,
  liquidationDate: Date,
  startDate: Date,
  endDate: Date,
  quantity: number,
  customer: Customer,
  statusContract: StatusContract,
  typeContract: TypeContract,
  typeProduct: TypeProduct
}
