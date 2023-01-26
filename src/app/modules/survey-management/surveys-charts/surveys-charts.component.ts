import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SurveysManagementService} from '@core/api/services/surveys-management.service';
import {ApexNonAxisChartSeries, ApexChart, ChartComponent} from 'ng-apexcharts';
import {catchError, skip, tap} from 'rxjs/operators';
import {TranslationService} from '../../i18n/translation.service';

export type ChartOptions_H = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  tooltip: ApexTooltip;
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-surveys-charts',
  templateUrl: './surveys-charts.component.html',
  styleUrls: ['./surveys-charts.component.scss'],
})
export class SurveysChartsComponent implements OnInit {
  // UI
  // tslint:disable-next-line:variable-name
  @ViewChild('chart_H') chart_H: ChartComponent;
  // tslint:disable-next-line:variable-name
  public chartOptions_H: Partial<ChartOptions_H>;
  // tslint:disable-next-line:variable-name
  @ViewChild('chart_R') chart_R: ChartComponent;
  // tslint:disable-next-line:variable-name
  public chartOptions_R: Partial<any>;
  // Variables
  feels;
  reasons;
  totalIncidentSurvey = 0;
  lang = 'en';
  loading = true;

  constructor(
    private translationService: TranslationService,
    private surveyService: SurveysManagementService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.surveyService.getStatistics();
    this.surveyService.onChartsData
      .pipe(
        skip(1),
        tap((data) => {

          this.totalIncidentSurvey = data['totalIncidentSurvey'];
          this.feels = data['happiness'];
          this.reasons = data['reasons'];
          this.initChart1();
          this.initChart2();
          setTimeout(() => {
            this.loading = false;
          }, 200);
          this.cdr.detectChanges();
        }),
        catchError((e: any) => {
          this.loading = false;
          return e;
        })
      ).subscribe();

    this.lang = this.translationService.getSelectedLanguage();
  }

  initChart1() {
    this.chartOptions_H = {
      series: this.feels.map((item) => {
        return (item['count'] / this.totalIncidentSurvey) * 100;
      }),
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: this.feels.map((item) => {
        return this.lang == 'en' ? item.nameEn : item.nameAr;
      }),

      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          formatter(val, opt?) {
            return '';
          },
        },
        z: {
          formatter: undefined,
        },
      },
    };
  }

  initChart2() {
    this.chartOptions_R = {
      series: [
        {
          data: this.reasons.map((item) => {
            return item['count'];
          }),
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          dataLabels: {
            enabled: false,
            show: false,
          },
        },
      },
      colors: [
        '#33b2df',
        '#546E7A',
        '#d4526e',
        '#13d8aa',
        '#A5978B',
        '#2b908f',
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['black'],
          fontFamily: 'Tajawal',
        },
        formatter(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
        offsetX: 0,
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: this.reasons.map((item) => {
          return this.lang == 'en' ? item.nameEn : item.nameAr;
        }),
      },
      yaxis: {
        labels: {
          show: false,
        },
        max:
          Math.max.apply(
            Math,
            this.reasons.map((o) => {
              return o.count;
            })
          ) + 1,
      },

      tooltip: {
        theme: 'dark',
        x: {
          show: false,
          formatter: undefined,
        },
        y: {
          title: {
            formatter(val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex];
            },
          },
        },
        z: {
          formatter: undefined,
        },
      },
    };
  }
}
