import {TypeProduct} from "./type-product";
import {StatusContract} from "./status-contract";
import {Customer} from "./customer";

export interface Contract {
  contractId: String;
  productImg: String;
  productName : String;
  interestMoney: number;
  receiveMoney: number;
  loanMoney: number;
  liquidationDate: Date;
  startDate: Date;
  endDate: Date;
  quantity: number;
  typeProduct: TypeProduct;
  statusContract: StatusContract;
  customer: Customer;
}
