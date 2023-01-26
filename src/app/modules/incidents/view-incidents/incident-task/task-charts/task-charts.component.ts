import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import {ApexChart, ApexPlotOptions, ChartComponent} from 'ng-apexcharts';

import {isEmpty} from 'lodash';

import {LayoutService} from 'src/app/_metronic/core';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {TranslationService} from 'src/app/modules/i18n/translation.service';

import {map} from 'rxjs/operators';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-task-charts',
  templateUrl: './task-charts.component.html',
  styleUrls: ['./task-charts.component.scss'],
})
export class TaskChartsComponent implements OnInit {
  // UI
  @ViewChild('chart', {static: false}) chart: ChartComponent;
  @Input() incidentId;

  // Variables
  svgColoersClasses = [
    'warning',
    'primary',
    'danger',
    'secondary',
    'success',
    'dark',
    'info',
    'dark-75',
    'dark-25',
  ];
  colorsThemeBaseSuccess: string;
  colorsThemeLightSuccess: string;
  fontFamily: string;
  incidentTasks: any = [];
  assign = 0;
  supplies = 0;
  mission = 0;
  lang = 'en';
  showChart = false;
  public taskStatusChartLoading = false;
  public taskTypeChartLoading = false;
  private readonly taskStatus: { id: any; nameAr: any; nameEn: any }[];
  taskTypeChartOptions: any;
  taskStatusChartOptions: any;
  private totalCount: number;


  constructor(
    private layout: LayoutService,
    private incidentsService: IncidentsService,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private commonService: CommonService
  ) {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.lang = this.translationService.getSelectedLanguage();
    this.taskStatus = this.commonService.getCommonData()?.taskStatus;
  }


  async ngOnInit(): Promise<void> {
    this.taskTypeChartOptions = {
      title: '',
      series: [this.assign, this.supplies, this.mission],
      chart: {
        type: 'pie',
        width: '300px',
        fontFamily: 'Tajawal',
      },
      labels:
        this.lang === 'en'
          ? ['Information', 'Supplies', 'Mission']
          : ['معلومات', 'موارد', 'مهمة'],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
      },
      yaxis: {
        show: false,
      },
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'center',
        fontFamily: 'Tajawal',
      },

      plotOptions: {},
      theme: {
        mode: 'light',

        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
    };

    this.taskStatusChartOptions = {
      title: '',
      series: [],
      chart: {
        type: 'pie',
        width: '300px',
      },
      labels: this.taskStatus.map((ts) =>
        this.lang == 'en' ? ts.nameEn : ts.nameAr
      ),
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
      },
      yaxis: {
        show: false,
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
      },

      plotOptions: {},
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: 'light',
          shadeIntensity: 0.6,
        },
      },
    };

    this.taskTypeChartLoading = true;
    this.taskStatusChartLoading = true;
    const data = await this.incidentsService
      .getIncidentTasksCal(this.incidentId)
      .toPromise();
    if (data) {
      this.incidentTasks = data.result.content;
      this.totalCount = data.result.totalElements;
      this.getvalues();
    }
    this.taskTypeChartLoading = false;
    this.cd.detectChanges();
    const counts = [7];
    try {
      const statusStats = await this.incidentsService
        .getIncidentTaskStatusStatstics(this.incidentId)
        .pipe(map((r) => r.result))
        .toPromise();

      const taskStatusKeyMap = {
        1: 'notViewed',
        2: 'viewed',
        3: 'accepted',
        4: 'rejected',
        5: 'requiredMoreInformation',
        6: 'inProgress',
        7: 'completed',
      };
      for (const ts of this.taskStatus) {
        counts[
          this.taskStatusChartOptions.labels.indexOf(
            this.lang == 'en' ? ts.nameEn : ts.nameAr
          )
          ] =
          (statusStats[taskStatusKeyMap[`${ts.id}`]] * 100) /
          statusStats?.totalTasks;
      }
    } catch {
      for (const ts of this.taskStatus) {
        const c = await this.incidentsService
          .getTaskCountByStatus(this.incidentId, ts.id)
          .toPromise();

        counts[
          this.taskStatusChartOptions.labels.indexOf(
            this.lang == 'en' ? ts.nameEn : ts.nameAr
          )
          ] = (c * 100) / this.totalCount;
      }
    }

    this.taskStatusChartLoading = false;
    this.cd.detectChanges();
    this.taskStatusChartOptions.series = counts;
    this.cd.detectChanges();
  }

  getvalues() {
    this.incidentTasks.forEach((element) => {
      switch (element.taskType.id) {
        case 1:
          this.mission++;
          break;

        case 2: {
          this.supplies++;
          break;
        }
        case 3: {
          this.assign++;
          break;
        }
        default: {
          break;
        }
      }
    });

    if (!isEmpty(this.incidentTasks)) {
      this.assign = (100 * this.assign) / this.incidentTasks.length;
      this.supplies = (100 * this.supplies) / this.incidentTasks.length;
      this.mission = (100 * this.mission) / this.incidentTasks.length;
    }

    this.taskTypeChartOptions.series = [
      this.assign,
      this.supplies,
      this.mission,
    ];
  }

}
