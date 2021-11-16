import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Statistic} from "../../interface/statistic";
import {StatisticService} from "../../services/statistic.service";
import {Title} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-statistic-liquidation',
  templateUrl: './statistic-liquidation.component.html',
  styleUrls: ['./statistic-liquidation.component.css']
})
export class StatisticLiquidationComponent implements OnInit {
  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 365), 'dd/MM/yyyy');
  today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  @ViewChild('chart') chart!: ChartComponent|any;
  public chartOptions: Partial<ChartOptions>|any;
  check = false;
  checkStartDate = this.pastDay;
  checkEndDate = this.today;
  startDate!: string;
  endDate!: string;
  checkDateForm!: FormGroup;
  listContractId: string[]=[];
  contract: Statistic[] = [];
  isCheckStatistic = false;
  totalMoney = 0;

  constructor(private statisticService: StatisticService,
              private titleService: Title,
              private datePipe: DatePipe) {
    this.titleService.setTitle('Thống kê');
    this.getEndDateStartDate();

  }

  ngOnInit(): void {
  }
  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('checkStartDate');
    const toDate = check.get('checkEndDate');
    // @ts-ignore
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  getEndDateStartDate() {
    this.checkDateForm = new FormGroup({
      checkStartDate: new FormControl('', [Validators.required]),
      checkEndDate: new FormControl('',[Validators.required])
    }, this.checkDate);
  }

  getLoanMoney() {
    this.statisticService.getStatisticLiquidation(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[0].data.push(Number(this.contract[i].loanMoney));
      }
    }, error => {
      console.log(error);
    });
  }

  getReceiveMoney() {
    this.statisticService.getStatisticLiquidation(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[1].data.push(Number(this.contract[i].receiveMoney));
      }

    }, error => {
      console.log(error);
    });
  }

  getInterestMoney() {
    this.statisticService.getStatisticLiquidation(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[2].data.push(Number(this.contract[i].interestMoney));
      }

    }, error => {
      console.log(error);
    });
  }

  getContractCode() {
    this.statisticService.getStatisticLiquidation(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
          this.listContractId.push(this.contract[i].contractId)
      }

    }, error => {
      console.log(error);
    });
  }

  getStatistic() {
    this.check = true;
    this.isCheckStatistic = true;
    if (this.isCheckStatistic) {
      this.totalMoney=0;
      // @ts-ignore
      this.startDate = this.formatDate(this.checkDateForm.get('checkStartDate').value);
      // @ts-ignore
      this.endDate = this.formatDate(this.checkDateForm.get('checkEndDate').value);
      this.getContractCode();
      this.statisticLiquidation();
      this.getLoanMoney();
      this.getReceiveMoney();
      this.getInterestMoney()
    }
  }

  statisticLiquidation(){
    this.chartOptions = {
      series: [
        {
          name: "Tiền tổng vay",
          type: "column",
          data: []
        },
        {
          name: "Tiền thanh lí",
          type: "column",
          data: []
        },
        {
          name: "Tiền lãi",
          type: "line",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: this.listContractId
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: "Tổng vay (VND)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Tổng vay",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: "Tiền thanh lí (VND)",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Thanh lí",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {
              color: "#FEB019"
            }
          },
          title: {
            text: "Tiên lãi (VND)",
            style: {
              color: "#FEB019"
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }
  formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('/');
  }

}
