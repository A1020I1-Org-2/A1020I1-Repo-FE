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
import {DatePipe} from '@angular/common';
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
  selector: 'app-statistic-expected',
  templateUrl: './statistic-expected.component.html',
  styleUrls: ['./statistic-expected.component.css']
})
export class StatisticExpectedComponent implements OnInit {
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

  getContract() {
    this.statisticService.getStatisticExpected(this.startDate, this.endDate).subscribe(value => {
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

  getProfit() {
    this.statisticService.getStatisticExpected(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[1].data.push(Number(this.contract[i].interestMoney));
      }

    }, error => {
      console.log(error);
    });
  }

  getContractCode() {
    this.statisticService.getStatisticExpected(this.startDate, this.endDate).subscribe(value => {
      this.contract = value;
      this.chartOptions.labels[0] = this.contract[0].contractId;
      this.totalMoney += Number(this.contract[0].interestMoney);
      for (let i = 1; i < this.contract.length; i++) {
        this.totalMoney += Number(this.contract[i].interestMoney);
        this.chartOptions.labels.push(this.contract[i].contractId);
        console.log(this.contract[i].contractId);
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
      this.statisticInterest();
      this.getContractCode();
      this.getContract();
      this.getProfit();
    }
  }

  statisticInterest() {
    this.chartOptions = {
      series: [
        {
          name: 'Tổng tiền cho vay',
          type: 'column',
          data: []
        },
        {
          name: 'Tiền lãi',
          type: 'area',
          data: []
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
        categories: []
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
