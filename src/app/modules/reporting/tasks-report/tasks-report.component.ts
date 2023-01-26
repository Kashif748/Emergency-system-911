import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '@core/api/services/task.service';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Page } from 'src/app/core/api/models/page.model';
import { CommonService } from 'src/app/core/services/common.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { TranslationService } from '../../i18n/translation.service';
import * as moment from 'moment';
import { AppCommonData } from '@core/entities/AppCommonData';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tasks-report',
  templateUrl: './tasks-report.component.html',
  styleUrls: ['./tasks-report.component.scss'],
  providers: [DatePipe],
})
export class TasksReportComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertsService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.commonService.getCommonData();
  }

  // UI
  @ViewChild('picker') picker: any;

  // Variables
  public lang = 'en';
  public form: FormGroup;
  public currentDate = new Date();
  commonData: AppCommonData;
  statisticsData: any;
  loadingCharts = true;
  public paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'pagination',
  };
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate1: moment.Moment;
  public maxDate1: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public minDate = new Date(new Date().getFullYear() - 20, 0, 1);
  public maxDate = new Date(new Date().getFullYear() + 1, 11, 31);
  public dir$ = this.translationService.dir$;
  private sortState: { active: string; direction: 'asc' | 'desc' };
  public loading = false;
  public tasks: any[] = [];

  // status chart
  public chart9Options = {
    series: [],
    labels: [],
    chart: {
      height: '300',
      type: 'radialBar',
      fontFamily: 'Tajawal',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: 'zoom',
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: false,
            label: 'Total',
            formatter(w) {
              return (w?.config?.series as number[]).reduce(
                (pv, cv, ci) => cv + pv,
                0
              );
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom',
    },
    title: {
      text: this.translationService.get('REPORTING.TASKS.BY_STATUS.TITLE'),
    },
  };

  // types chart
  public chart7Options = {
    series: [],
    labels: [],
    chart: {
      fontFamily: 'Tajawal',
      type: 'donut',
      height: '300',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: 'zoom',
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      },
    },
    grid: {
      padding: {
        bottom: -80,
      },
    },
    legend: {
      position: 'bottom',
    },
    title: {
      text: this.translationService.get('REPORTING.TASKS.BY_TYPE.TITLE'),
    },
  };

  // priorities chart
  public chart4Options = {
    series: [],
    labels: [],
    chart: {
      type: 'donut',
      height: 300,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        // customScale: 0.8,
        donut: {
          // size: "75%",
        },
        // offsetY: 20,
      },
      stroke: {
        colors: undefined,
      },
    },
    colors: ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
    title: {
      text: this.translationService.get('REPORTING.TASKS.BY_IMPORTANCE.TITLE'),
    },
    legend: {
      position: 'bottom',
    },
  };

  // categories chart
  public chart5Options = {
    series: [],
    chart: {
      type: 'bar',
      height: 550,
      fontFamily: 'Tajawal',
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: false,
        dataLabels: {
          position: 'bottom',
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
      '#f9a3a4',
      '#90ee7e',
      '#f48024',
      '#69d2e7',
    ],
    dataLabels: {
      enabled: false,
      textAnchor: 'middle',
      style: {
        colors: ['#fff'],
      },
      formatter(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {},
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: this.translationService.get('REPORTING.INCIDENTS.BYCATEGORY.TITLE'),
      align: 'center',
      floating: true,
    },
    subtitle: {
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BYCATEGORY.SUB_TITLE'
      ),
      align: 'center',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: {
          formatter(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ':  ';
          },
        },
      },
    },
  };

  // emergency levels chart
  public chart6Options = {
    series: [],
    chart: {
      type: 'bar',
      fontFamily: 'Tajawal',
      height: '300',
      stacked: true,
      stackType: '100%',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BYEMERGENCY_LEVEL.TITLE'
      ),
    },
    xaxis: {
      categories: [''],
    },
    tooltip: {
      y: {
        formatter(val) {
          return val;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  // status chart
  public chart8Options = {
    series: [],
    chart: {
      height: 300,
      type: 'pie',
      fontFamily: 'Tajawal',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: 'zoom',
      },
    },
    labels: [],
    title: {
      text: this.translationService.get('REPORTING.INCIDENTS.BY_STATUS.TITLE'),
    },
    legend: {
      position: 'bottom',
    },
  };

  async ngOnInit() {
    this.form = this.buildForm();
    this.pageChanged(0);
    this.cdr.detectChanges();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      status: [],
      title: [],
      priority: [],
      startDueDate: [],
      endDueDate: [],
      desc: [],
      assignedTo: [],
      createdByOrg: [],
      createdByUser: [],
    });
  }

  public downloadPDF() {
    this.loading = true;
    this.taskService
      .downloadReport('PDF', this.lang == 'ar', this.form.value)
      .subscribe(
        (res) => {},
        (e) => {
          console.error(e);
          this.alertService.openFailureSnackBar();
        },
        () => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      );
  }

  public downloadXlsx() {
    this.loading = true;
    this.taskService
      .downloadReport('EXCEL', this.lang == 'ar', this.form.value)
      .subscribe(
        (res) => {},
        (e) => {
          console.error(e);
          this.alertService.openFailureSnackBar();
        },
        () => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      );
  }

  public search() {
    this.pageChanged(0);
  }

  public async clear() {
    this.form.reset();
    await this.pageChanged(0);
  }

  pageChanged(event) {
    this.paginationConfig.currentPage = event;
    this.loadTasks(event);
  }

  async sortChange(event) {
    this.sortState = event;
    await this.pageChanged(this.paginationConfig.currentPage);
  }

  private taskMap = (result: Page) => {
    const tasks = result.content;
    tasks.forEach(async (task) => {
      task.body = `${task.body?.substr(0, 50)?.substr(0, 50)} ${
        task?.body?.length > 50 ? '...' : ''
      }`;

      task.dueDate = new Date(task.dueDate);
      // set task priority
      task.priority = { id: task?.priority?.id ?? task?.priorityId };
      const priority = _.find(this.commonData?.priorities, [
        'id',
        task?.priority?.id,
      ]);
      // set task priority
      task.priority = { id: task?.priority?.id ?? task?.priorityId };
      task.priority = _.find(this.commonData.priorities, [
        'id',
        task?.priority?.id,
      ]);

      // set task status
      task.status = { id: task.status?.id ?? task.statusId };
      const status = _.find(this.commonData?.taskStatus, [
        'id',
        task?.status?.id,
      ]);
      if (!_.isEmpty(status)) {
        task.status.name = this.lang === 'en' ? status.nameEn : status.nameAr;
      }
    });
    this.cdr.detectChanges();
    return { tasks, totalElements: result?.totalElements };
  };

  private loadTasks(page) {
    this.loading = true;
    const data = this.taskService
      .getAll(
        { page: page <= 0 ? 0 : page - 1, size: 10 },
        this.form.value,
        this.sortState
      )
      .pipe(map(this.taskMap))
      .subscribe(
        (data) => {
          this.tasks = data?.tasks;
          this.paginationConfig.totalItems = data.totalElements;
          this.loading = false;
          this.cdr.detectChanges();
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          this.loading = false;
          this.cdr.detectChanges();
        }
      );

    this.initCharts2();
  }

  // ------------------------------- charts ---------------------------------------------------

  initCharts2() {
    const statisticsDataReq = this.taskService.getStatistics(this.form.value);
    const taskTypesReq = this.taskService.getTypes();

    forkJoin({
      statisticsData: statisticsDataReq,
      taskTypes: taskTypesReq,
    }).subscribe(({ statisticsData, taskTypes }) => {
      const result = JSON.parse(JSON.stringify(statisticsData));
      const statuses = result['taskStatus'];
      this.chart9Options.labels = [];
      this.chart9Options.series = [];
      statuses.forEach((element) => {
        const status = this.commonData?.taskStatus.find(
          (item) => item.id == element['key']
        );
        if (status) {
          this.chart9Options.labels.push(
            this.lang == 'en' ? status?.nameEn : status?.nameAr
          );
          const percent = ((100 * element.count) / result['totalTask']).toFixed(
            1
          );
          this.chart9Options.series.push(parseFloat(percent));
        }
      });

      const priorities = result['priority'];
      this.chart4Options.labels = [];
      this.chart4Options.series = [];
      priorities.forEach((element) => {
        const priority = this.commonData?.priorities.find(
          (item) => item.id == element['key']
        );
        if (priority) {
          this.chart4Options.labels.push(
            this.lang == 'en' ? priority?.nameEn : priority?.nameAr
          );
          const percent = ((100 * element.count) / result['totalTask']).toFixed(
            1
          );
          this.chart4Options.series.push(parseFloat(percent));
        }
      });

      const taskType = result['taskType'];
      this.chart7Options.labels = [];
      this.chart7Options.series = [];
      taskType.forEach((element) => {
        const type = taskTypes.find((item) => item.id == element['key']);
        if (type) {
          this.chart7Options.labels.push(
            this.lang == 'en' ? type?.nameEn : type?.nameAr
          );
          const percent = ((100 * element.count) / result['totalTask']).toFixed(
            1
          );
          this.chart7Options.series.push(parseFloat(percent));
        }
      });
      this.statisticsData = result;
      this.loadingCharts = false;
      this.cdr.detectChanges();
    });
  }
}
