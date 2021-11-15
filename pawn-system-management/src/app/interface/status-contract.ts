import {Contract} from "./contract";

export interface StatusContract {
  statusContractId: number;
  name: string;
  contractList?: Contract[];
}
