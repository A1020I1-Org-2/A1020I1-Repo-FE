import {Component, OnInit} from '@angular/core';
import {Employee} from 'src/app/interface/employee';
import {CustomerService} from 'src/app/services/customer.service';
import {EmployeeService} from 'src/app/services/employee.service';
import {Customer} from "../../interface/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUpload} from "../../interface/FileUpload";
import {ContractService} from "../../services/contract.service";
import {validSelectValidators} from 'src/app/share/valid-select.validators';
import {SemanticDepGraphUpdater} from "@angular/compiler-cli/src/ngtsc/incremental/semantic_graph";
import {validDateCheckoutValidators} from 'src/app/share/valid-date-checkout.validators';
import {ContractDto} from 'src/app/dto/contractDto';
import {StatusContract} from 'src/app/interface/status-contract';
import {TypeContract} from 'src/app/interface/type-contract';
import {TypeProduct} from 'src/app/interface/type-product';
import {data} from "browserslist";

@Component({
  selector: 'app-create-pawn-contract',
  templateUrl: './create-pawn-contract.component.html',
  styleUrls: ['./create-pawn-contract.component.css']
})
export class CreatePawnContractComponent implements OnInit {
  customerList: Customer[] = [];
  customerName: string = "";
  employeeList: Employee[] = [];
  employeeName: string = "";
  formCreate!: FormGroup;
  selectedFiles?: FileList;
  msgImage = '';
  isImage = false;
  img!: string;
  currentFileUpload?: FileUpload;
  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  dateCurrent = this.year + '-' + this.month + '-' + this.day;
  contractPawn?: ContractDto;
  contractID: string = "";
  loanMoney: number = 0;
  statusContract: StatusContract = {name: "Open", statusContractId: 1};
  typeContract: TypeContract = {name: "Cầm đồ", typeContractId: 1};
  listTypeProduct: TypeProduct[] = [];
  classProductName: string = "form-control";
  classProductType: string = "form-control";
  classLoanMoney: string = "form-control";
  classEndDate: string = "form-control";
  typeProduct !: TypeProduct;
  pageCurrentCus: number = 0;
  totalPageCus: number = 0;
  searchValueCus: string = "";
  pageCurrentEmployee: number = 0;
  totalPageEmployee: number = 0;
  searchValueEmployee: string = "";

  constructor(private customerService: CustomerService,
              private employeeService: EmployeeService,
              private contractService: ContractService
  ) {
  }

  ngOnInit(): void {
    this.getListCustomer(0);
    this.getListEmployee(0);
    this.getLisTypeProduct();

    this.formCreate = new FormGroup({
        customerId: new FormControl('', [Validators.required]),
        employeeId: new FormControl('', [Validators.required]),
        productName: new FormControl('', [Validators.required]),
        productType: new FormControl(0, [validSelectValidators()]),
        loanMoney: new FormControl(0, [Validators.required, Validators.min(500000)]),
        interestMoney: new FormControl(0),
        startDate: new FormControl(this.dateCurrent, [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        imgProduct: new FormControl('', [Validators.required])
      }, {validators: [validDateCheckoutValidators('startDate', 'endDate')]}
    );
  }

  getListCustomer(page:number) {
    this.customerService.getListCustomer1(page).subscribe(
      data => {
        this.customerList = data.content;
        this.totalPageCus = data.totalPages;
        this.pageCurrentCus = data.pageable.pageNumber;
      }
    )
  }

  nextPageCus() {
    if (this.searchValueCus != "") {
      this.searchCustomer(this.searchValueCus, (this.pageCurrentCus + 1));
    } else {
      this.getListCustomer((this.pageCurrentCus + 1));
    }
  }

  prevPageCus() {
    if (this.searchValueCus != "") {
      this.searchCustomer(this.searchValueCus, (this.pageCurrentCus - 1));
    } else {
      this.getListCustomer((this.pageCurrentCus - 1));
    }
  }

  changeClass() {
    const CONTROLS = this.formCreate.controls;

    if (CONTROLS.productName.invalid) {
      this.classProductName = "form-control inValid-input";
    } else {
      this.classProductName = "form-control valid-input"
    }
    if (CONTROLS.productType.invalid) {
      this.classProductType = "form-control inValid-input";
    } else {
      this.classProductType = "form-control valid-input"
    }
    if (CONTROLS.loanMoney.invalid) {
      this.classLoanMoney = "form-control inValid-input";
    } else {
      this.classLoanMoney = "form-control valid-input"
    }
    if (CONTROLS.endDate.invalid) {
      this.classEndDate = "form-control inValid-input";
    } else {
      this.classEndDate = "form-control valid-input"
    }
  }

  chooseCustomer(customerId: string, name: string) {
    this.customerName = name;
    this.formCreate.controls.customerId.setValue(customerId);
  }

  removeCus() {
    this.customerName = "";
  }

  getListEmployee(page:number) {
    this.employeeService.getListEmployee(page).subscribe(
      data => {
        this.employeeList = data.content;
        this.totalPageEmployee = data.totalPages;
        this.totalPageEmployee = data.pageable.pageNumber;
      }
    );
  }

  nextPageEmployee() {
    if (this.searchValueCus != "") {
      this.searchEmployee(this.searchValueCus, (this.pageCurrentCus + 1));
    } else {
      this.getListEmployee((this.pageCurrentCus + 1));
    }
  }

  prevPageEmployee() {
    if (this.searchValueCus != "") {
      this.searchEmployee(this.searchValueCus, (this.pageCurrentCus - 1));
    } else {
      this.getListEmployee((this.pageCurrentCus - 1));
    }
  }

  chooseEmployee(employeeId: string, name: string) {
    this.employeeName = name;
    this.formCreate.controls.employeeId.setValue(employeeId);
  }

  removeEmployee() {
    this.employeeName = "";
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  changeValueLoan() {
    this.loanMoney = this.formCreate.value.loanMoney;
    this.formCreate.controls.interestMoney.setValue(this.loanMoney * 0.5);
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        let temp = new FileUpload(file);

        this.contractService.pushFileToStorage(this.currentFileUpload).subscribe(
          url => {
            this.img = url;
            this.formCreate.controls.imgProduct.setValue(url);
          },
          error => {
            this.contractService.pushFileToStorage(temp).subscribe(
              url => {
                this.img = url;
              },
              error => {
                console.log('error');
              }
            );
          }
        );
      }
    }
  }

  getLisTypeProduct() {
    this.contractService.getListTypeProduct().subscribe(
      data => {
        this.listTypeProduct = data;
      }
    )
  }

  create() {
    this.contractID = "HD-" + Math.floor(Math.random() * 10000);
    const CONTROLS = this.formCreate.value;
    this.contractPawn = new ContractDto(this.contractID, CONTROLS.imgProduct, CONTROLS.productName, CONTROLS.interestMoney
      , 0, CONTROLS.loanMoney, '', CONTROLS.startDate, CONTROLS.endDate, 1, this.statusContract,
      this.typeProduct, this.typeContract, CONTROLS.employeeId, CONTROLS.customerId);
    this.contractService.saveNewContractPawn(this.contractPawn).subscribe(data => {
    });
  }

  chooseTypeProduct(typeProductId: number) {
    for (let i = 0; i < this.listTypeProduct.length; i++) {
      if (typeProductId == this.listTypeProduct[i].typeProductId) {
        this.typeProduct = this.listTypeProduct[i];
      }
    }
  }

  eventSearchCustomer(event: any) {
    this.searchValueCus = event.target.value;
    this.customerService.searchCustomer1(this.searchValueCus, 0).subscribe(data => {
      this.customerList = data.content;
      this.totalPageCus = data.totalPages;
      this.pageCurrentCus = data.pageable.pageNumber;
      console.log(this.customerList);
    });
  }

  searchCustomer(valueSearch:string,page:number){
    this.customerService.searchCustomer1(valueSearch, page).subscribe(data => {
      this.customerList = data.content;
      this.totalPageCus = data.totalPages;
      this.pageCurrentCus = data.pageable.pageNumber;
    })
  }

  eventSearchEmployee(event: any) {
    this.searchValueEmployee = event.target.value;
    this.employeeService.searchEmployee(this.searchValueEmployee, 0).subscribe(data => {
      this.employeeList = data.content;
      this.totalPageEmployee = data.totalPages;
      this.pageCurrentEmployee = data.pageable.pageNumber;
    });
  }

  searchEmployee(valueSearch:string,page:number){
    this.employeeService.searchEmployee(valueSearch, page).subscribe(data => {
      this.employeeList = data.content;
      this.totalPageEmployee = data.totalPages;
      this.pageCurrentEmployee = data.pageable.pageNumber;
    });
  }


}
