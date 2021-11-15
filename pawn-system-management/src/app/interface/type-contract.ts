import {Contract} from "./contract";

export interface TypeContract {
  typeContractId: number;
  name: string;
  contractList?: Contract[];
}
