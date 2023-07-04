import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { map } from 'rxjs/operators';
import { IStorageService } from 'src/app/core/services/storage.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { IncidentsService } from '@core/api/services/incident.service';
import { TranslationService } from '../../i18n/translation.service';
import * as _ from 'lodash';
import { ICategory } from '../model/incidents-report';
import {
  DataOptions,
  FormFieldName,
} from '@shared/components/advanced-search/advanced-search.component';
import { AdvancedSearchFieldsEnum } from '@shared/components/advanced-search/advancedSearch.model';
import { IncidentFilter } from '@core/api/models/filters.model';
import { AppCommonData } from '@core/entities/AppCommonData';
import { CommonService } from '@core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INTERIM_STATUS } from '../../incidents/new-incidents-view/const';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { GroupService } from '@core/api/services/group.service';
import { Store } from '@ngrx/store';
import { UpdateFilter } from '../../incidents/new-incidents-view/store/incidents-dashboard.actions';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-incidents-report',
  templateUrl: './incidents-report.component.html',
  styleUrls: ['./incidents-report.component.scss'],
})
export class IncidentsReportComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    private translationService: TranslationService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private incidentService: IncidentsService,
    private storageService: IStorageService,
    private alertService: AlertsService,
    private commonService: CommonService,
    private router: Router,
    protected groupService: GroupService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.commonData = this.commonService.getCommonData();
    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 0,
      totalItems: 0,
      id: 'pagination',
    };

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 10, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  public incidents: any[] = [];
  public lang = 'en';
  public commonData: AppCommonData;
  public paginationConfig: any;
  public statuses = {};
  public emergencyLevels = {};
  public priorities = {};
  public cities = {};
  public categories = {};
  public mainCategories: ICategory[] = [];
  public reportingVias = {};
  public groups: any[] = [];
  public riskImpacts = {};
  ProBackstyle: any;
  public form: FormGroup;
  public minDate: Date;
  public maxDate: Date;
  public advancedSearchDataList: DataOptions[] = [];
  public formFields: FormFieldName[] = [
    { formControlName: AdvancedSearchFieldsEnum.CATEGORY },
    { formControlName: AdvancedSearchFieldsEnum.SUB_CATEGORY },
    { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
    { formControlName: AdvancedSearchFieldsEnum.SR_NO },
    { formControlName: AdvancedSearchFieldsEnum.SERIAL },
    { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
    { formControlName: AdvancedSearchFieldsEnum.END_DATE },
    { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
    { formControlName: AdvancedSearchFieldsEnum.CITY },
    { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
    { formControlName: AdvancedSearchFieldsEnum.CREATED_BY },
    { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
    { formControlName: AdvancedSearchFieldsEnum.STATUS },
    { formControlName: AdvancedSearchFieldsEnum.GROUP },
  ];
  public loading = true;
  public resetForm = new FormControl(false);
  filter: IncidentFilter;
  @ViewChild('panel') panel: MatExpansionPanel;
  // ----------------------------------- charts ---------------------------------
  public loadingCharts = true;

  // priorities chart
  public chart4Options = {
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
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BY_IMPORTANCE.TITLE'
      ),
    },
    series: [],
    labels: [],
    legend: {
      position: 'bottom',
    },
  };

  // categories chart
  public chart5Options = {
    series: [],
    chart: {
      type: 'bar',
      height: '300',
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

    legend: {
      show: true,
    },
  };

  // emergency levels chart
  public chart6Options = {
    series: [],
    chart: {
      type: 'bar',
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

  // risk impacts chart
  public chart7Options = {
    series: [],
    labels: [],
    chart: {
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
    dataLabels: {
      enabled: true,
      formatter(val) {
        return val.toFixed(2) + '%';
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
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BY_RISK_IMPACT.TITLE'
      ),
    },
  };

  // status chart
  public chart8Options = {
    series: [],
    chart: {
      height: 300,
      type: 'pie',
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
      enabled: true,
      formatter(val) {
        return val.toFixed(2) + '%';
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
  // city chart
  public chart9Options = {
    series: [],
    chart: {
      height: '300',
      type: 'radialBar',
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
            show: true,
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
    labels: [],
    legend: {
      position: 'bottom',
    },
    title: {
      text: this.translationService.get('REPORTING.INCIDENTS.BY_CITY.TITLE'),
    },
  };

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();

    // initialize search form
    this.createForm();
    this.route.queryParams.subscribe(async (params) => {
      console.log(params);
      // this.form.patchValue(params);
      this.filter = {
        ...params,
        fromDate: params['startDate'],
        toDate: params['endDate'],
        organization: params['orgId'],
        category: params['mainCategoryId'],
        categoryId: params['mainCategoryId'],
      };
      this.store.dispatch(UpdateFilter({ filter: this.filter }));
      this.search();
      await this.initCharts();
    });
    const statuses: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.STATUS,
      children: this.commonData.incidentStatus,
    };
    const priorities: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.PRIORITY,
      children: this.commonData.priorities,
    };
    const cities: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.CITY,
      children: this.commonData.cities,
    };
    const mainCategories: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.CATEGORY,
      children: this.commonData?.incidentCategories?.filter(
        (cat: ICategory) => cat.parent === null
      ),
    };
    const subCategories: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.SUB_CATEGORY,
      children: []
    };
    const reportingVias: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA,
      children: this.commonData?.reportingVias,
    };
    const group: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.GROUP,
      children: this.groups,
    };
    this.advancedSearchDataList = [
      priorities,
      cities,
      mainCategories,
      subCategories,
      reportingVias,
      statuses,
      group,
    ];
    console.log(statuses);
    console.log(group);
    this.filter = {};
    // this.getIncidents(this.paginationConfig.currentPage);
    const org = this.commonData.currentOrgDetails;
    this.loadNonGlobalGroups(org.id, 0, 10);
  }

  export({ selectedColumns, isPDF }): void {
    console.log(selectedColumns);
    if (isPDF) {
      this.downloadPDF(selectedColumns);
    } else {
      this.downloadXlsx(selectedColumns);
    }
  }
  public async downloadPDF(selectedColumns) {
    this.loading = true;
    let pageNumber = 0;
    if (this.paginationConfig.currentPage > 1) {
      pageNumber = this.paginationConfig.currentPage - 1;
    }
    await this.incidentService
      .downloadReport(
        'PDF',
        pageNumber,
        {
          ...this.filter,
        },
        selectedColumns
      )
      .toPromise();
    this.loading = false;
    this.cdr.detectChanges();
  }

  public async downloadXlsx(selectedColumns) {
    this.loading = true;
    let pageNumber = 0;
    if (this.paginationConfig.currentPage > 1) {
      pageNumber = this.paginationConfig.currentPage - 1;
    }
    await this.incidentService
      .downloadReport(
        'EXCEL',
        pageNumber,
        {
          ...this.filter,
        },
        selectedColumns
      )
      .toPromise();
    this.loading = false;
    this.cdr.detectChanges();
  }

  createForm() {
    this.form = this.fb.group({
      status: [''],
      priority: [''],
      sr: [''],
      createdDate: [''],
      endDate: [''],
      subject: [''],
      desc: [''],
      city: [],
      category: [],
      reportingVia: [],
      createdByUser: [null],
      responsibleOrg: [],
    });
  }

  search() {
    this.loading = true;

    if (this.form.value.createdDate != '') {
      this.form.value.createdDate = DateTimeUtil.format(
        new Date(this.form.value.createdDate),
        DateTimeUtil.DATE_FORMAT
      );
    }

    if (this.form.value.endDate != '') {
      this.form.value.endDate = DateTimeUtil.format(
        new Date(this.form.value.endDate),
        DateTimeUtil.DATE_FORMAT
      );
    }

    this.pageChanged(1);
    this.panel.close();
  }

  pageChanged(event) {
    this.paginationConfig.currentPage = event;
    this.getIncidents(event - 1);
  }

  onFilterChanged(e) {
    this.filter = e;
    this.pageChanged(1);
    this.panel.close();
    this.initCharts();
  }

  customSort(event) {
    this.loading = true;
    this.getIncidents(0, event);
  }

  getPriorityNameId(id) {
    const priority = _.find(this.commonData.priorities, ['id', id]);
    if (priority) {
      this.ProBackstyle = `text-dark font-weight-500 label label-lg label-${priority?.color} label-inline text-white`;
      return this.lang === 'en' ? priority.nameEn : priority.nameAr;
    }
  }

  async getIncidents(
    page: number,
    sort?: { active: string; direction: 'asc' | 'desc' }
  ) {
    this.loading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.incidentService
        .getAllWithFilters(page, this.filter, sort)
        .pipe(
          map((res) => {
            res.result.content = res.result.content.map((item) => {
               item['incidentDate'] = this.convertDate(item['incidentDate'])
              return item;
            });
            return res;
          })
        )
        .toPromise();

      this.paginationConfig.currentPage = page + 1;
      if (data) {
        this.incidents = data.result.content;
        console.log(this.incidents);
        this.paginationConfig.totalItems = data.result.totalElements;
        this.loading = false;
        this.cdr.detectChanges();
      }
    } catch {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  private async initCharts() {
    this.loadingCharts = true;
    const result = await this.incidentService
      .getReport(this.filter)
      .toPromise();
    this.loadingCharts = false;
    this.chart4Options.labels = result.priority?.map((p) =>
      this.lang == 'en' ? p['nameEn'] : p['nameAr']
    );

    this.chart4Options.series = result.priority?.map((p) => p.count);

    this.chart5Options.xaxis = {
      categories: result.category.map((c) => {
        if (!c['nameEn'] || !c['nameAr']) {
          return this.translationService.get('COMMON.NOT_SPECIFIED');
        } else {
          return this.lang == 'en' ? c['nameEn'] : c['nameAr'];
        }
      }),
      labels: {
        show: false,
      },
    };

    const categoriesData = result.category.map((el) =>
      el.count ? el.count : 0
    );

    this.chart5Options.series = [
      {
        data: categoriesData,
      },
    ];
    // emergency levels chart
    // const emergencyLevels = this.commonData?.emergencyLevels as any[];

    // this.chart6Options.series = emergencyLevels.map((e) => {
    //   const es = result.emergencyLevel.find((el) => el.key == e.id);
    //   return {name: e?.level, data: [es?.count ?? 0]};
    // });
    // const notSpecifiedEmLvl = result.emergencyLevel
    //   ?.filter((el) => !emergencyLevels.find((e) => el.key == e.id))
    //   ?.map((e) => e.count)
    //   ?.reduce((pv, cv, ci) => pv + cv, 0);
    // this.chart6Options?.series?.push({
    //   name: this.translationService.get('COMMON.NOT_SPECIFIED'),
    //   data: [notSpecifiedEmLvl],
    // });

    // risk impacts chart
    const riskImpacts = this.commonData?.incidentRiskImpacts as any[];

    this.chart7Options.labels = riskImpacts.map(
      (r) => (this.lang == 'en' ? r.nameEN : r.nameAR) + ''
    );
    this.chart7Options.labels.push(
      this.translationService.get('COMMON.NOT_SPECIFIED')
    );
    this.chart7Options.series = riskImpacts.map(
      (r) => result?.riskImpact?.find((rs) => rs.key == r.id)?.count
    );
    this.chart7Options.series.push(
      result.riskImpact
        ?.filter((el) => !riskImpacts.find((e) => el.key == e.id))
        ?.map((c) => c.count)
        .reduce((pv, cv, ci) => pv + cv, 0)
    );

    // status chart

    const statuses = this.commonData?.incidentStatus as any[];
    this.chart8Options.labels = statuses?.map((s) =>
      this.lang == 'en' ? s.nameEn : s.nameAr
    );

    this.chart8Options.series = statuses?.map(
      (s) => result?.status?.find((ss) => ss.key == s.id)?.count ?? 0
    );

    // city chart

    const cities = this.commonData?.cities as any[];

    this.chart9Options.labels = cities?.map(
      (c) => (this.lang == 'en' ? c.nameEn : c.nameAr) + ''
    );
    this.chart9Options.labels.push(
      this.translationService.get('COMMON.NOT_SPECIFIED')
    );
    this.chart9Options.series = cities?.map(
      (c) => result?.city?.find((cs) => cs?.key == c?.id)?.count
    );
    this.chart9Options.series.push(
      result.city
        ?.filter((el) => !cities.find((e) => el.key == e.id))
        ?.map((c) => c.count)
        .reduce((pv, cv, ci) => pv + cv, 0)
    );

    this.chart4Options.title = {
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BY_IMPORTANCE.TITLE'
      ),
    };

    this.chart5Options.title = {
      text: this.translationService.get('REPORTING.INCIDENTS.BYCATEGORY.TITLE'),
      align: 'center',
      floating: true,
    };

    this.chart6Options.title = {
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BYEMERGENCY_LEVEL.TITLE'
      ),
    };

    this.chart7Options.title = {
      text: this.translationService.get(
        'REPORTING.INCIDENTS.BY_RISK_IMPACT.TITLE'
      ),
    };

    this.chart8Options.title = {
      text: this.translationService.get('REPORTING.INCIDENTS.BY_STATUS.TITLE'),
    };

    this.chart9Options.title = {
      text: this.translationService.get('REPORTING.INCIDENTS.BY_CITY.TITLE'),
    };
    this.loadingCharts = false;
    this.cdr.detectChanges();
  }

  async openIncident(incident: any) {
    await this.router.navigate(['/incidents/view', incident.id]);
  }
  loadNonGlobalGroups(id, page, size) {
    this.groupService.getNonGlobalGroupsByOrgId(id, '', page, size).subscribe(
      (data) => {
        if (data) {
          this.groups.push(...data.result?.content);
        }
        if (data.result?.totalPages > page) {
          this.loadNonGlobalGroups(id, page + 1, size);
        }
        this.cdr.detectChanges();
      },
      (error) => {}
    );
  }
 convertDate(date) {
    const inputDate = new Date(date);
    const formattedDate = this.datePipe.transform(inputDate, 'yyyy/MM/dd hh:mm:ss a');
    return formattedDate;
  }
}
