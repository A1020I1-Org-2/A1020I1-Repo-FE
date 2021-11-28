import {Contract} from "./contract";

export interface StatusContract {
  contractList?: Contract[];
  statusContractId: number,
  name: string
}
