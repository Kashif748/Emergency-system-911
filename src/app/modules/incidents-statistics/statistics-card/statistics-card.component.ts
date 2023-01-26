import { Directionality } from '@angular/cdk/bidi';
import {
  Component,
  ViewChild,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { TranslationService } from '../../i18n/translation.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss'],
})
export class StatisticsCardComponent implements OnInit, OnChanges {
  @Input('data') data: any[] = [];

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  lang = 'en';

  datesToView = 30;
  constructor(
    private translationService: TranslationService,
    public directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.genrateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.genrateData();
  }

  genrateData() {
    let series = [];
    let dates = [];

    // to  extract all  dates
    this.data.forEach((centerData) => {
      centerData.statistics.forEach((item) => {
        dates.push(item.date);
      });
    });
    dates = [...new Set(dates.slice(0, this.datesToView))];

    this.data.forEach((centerData) => {
      let obj = {
        name: this.lang == 'en' ? centerData.nameEn : centerData.nameAr,
        data: new Array(dates.length).fill(0),
      };
      centerData.statistics.forEach((item, index) => {
        let i = dates.findIndex((dateItem) => item.date == dateItem);
        if (index < this.datesToView && i >= 0) obj.data[i] = item.log;
      });
      series.push(obj);
    });

    this.initCharts(series, dates);
  }

  initCharts(series, dates) {
    const dynamicWidth = series.length * 100;
    const chartWidth = dynamicWidth < window.innerWidth ? '100%' : dynamicWidth;

    // var max = new Date().getTime(); // Current timestamp
    // var min = new Date(
    //   new Date().setDate(1)
    // ).getTime(); // timestamp 90 days before
    // var range = max - min;
    this.chartOptions = {
      series: series,
      chart: {
        type: 'bar',
        height: 350,
        // width: chartWidth,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
        events: {
          beforeZoom: function (ctx) {
            // we need to clear the range as we only need it on the iniital load.
            ctx.w.config.xaxis.range = undefined;
          },
          zoomed: (chartContext, { xaxis, yaxis }) => {
            this.test({ xaxis, yaxis });
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'datetime',
        categories: dates,

        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'M-yyyy',
            day: 'dd-M',
            hour: 'HH:mm',
          },
        },
      },
      legend: {
        position: 'right',
        offsetY: 40,
        formatter: function (legendName, opts?) {
          return `   ${legendName} `;
        },
      },
      fill: {
        opacity: 1,
      },
    };
  }

  test({ xaxis, yaxis }) {}
}
