import {Contract} from "./contract";

export interface Customer {
  customerId: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  gender: boolean;
  address: string;
  idCard: string;
  contracts: Contract[];
}
