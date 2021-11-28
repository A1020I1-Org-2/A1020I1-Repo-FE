import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {Contract} from "../../interface/contract";
import {Customer} from "../../interface/customer";
import {Employee} from "../../interface/employee";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TypeProduct} from "../../interface/type-product";
import {ContractDTO} from "../../model/ContractDTO";
import {StatusContract} from "../../interface/status-contract";
import {TypeContract} from "../../interface/type-contract";
import {AlertService} from "../alert.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";


function checkLiquidationDate(param: AbstractControl): ValidationErrors | null {
  const now = new Date();
  const liquidationDate = new Date(param.value);
  let diff = (now.getTime() - liquidationDate.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 1 && diff > 0) {
    return null;
  } else {
    return {checkLiquidationDate: true};
  }
  return null;
}

@Component({
  selector: 'app-create-liquidation-contract-component',
  templateUrl: './create-liquidation-contract-component.component.html',
  styleUrls: ['./create-liquidation-contract-component.component.css']
})

export class CreateLiquidationContractComponentComponent implements OnInit {
  customerName: String = "";
  liquidationProductList: Contract[] = [];
  typeProductList: TypeProduct[] = [];
  customerList: Customer[] = [];
  customer!: Customer;
  employeeList: Employee[] = [];
  employee!: Employee;
  formCreate!: FormGroup;
  searchProduct!: FormGroup;
  searchCus: string = '';
  searchEm: string = '';
  productName: string = '';
  typeProduct: string = '';
  receiveMoney: number = 0;
  Contract!: ContractDTO;
  contractID!: string;
  productImg: string = "";
  statusContract!: StatusContract;
  typeContract: TypeContract = {typeContractId: 2, name: "Thanh lý"};
  employeeName: string = "";
  quantity: number = 0;
  typeProductName: string = "";
  p: any;
  indexPagination: number = 1;
  totalPagination: number = 0;
  isFoundCs: boolean = true;
  isFoundEm: boolean = true;
  isFoundPd: boolean = true;

  constructor(
    public contractService: ContractService,
    public formBuilder: FormBuilder,
    public router: Router,
    private alertService: AlertService,
    private toast: ToastrService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle("Hợp đồng thanh lý");
    this.formCreate = this.formBuilder.group({
      contractId: ['', [Validators.required, Validators.pattern(/^HD-\d{4}$/)]],
      customer: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      typeProduct: ['', [Validators.required]],
      liquidationDate: ['', [Validators.required, checkLiquidationDate]],
      receiveMoney: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
    this.getLiquidationProductList();
    this.getCustomerList();
    this.getEmployeeList();
    this.getListTypeProduct();
    this.searchProduct = new FormGroup({
      productName: new FormControl(''),
      receiveMoney: new FormControl(0),
      typeProduct: new FormControl('')
    });
  };

  createLiquidationContract() {
    // console.log(this.formCreate);
    if (this.formCreate.valid) {
      const value = this.formCreate.value;
      this.contractID = "HD-" + Math.floor(Math.random() * 10000);
      for (let i = 0; i < this.liquidationProductList.length; i++) {
        if (this.liquidationProductList[i].contractId === this.formCreate.value.contractId) {
          this.productImg = this.liquidationProductList[i].productImg;
        }
      }
      this.statusContract = {statusContractId: 3, name: "Close"};

      this.Contract = new ContractDTO(this.contractID, this.productImg, value.productName, 0
        , value.receiveMoney, 0, value.liquidationDate, "", "", value.quantity, this.statusContract,
        value.customer, this.typeContract, value.typeProduct, value.employee);

      this.contractService.updateStatusContractPawn(this.formCreate.value.contractId).subscribe(
        data => {
        }
      );

      this.contractService.saveLiquidationContract(this.Contract).subscribe(
        data => {
          this.ngOnInit();
        }
      );
      this.reset();
      this.alertService.showAlertSuccess("Tạo mới hợp đồng thanh lý thành công");
    } else {
      this.alertService.showAlertError("Tạo mới thất bại")
    }
  }

  getLiquidationProductList() {
    this.contractService.getLiquidationProductList().subscribe(data => {
      this.liquidationProductList = data.content;
      this.totalPagination = data.totalPages;
    })
  }

  getListTypeProduct() {
    this.contractService.getTypeProductList().subscribe(data => {
      this.typeProductList = data;
    })
  }

  getPageListProduct(pageNum: number) {
    this.contractService.getPageListProduct(pageNum, this.productName, this.receiveMoney, this.typeProduct).subscribe(
      data => {
        this.liquidationProductList = data.content;
        this.indexPagination = data.pageable.pageNumber + 1;
        this.totalPagination = data.totalPages;
      }
    )
  }

  getCustomerList() {
    this.contractService.getCustomerList().subscribe(data => {
      this.customerList = data.content;
      this.totalPagination = data.totalPages;
    })
  }

  getPageCustomer(pageNum: number) {
    this.contractService.getPageListCustomer(pageNum, this.searchCus).subscribe(
      data => {
        this.customerList = data.content;
        this.indexPagination = data.pageable.pageNumber + 1;
        this.totalPagination = data.totalPages;
      }
    )
  }

  getEmployeeList() {
    this.contractService.getEmployeeList().subscribe(data => {
      this.employeeList = data.content;
    })
  }

  getPageEmployee(pageNum: number) {
    this.contractService.getPageListEmployee(pageNum, this.searchEm).subscribe(
      data => {
        this.employeeList = data.content;
        this.indexPagination = data.pageable.pageNumber + 1;
        this.totalPagination = data.totalPages;
      }
    )
  }

  search() {
    if (this.searchProduct.value.productName == '') {
      this.searchProduct.value.productName = "";
    }
    if (this.searchProduct.value.receiveMoney == 0) {
      this.searchProduct.value.receiveMoney = 0;
    }
    if (this.searchProduct.value.typeProduct == '') {
      this.searchProduct.value.typeProduct = "";
    }
    this.contractService.searchLiquidationProduct(this.searchProduct.value.productName,
      this.searchProduct.value.receiveMoney, this.searchProduct.value.typeProduct).subscribe(
      (data) => {
        this.isFoundPd = true;
        this.liquidationProductList = data.content;
      }, error => {
        this.isFoundPd = false;
      }
    )
  }

  searchEnter($event: KeyboardEvent) {
    if (this.searchProduct.value.productName == '') {
      this.searchProduct.value.productName = "";
    }
    if (this.searchProduct.value.receiveMoney == 0) {
      this.searchProduct.value.receiveMoney = 0;
    }
    if (this.searchProduct.value.name == '') {
      this.searchProduct.value.typeProduct.name = "";
    }
    this.contractService.searchLiquidationProduct(this.searchProduct.value.productName,
      this.searchProduct.value.receiveMoney,
      this.searchProduct.value.typeProduct.name,).subscribe((data) => {
      this.liquidationProductList = data.content;
    })
  }

  searchCustomer() {
    this.contractService.searchCustomer(this.searchCus).subscribe(data => {
        this.isFoundCs = true;
        this.customerList = data.content;
      },
      () => {
        this.isFoundCs = false;
      })
  }

  searchEmployee() {
    this.contractService.searchEmployee(this.searchEm).subscribe(data => {
        this.isFoundEm = true;
        this.employeeList = data.content;
      },
      error => {
        this.isFoundEm = false;
      })
  }

  chooseProduct(contractId: string) {
    for (let i = 0; i < this.liquidationProductList.length; i++) {
      if (this.liquidationProductList[i].contractId === contractId) {
        this.formCreate.controls.contractId.setValue(contractId);
        this.formCreate.controls.productName.setValue(this.liquidationProductList[i].productName);
        this.formCreate.controls.receiveMoney.setValue(((this.liquidationProductList[i].loanMoney +
          this.liquidationProductList[i].interestMoney) * 0.5));
        this.formCreate.controls.quantity.setValue(this.liquidationProductList[i].quantity);
        this.formCreate.controls.typeProduct.setValue(this.liquidationProductList[i].typeProduct);
        this.typeProductName = this.liquidationProductList[i].typeProduct.name;
      }
    }
  }

  chooseCustomer(customerId: string) {
    this.formCreate.controls.customer.setValue(customerId);
    for (let i = 0; i < this.customerList.length; i++) {
      if (this.customerList[i].customerId === customerId) {
        this.customerName = this.customerList[i].name;
      }
    }
  }

  chooseEmployee(employeeId: string) {
    this.formCreate.controls.employee.setValue(employeeId);
    for (let i = 0; i < this.employeeList.length; i++) {
      if (this.employeeList[i].employeeId === employeeId) {
        this.employeeName = this.employeeList[i].fullName;
      }
    }
  }

  reset() {
    this.ngOnInit();
    this.customerName = '';
    this.employeeName = '';
    this.productName = '';
    this.typeProductName = '';
    this.quantity = 0;
    this.receiveMoney = 0;
  }

  resetOfCancel() {
    this.ngOnInit();
    this.reset();
    this.alertService.showAlertSuccess("Đã huỷ thành công!")
  }

  resetModalEM() {
    this.searchEm = '';
    this.searchEmployee();
  }

  resetModalCS() {
    this.searchCus = '';
    this.searchCustomer();
  }

  resetModalPD() {
    this.searchProduct.controls.productName.setValue("");
    this.searchProduct.controls.receiveMoney.setValue(0);
    this.searchProduct.controls.typeProduct.setValue("");
    this.search();
  }
}
