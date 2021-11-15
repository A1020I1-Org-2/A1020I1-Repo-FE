import {Contract} from "./contract";

export interface TypeProduct {
  typeProductId: number;
  name: string;
  contractList?: Contract[];
}
