import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {DatePipe, formatDate} from '@angular/common';
import {Statistic} from "../../interface/statistic";
import {StatisticService} from "../../services/statistic.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-statistic-interest',
  templateUrl: './statistic-interest.component.html',
  styleUrls: ['./statistic-interest.component.css']
})
export class StatisticInterestComponent implements OnInit {
  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 365), 'dd/MM/yyyy');
  today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

  @ViewChild('chart') chart!: ChartComponent|any;
  public chartOptions: Partial<ChartOptions>|any;
  check = false;
  checkStartDate = this.pastDay;
  checkEndDate = this.today;
  startDate: string = '';
  endDate: string = '';
  checkDateForm!: FormGroup;
  contract: Statistic[] = [];
  isCheckStatistic = false;
  totalMoney = 0;
  label: string[] = [];
  interestMoney: string[] = [];
  loanMoney: string[] = [];
  constructor(private statisticService: StatisticService,
              private titleService: Title,
              private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Thống kê');
    this.checkDateForm = new FormGroup({
      checkStartDate: new FormControl('', [Validators.required]),
      checkEndDate: new FormControl('',[Validators.required])
    }, this.checkDate);
  }

  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('checkStartDate');
    const toDate = check.get('checkEndDate');
    // @ts-ignore
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  getContractCode() {
    this.statisticService.getStatisticInterest(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      let month = new Date(this.contract[0].startDate);
      let tempLoanMoney = 0;
      let tempInterestMoney = 0;
      for(let i=0; i<this.contract.length; i++){
        this.totalMoney += this.contract[i].interestMoney;
        let startMonth = new Date(this.contract[i].startDate);
        if(month.getMonth() == startMonth.getMonth()){
          tempLoanMoney += this.contract[i].loanMoney;
          tempInterestMoney += this.contract[i].interestMoney;
        }
        else {
          this.interestMoney.push(tempInterestMoney+'');
          this.loanMoney.push(tempLoanMoney+'');
          this.label.push("Tháng " + (month.getMonth()+1));
          tempLoanMoney = this.contract[i].loanMoney;
          tempInterestMoney = this.contract[i].interestMoney;
          month = startMonth;
        }
      }
      this.interestMoney.push(tempInterestMoney+'');
      this.loanMoney.push(tempLoanMoney+'');
      this.label.push("Tháng " + (month.getMonth()+1));
      this.statisticInterest();
    }, error => {
      console.log(error);
    });
  }

  getStatistic() {
    this.check = true;
    this.isCheckStatistic = true;
    if (this.isCheckStatistic) {
      this.loanMoney = [];
      this.label = [];
      this.interestMoney = [];
      this.totalMoney=0;
      this.startDate = formatDate(this.checkDateForm.controls.checkStartDate.value, 'dd/MM/yyyy', 'en-US');
      this.endDate = formatDate(this.checkDateForm.controls.checkEndDate.value, 'dd/MM/yyyy', 'en-US');
      this.getContractCode();
    }
  }

  statisticInterest() {
    this.chartOptions = {
      series: [
        {
          name: 'Tiền cho vay',
          type: 'column',
          data: this.loanMoney
        },
        {
          name: 'Tiền lãi',
          type: 'area',
          data: this.interestMoney
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: this.label
      },
      labels: [''],

      markers: {
        size: 0
      },
      yaxis: {
        title: {
          text: 'VND'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y:any) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' VND';
            }
            return y;
          }
        }
      }
    };
  }
}
