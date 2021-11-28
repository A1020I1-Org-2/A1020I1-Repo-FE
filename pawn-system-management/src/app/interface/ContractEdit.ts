export class ContractEdit {
  contractID!: number;
  customerID!: string;
  customerName!:string;
  productName!: string;
  productTypeID!:number;
  startDate!: Date;
  endDate!: Date;
  statusTypeID!:number;


  constructor(contractID: number, customerID: string, customerName: string, productName: string, productTypeID: number, startDate: Date, endDate: Date, statusTypeID: number) {
    this.contractID = contractID;
    this.customerID = customerID;
    this.customerName = customerName;
    this.productName = productName;
    this.productTypeID = productTypeID;
    this.startDate = startDate;
    this.endDate = endDate;
    this.statusTypeID = statusTypeID;
  }


}
