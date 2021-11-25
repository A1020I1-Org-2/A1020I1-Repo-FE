import { Customer } from "./customer";
import { Employee } from "./employee";
import { StatusContract } from "./status-contract";
import { TypeContract } from "./type-contract";
import { TypeProduct } from "./type-product";

export interface Contract {
  contractId: string;
  productImg: string;
  productName: string;
  interestMoney: number;
  receiveMoney: number;
  loanMoney: number;
  liquidationDate:Date;
  startDate:Date;
  endDate: Date;
  quantity:number;
  customer: Customer;
  employee: Employee;
  statusContract: StatusContract;
  typeContract: TypeContract;
  typeProduct: TypeProduct;
}
