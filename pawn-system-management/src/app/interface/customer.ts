import {Contract} from "./contract";

export interface Customer {
  customerId: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  gender: boolean;
  address: string;
  idCard: string;
  contract : Contract;
}
