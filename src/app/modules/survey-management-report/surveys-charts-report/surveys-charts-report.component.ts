import { I } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SurveysManagementService } from '@core/api/services/surveys-management.service';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { catchError, skip, tap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';

export type ChartOptions_H = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  tooltip: ApexTooltip;
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-surveys-charts-report',
  templateUrl: './surveys-charts-report.component.html',
  styleUrls: ['./surveys-charts-report.component.scss'],
})
export class SurveysChartsReportComponent implements OnInit {
  // UI
  // tslint:disable-next-line:variable-name
  @ViewChild('chart_H') chart_H: ChartComponent;
  // tslint:disable-next-line:variable-name
  public chartOptions_H1: Partial<ChartOptions_H>;
  public chartOptions_H2: Partial<ChartOptions_H>;
  public chartOptions_H3: Partial<ChartOptions_H>;
  // tslint:disable-next-line:variable-name
  @ViewChild('chart_R') chart_R: ChartComponent;
  // tslint:disable-next-line:variable-name
  public chartOptions_R: Partial<any>;
  // Variables
  feels;
  reasons: any;
  totalIncidentSurvey = 0;
  lang = 'en';
  loading = true;
  pieChartData: any;

  constructor(
    private translationService: TranslationService,
    public surveyService: SurveysManagementService,
    private cdr: ChangeDetectorRef
  ) {
    this.surveyService.getincidentSurveyConfig();
  }

  ngOnInit(): void {
    this.surveyService.getStatisticsReport();
    this.surveyService.onChartsData
      .pipe(
        skip(1),
        tap((data) => {
          this.pieChartData = data;
          this.initChart();
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          }, 200);
        }),
        catchError((e: any) => {
          this.loading = false;
          return e;
        })
      )
      .subscribe();

    this.lang = this.translationService.getSelectedLanguage();
  }

  initChart() {
    var labelArray = [];
    for (let index = 0; index < this.pieChartData.length; index++) {
      if (this.pieChartData[index].configId == 1) {
        this.totalIncidentSurvey = this.pieChartData[index].totalSurveyTypes;
        this.feels = this.pieChartData[index].types;
        for (let index = 0; index < this.feels.length; index++) {
          if (this.feels[index].count > 0) {
            labelArray.push(this.feels[index]);
          }
        }
        this.feels = labelArray;
        labelArray = [];
        this.chartOptions_H1 = {
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
      if (this.pieChartData[index].configId == 2) {
        this.totalIncidentSurvey = this.pieChartData[index].totalSurveyTypes;
        this.feels = this.pieChartData[index].types;
        for (let index = 0; index < this.feels.length; index++) {
          if (this.feels[index].count > 0) {
            labelArray.push(this.feels[index]);
          }
        }
        this.feels = labelArray;
        labelArray = [];
        this.chartOptions_H2 = {
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
      if (this.pieChartData[index].configId == 3) {
        this.totalIncidentSurvey = this.pieChartData[index].totalSurveyTypes;
        this.feels = this.pieChartData[index].types;
        for (let index = 0; index < this.feels.length; index++) {
          if (this.feels[index].count > 0) {
            labelArray.push(this.feels[index]);
          }
        }
        this.feels = labelArray;
        labelArray = [];
        this.chartOptions_H3 = {
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
    }
  }
}
