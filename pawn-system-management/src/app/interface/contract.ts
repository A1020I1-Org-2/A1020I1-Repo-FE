import {Customer} from "./customer";
import {StatusContract} from "./status-contract";
import {TypeContract} from "./type-contract";
import {TypeProduct} from "./type-product";
import {Employee} from "./employee";

export interface Contract {
  contractId: string;
  productImage: string;
  productName: string;
  interestMoney: number;
  receiveMoney: number;
  loanMoney: number;
  liquidationDate:Date;
  startDate:Date;
  endDate: Date;
  quantity:number;
  customer: Customer;
  statusContract: StatusContract;
  typeContract: TypeContract;
  typeProduct: TypeProduct;
  productImg: string;
  employee: Employee;
}
