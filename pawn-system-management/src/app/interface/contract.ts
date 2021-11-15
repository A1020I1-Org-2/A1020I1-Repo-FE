import {Customer} from "./customer";
import {TypeProduct} from "./type-product";
import {TypeContract} from "./type-contract";
import {StatusContract} from "./status-contract";

export interface Contract {
  contractId: string;
  productImg: string;
  productName: string;
  interestMoney: number;
  receiveMoney: number;
  loanMoney: number;
  liquidationDate: string;
  startDate: string;
  endDate: string;
  quantity: number;
  statusContract: StatusContract;
  typeContract: TypeContract;
  typeProduct: TypeProduct;
  customer: Customer;
}
