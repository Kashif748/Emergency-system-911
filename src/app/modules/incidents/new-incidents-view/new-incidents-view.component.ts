import { ThrowStmt } from '@angular/compiler';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentStatistics } from '@core/api/models/incident.model';
import { IncidentsService } from '@core/api/services/incident.service';
import { InquiryService } from '@core/api/services/inquiry.service';
import {
  IncidentStatu,
  Kpi,
  Priority,
  ReportingVia,
} from '@core/entities/AppCommonData';
import { CommonService } from '@core/services/common.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  AdvancedSearchComponent,
  DataOptions,
  FormFieldName,
} from '@shared/components/advanced-search/advanced-search.component';
import { AdvancedSearchFieldsEnum } from '@shared/components/advanced-search/advancedSearch.model';
import { combineLatest, forkJoin, Subject } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  takeUntil,
  tap,
  switchMap,
} from 'rxjs/operators';
import { ICategory } from '../../reporting/model/incidents-report';
import { EmailListComponent } from '../email-list/email-list.component';
import { INTERIM_STATUS } from '../incident/incident.component';
import { StatusDialogComponent } from '../incident/interim-incidents/status-dialog/status-dialog.component';
import { INCIDENT_STATUS, PageConfig } from '../incidents.model';
import { ResponsibleOrgsComponent } from '../view-incidents/responsible-orgs/responsible-orgs.component';
import {
  IncidentViewsEnum,
  COLUMNS,
  IncidentViewNavigation,
  RowValueEnum,
  DisplayedColumn,
  DashboardModules,
} from './const';
import {
  SetCurrentView,
  SetIncidentsSelectedColumns,
  SetInquiriesSelectedColumns,
  SetInterimIncidentsSelectedColumns,
  SetPageNumber,
  UpdateFilter,
} from './store/incidents-dashboard.actions';
import { IncidentDashboardStateModel } from './store/incidents-dashboard.reducer';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { MapComponent } from '@shared/components/map/map.component';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import { OrgService } from '@core/api/services/org.service';
import { BaseComponent } from '@shared/components/base.component';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

@Component({
  selector: 'app-new-incidents-view',
  templateUrl: './new-incidents-view.component.html',
  styleUrls: ['./new-incidents-view.component.scss'],
})
export class NewIncidentsViewComponent
  extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  incidentDisplayedColumns: DisplayedColumn[] = [];
  selectedDisplayedCols: DisplayedColumn[] = [];
  isLoading$: Subject<boolean> = new Subject();
  currentView = IncidentViewsEnum.IN_PROGRESS_INCIDENTS;
  advancedSearchFilter: any = {};
  navigationViews = IncidentViewNavigation;
  tableTitle: string = '';
  showIncidentsMenu = false;
  incidentViews = IncidentViewsEnum;
  paginationConfig: PageConfig;
  commonData: any;
  priorities: Priority[];
  kpis: Kpi[];

  filterQuery: any;
  @ViewChildren('mapContainer') maps: QueryList<MapComponent>;
  private map: MapComponent;
  private filterLayers: (where: any, fName: MapActionType) => void;
  mapView: boolean = false;

  centers: any[];
  categories: ICategory[];
  reportingVias: ReportingVia[];
  incidentStatu: IncidentStatu[];
  advancedSearchDataList: DataOptions[];
  columnValues = RowValueEnum;
  viewStartUserPrivileges: IncidentViewsEnum;
  storedSelectedCols: DisplayedColumn[] = [];
  advancedSearchFormFields: FormFieldName[] = [
    { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
    { formControlName: AdvancedSearchFieldsEnum.SR_NO },
    { formControlName: AdvancedSearchFieldsEnum.SERIAL },
    { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
    { formControlName: AdvancedSearchFieldsEnum.END_DATE },
    { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
    { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
    { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
    { formControlName: AdvancedSearchFieldsEnum.STATUS },
  ];
  dashboardData: IncidentStatistics = {
    incidents: null,
    inquiry: null,
    interimIncidents: null,
  };
  data: any[];
  userPrivileges = JSON.parse(
    localStorage.getItem('userPrivileges')
  ) as string[];
  constructor(
    private translateService: TranslateService,
    private incidentsService: IncidentsService,
    private alertService: AlertsService,

    private inquiryService: InquiryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private store: Store,
    private orgService: OrgService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTargetViewIfExist();
    this.getDashboardData();
    this.initiateValues();
    this.loadCenters();
    this.loadCategories();
    this.loadingAdvancedSearchData();
  }

  getTargetViewIfExist() {
    const viewId = +this.activatedRoute.snapshot.params['view'];
    if (
      viewId == IncidentViewsEnum.INTERIM_INCIDENTS &&
      this.userPrivileges.includes('PRIV_VW_INT_INC')
    ) {
      this.store.dispatch(SetCurrentView({ view: viewId }));
      this.store.dispatch(
        UpdateFilter({ filter: { status: INTERIM_STATUS[0].value } })
      );
    } else if (
      viewId == IncidentViewsEnum.IN_PROGRESS_INCIDENTS &&
      (this.userPrivileges.includes('PRIV_VW_INC') ||
        this.userPrivileges.includes('PRIV_VW_GRP_INC'))
    ) {
      this.store.dispatch(SetCurrentView({ view: viewId }));
    } else {
      this.getUserPrivileges();
    }
  }

  getUserPrivileges() {
    if (
      this.userPrivileges.includes('PRIV_VW_INC') ||
      this.userPrivileges.includes('PRIV_VW_GRP_INC')
    ) {
      this.viewStartUserPrivileges = IncidentViewsEnum.IN_PROGRESS_INCIDENTS;
    }

    if (
      this.userPrivileges.includes('PRIV_VW_INQ') &&
      !this.userPrivileges.includes('PRIV_VW_INC')
    ) {
      this.viewStartUserPrivileges = IncidentViewsEnum.INQUIRIES;
    }

    if (
      this.userPrivileges.includes('PRIV_VW_INT_INC') &&
      !this.userPrivileges.includes('PRIV_VW_INC') &&
      !this.userPrivileges.includes('PRIV_VW_INQ')
    ) {
      this.viewStartUserPrivileges = IncidentViewsEnum.INTERIM_INCIDENTS;
    }
  }

  getDashboardData() {
    this.incidentsService.getIncidentDashboardStatistics().subscribe((data) => {
      this.dashboardData = data as IncidentStatistics;
      this.cdr.detectChanges();
    });
  }

  updateDashboardData(module: DashboardModules, filter: any) {
    this.incidentsService
      .getIncidentDashboardStatistics(module, filter)
      .subscribe((data) => {
        this.dashboardData = data as IncidentStatistics;
        this.cdr.detectChanges();
      });
  }

  initiateValues() {
    this.isLoading$.next(true);
    this.commonData = this.commonService.getCommonData();
    this.priorities = this.commonData['priorities'] as Priority[];
    this.kpis = this.commonData['kpi'] as Kpi[];
    this.reportingVias = this.commonData['reportingVias'] as ReportingVia[];
    this.incidentStatu = this.commonData[
      'interimIncidentStatuses'
    ] as IncidentStatu[];
    //this.categories = this.commonData['incidentCategories'] as ICategory[];
    this.incidentDisplayedColumns = COLUMNS.Incidents.map((v) => ({
      ...v,
      name: this.translateService.instant(v.name),
    }));
    this.selectedDisplayedCols = [...this.incidentDisplayedColumns]; // for maintaining template until being overrided by store

    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100,
      id: 'inc_table_rep',
      sort: '',
      active: '',
    };

    combineLatest([
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.currentPageNumber
      ),
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.currentView
      ),
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state.incidentDashboard.filter
      ),
    ])
      .pipe(distinctUntilChanged(), debounceTime(700))
      .subscribe(([page, view, filter]) => {
        this.currentView = view ?? this.viewStartUserPrivileges;
        this.paginationConfig.currentPage = page;
        this.advancedSearchFilter = filter;
        this.loadData();
      });

    combineLatest([
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.incidentsSelectedCols
      ),
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.inquiriesSelectedCols
      ),
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.interimIncidentsSelectedCols
      ),
      this.store.select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.currentView
      ),
    ]).subscribe(([incidentsCols, inquiriesCols, interimCols, view]) => {
      let values;
      switch (view) {
        case IncidentViewsEnum.ALL_INCIDENTS:
        case IncidentViewsEnum.COMPLETED_INCIDENTS:
        case IncidentViewsEnum.IN_PROGRESS_INCIDENTS:
        case IncidentViewsEnum.REJECTED_INCIDENTS:
          this.storedSelectedCols = incidentsCols;
          values = incidentsCols.map((d) => d.value);
          this.selectedDisplayedCols = this.incidentDisplayedColumns.filter(
            (col) => values.includes(col.value)
          );
          break;
        case IncidentViewsEnum.INQUIRIES:
          this.storedSelectedCols = inquiriesCols;
          values = inquiriesCols.map((d) => d.value);
          this.selectedDisplayedCols = this.incidentDisplayedColumns.filter(
            (col) => values.includes(col.value)
          );
          break;
        case IncidentViewsEnum.INTERIM_INCIDENTS:
          this.storedSelectedCols = interimCols;
          values = interimCols.map((d) => d.value);
          this.selectedDisplayedCols = this.incidentDisplayedColumns.filter(
            (col) => values.includes(col.value)
          );
          break;
      }
      // if (data && data?.length) {
      //   this.storedSelectedCols = data;
      //   const values = data.map((d) => d.value);
      //   this.selectedDisplayedCols = this.incidentDisplayedColumns.filter(
      //     (col) => values.includes(col.value)
      //   );
      // }
    });
  }

  ngAfterViewInit() {
    if (this.mapView) {
      this.maps.changes
        .pipe(
          map((ql) => ql.first),
          tap((map) => {
            this.map = map;
          }),
          switchMap(() => this.map.filterLayersFunc$)
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(async (fun) => {
          this.cdr.detectChanges();
          this.filterLayers = fun;
          await this.showIncidentDashboardGraphics(fun);
        });
    }
  }

  async loadInProgressIncidents() {
    this.currentView = IncidentViewsEnum.IN_PROGRESS_INCIDENTS;
    this.tableTitle = this.translateService.instant(
      'DASHBOARD.IN_PROGRESS_INCIDENTS'
    );
    this.showIncidentsMenuDisplay(this.currentView);
    this.setTableDisplyedColumns(COLUMNS.Incidents);

    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
      { formControlName: AdvancedSearchFieldsEnum.CATEGORY },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
      { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
      { formControlName: AdvancedSearchFieldsEnum.LEADING_ORG },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
    ];

    this.isLoading$.next(true);
    if (this.mapView) {
      this.filterQuery = this.getFilterQuery();
      this.map.mapView?.graphics?.removeAll();
      await this.showIncidentDashboardGraphics(this.filterLayers);
    }
    forkJoin({
      data: this.incidentsService.getAllWithFilters(
        this.paginationConfig.currentPage - 1 || 0,
        { status: INCIDENT_STATUS.IN_PROCESSING, ...this.advancedSearchFilter },
        { active: 'incidentDate', direction: 'desc' }
      ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INCIDENTS,
        { status: INCIDENT_STATUS.IN_PROCESSING, ...this.advancedSearchFilter }
      ),
    }).subscribe(({ data, dashboardData }) => {
      this.data = data.result.content;
      this.paginationConfig.totalItems = data.result.totalElements;
      this.dashboardData = dashboardData as IncidentStatistics;
      // this.getAssignedCities();
      // this.getAssignedIncidentsCategories();
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    });
  }

  getFilterQuery() {
    const query = Object.assign({}, this.advancedSearchFilter);
    if (query.id) {
      query.id = query.id.trim();
    }
    if (query.fromDate) {
      query.fromDate = DateTimeUtil.format(query.fromDate, 'YYYY-MM-DD');
    }
    if (query.toDate) {
      query.toDate = DateTimeUtil.format(query.toDate, 'YYYY-MM-DD');
    }
    return query;
  }

  private async showIncidentDashboardGraphics(
    filterLayers: (where, fName: MapActionType) => void
  ) {
    const org = this.commonService.getCommonData()?.currentOrgDetails;
    if (!org) {
      return;
    }
    const orgChildOrgs = await this.orgService
      .getOrgChild(org.id)
      .pipe(map((orgs: any[]) => orgs.map((o) => o?.code)))
      .toPromise();
    let orgs = `( `;
    orgChildOrgs.forEach((c) => {
      orgs += `'${c}',`;
    });
    orgs = `${orgs.slice(0, orgs.length - 1)} )`;

    const filter = this.getFilterQuery();
    let incidentType = 1;
    if (this.currentView === this.incidentViews.IN_PROGRESS_INCIDENTS) {
      incidentType = 1;
    } else if (this.currentView === this.incidentViews.COMPLETED_INCIDENTS) {
      incidentType = 2;
    } else if (this.currentView === this.incidentViews.REJECTED_INCIDENTS) {
      incidentType = 3;
    }
    const incidentIds: string[] = await this.incidentsService
      .getIncidentsIds(
        0,
        {
          subject: filter.subject,
          sr: filter.id,
          createdDate: filter.fromDate,
          endDate: filter.toDate,
          priority: filter.priority,
          category: filter.category,
          reportingVia: filter.reportingVia,
          phoneNumber: filter.reporterContact,
          responsibleOrg: filter.responsibleOrg,
          organization: filter.organization,
          status: incidentType,
        },
        null,
        100000
      )
      .pipe(map((res) => res?.result))
      .toPromise();

    const temp = 1000;
    let loopCount = 0;
    loopCount = incidentIds.length / temp;
    let start = 0;
    let end = 1000;
    for (let i = 0; i <= loopCount; i++) {
      const incidentIdsAterLimit = incidentIds.slice(start, end);
      start = end;
      end = start + 1000;
      let incidents = `(`;
      incidentIdsAterLimit.forEach((id) => (incidents += `${id},`));
      incidents = `${incidents.slice(0, incidents.length - 1)} )`;

      const where = `ORG_NAME in ${orgs} and INCIDENT_REF_ID in ${incidents}`;
      filterLayers(where, MapActionType.INCIDENT_POINT);
      filterLayers(where, MapActionType.INCIDENT_POLYLINE);
      filterLayers(where, MapActionType.INCIDENT_POLYGON);
    }
  }

  async loadRejectedIncidents() {
    this.currentView = IncidentViewsEnum.REJECTED_INCIDENTS;
    this.tableTitle = this.translateService.instant(
      'DASHBOARD.REJECTED_INCIDENTS'
    );
    this.showIncidentsMenuDisplay(this.currentView);
    this.incidentDisplayedColumns = COLUMNS.Incidents.map((v) => ({
      ...v,
      name: this.translateService.instant(v.name),
    }));
    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
      { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
      { formControlName: AdvancedSearchFieldsEnum.CATEGORY },
      { formControlName: AdvancedSearchFieldsEnum.LEADING_ORG },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
    ];
    this.selectedDisplayedCols = [...this.incidentDisplayedColumns];
    if (this.mapView) {
      this.filterQuery = this.getFilterQuery();
      this.map.mapView?.graphics?.removeAll();
      await this.showIncidentDashboardGraphics(this.filterLayers);
    }
    forkJoin({
      data: this.incidentsService.getAllWithFilters(
        this.paginationConfig.currentPage - 1 || 0,
        { status: INCIDENT_STATUS.REJECTED, ...this.advancedSearchFilter },
        { active: 'incidentDate', direction: 'desc' }
      ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INCIDENTS,
        { status: INCIDENT_STATUS.REJECTED, ...this.advancedSearchFilter }
      ),
    }).subscribe(({ data, dashboardData }) => {
      this.data = data.result.content;
      this.paginationConfig.totalItems = data.result.totalElements;
      this.dashboardData = dashboardData as IncidentStatistics;
      // this.getAssignedCities();
      // this.getAssignedIncidentsCategories();
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    });
  }
  async loadCompletedIncidents() {
    this.currentView = IncidentViewsEnum.COMPLETED_INCIDENTS;
    this.tableTitle = this.translateService.instant(
      'INCIDENTS.CLOSED_INCIDENTS'
    );
    this.showIncidentsMenuDisplay(this.currentView);
    this.incidentDisplayedColumns = COLUMNS.Incidents.map((v) => ({
      ...v,
      name: this.translateService.instant(v.name),
    }));
    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
      { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
      { formControlName: AdvancedSearchFieldsEnum.CATEGORY },
      { formControlName: AdvancedSearchFieldsEnum.LEADING_ORG },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
    ];
    this.selectedDisplayedCols = [...this.incidentDisplayedColumns];
    if (this.mapView) {
      this.filterQuery = this.getFilterQuery();
      this.map.mapView?.graphics?.removeAll();
      await this.showIncidentDashboardGraphics(this.filterLayers);
    }
    forkJoin({
      data: this.incidentsService.getAllWithFilters(
        this.paginationConfig.currentPage - 1 || 0,
        { status: INCIDENT_STATUS.DONE, ...this.advancedSearchFilter },
        { active: 'incidentDate', direction: 'desc' }
      ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INCIDENTS,
        { status: INCIDENT_STATUS.DONE, ...this.advancedSearchFilter }
      ),
    }).subscribe(({ data, dashboardData }) => {
      this.data = data.result.content;
      this.paginationConfig.totalItems = data.result.totalElements;
      this.dashboardData = dashboardData as IncidentStatistics;
      // this.getAssignedCities();
      // this.getAssignedIncidentsCategories();
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    });
  }

  viewChange(value) {
    if (value.checked) {
      this.mapView = true;
      this.ngAfterViewInit();
    } else {
      this.mapView = false;
    }
  }

  loadInquiries() {
    this.mapView = false;
    this.currentView = IncidentViewsEnum.INQUIRIES;
    this.showIncidentsMenuDisplay(this.currentView);
    this.tableTitle = this.translateService.instant(
      'INCIDENTS.INQUIRIES_TITLE'
    );
    this.setTableDisplyedColumns(COLUMNS.Inquiries);
    // this.incidentDisplayedColumns = COLUMNS.Inquiries.map((v) => ({
    //   ...v,
    //   name: this.translateService.instant(v.name),
    // }));
    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.INQUIRY },
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
    ];
    //this.selectedDisplayedCols = [...this.incidentDisplayedColumns];

    this.isLoading$.next(true);
    forkJoin({
      data: this.inquiryService.getInquiriesByPage(
        this.advancedSearchFilter,
        this.paginationConfig.currentPage - 1 || 0
      ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INQUIRIES,
        this.advancedSearchFilter
      ),
    }).subscribe(({ data, dashboardData }) => {
      this.data = data?.result?.content;
      this.isLoading$.next(false);
      this.paginationConfig.totalItems = data.result.totalElements;
      this.dashboardData = dashboardData as IncidentStatistics;
      // isSorting ? data.result.number
      // : data.result.number + 1;
      this.cdr.detectChanges();
    });
  }

  setTableDisplyedColumns(source: DisplayedColumn[]) {
    if (this.storedSelectedCols && this.storedSelectedCols.length) {
      const values = this.storedSelectedCols.map((d) => d.value);
      this.incidentDisplayedColumns = source.map((v) => ({
        ...v,
        name: this.translateService.instant(v.name),
      }));
      this.selectedDisplayedCols = [
        ...this.incidentDisplayedColumns.filter((col) =>
          values.includes(col.value)
        ),
      ];
    } else {
      this.incidentDisplayedColumns = source.map((v) => ({
        ...v,
        name: this.translateService.instant(v.name),
      }));
      this.selectedDisplayedCols = [...this.incidentDisplayedColumns];
    }
  }

  loadInterimIncidents() {
    this.mapView = false;
    this.currentView = IncidentViewsEnum.INTERIM_INCIDENTS;
    this.showIncidentsMenuDisplay(this.currentView);
    this.tableTitle = this.translateService.instant(
      'INCIDENTS.INTERIM_INCIDENTS'
    );

    this.setTableDisplyedColumns(COLUMNS.InterimIncidents);
    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
      { formControlName: AdvancedSearchFieldsEnum.STATUS },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
    ];

    this.isLoading$.next(true);
    forkJoin({
      data: this.incidentsService
        .searchInterimIncidents(
          this.paginationConfig.currentPage - 1 || 0,
          this.advancedSearchFilter,
          this.paginationConfig.itemsPerPage
        )
        .pipe(
          map((res) => {
            return res['result'];
          })
        ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INTERIM_INCIDENTS,
        this.advancedSearchFilter
      ),
    }).subscribe(
      ({ data, dashboardData }) => {
        if (data) {
          this.data = data.content;
          this.paginationConfig.totalItems = data.totalElements;
          this.dashboardData = dashboardData as IncidentStatistics;
          this.cdr.detectChanges();
          this.isLoading$.next(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async loadDraftedIncidintes() {
    this.currentView = IncidentViewsEnum.DRAFTED_INCIDENTS;
    this.tableTitle = this.translateService.instant(
      'DASHBOARD.DRAFTED_INCIDENTS'
    );
    this.showIncidentsMenuDisplay(this.currentView);
    this.setTableDisplyedColumns(COLUMNS.Incidents);

    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
      { formControlName: AdvancedSearchFieldsEnum.CATEGORY },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
      { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
      { formControlName: AdvancedSearchFieldsEnum.LEADING_ORG },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
    ];

    this.isLoading$.next(true);
    if (this.mapView) {
      this.filterQuery = this.getFilterQuery();
      this.map.mapView?.graphics?.removeAll();
      await this.showIncidentDashboardGraphics(this.filterLayers);
    }
    forkJoin({
      data: this.incidentsService.getAllWithFilters(
        this.paginationConfig.currentPage - 1 || 0,
        { status: INCIDENT_STATUS.DRAFT, ...this.advancedSearchFilter },
        { active: 'incidentDate', direction: 'desc' }
      ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INCIDENTS,
        { status: INCIDENT_STATUS.DRAFT, ...this.advancedSearchFilter }
      ),
    }).subscribe(({ data, dashboardData }) => {
      this.data = data.result.content;
      this.paginationConfig.totalItems = data.result.totalElements;
      this.dashboardData = dashboardData as IncidentStatistics;
      // this.getAssignedCities();
      // this.getAssignedIncidentsCategories();
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    });
  }

  disableNavigation(event$: any) {
    return event$.stopPropagation();
  }

  showIncidentsMenuDisplay(view: IncidentViewsEnum) {
    this.showIncidentsMenu =
      view === IncidentViewsEnum.ALL_INCIDENTS ||
      view === IncidentViewsEnum.IN_PROGRESS_INCIDENTS ||
      view === IncidentViewsEnum.COMPLETED_INCIDENTS ||
      view === IncidentViewsEnum.REJECTED_INCIDENTS ||
      view === IncidentViewsEnum.DRAFTED_INCIDENTS;
  }

  async loadAllIncidents() {
    this.currentView = IncidentViewsEnum.ALL_INCIDENTS;
    this.tableTitle = this.translateService.instant('INCIDENTS.INCIDENTS');
    this.showIncidentsMenuDisplay(this.currentView);
    this.setTableDisplyedColumns(COLUMNS.Incidents);
    this.advancedSearchFormFields = [
      { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
      { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      { formControlName: AdvancedSearchFieldsEnum.SERIAL },
      { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
      { formControlName: AdvancedSearchFieldsEnum.END_DATE },
      { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA },
      { formControlName: AdvancedSearchFieldsEnum.RESPONSIBLE_ORG },
      { formControlName: AdvancedSearchFieldsEnum.LEADING_ORG },
      { formControlName: AdvancedSearchFieldsEnum.REPORTING_CONTACT },
      { formControlName: AdvancedSearchFieldsEnum.CATEGORY },
    ];

    this.isLoading$.next(true);
    if (this.mapView) {
      this.filterQuery = this.getFilterQuery();
      this.map.mapView?.graphics?.removeAll();
      await this.showIncidentDashboardGraphics(this.filterLayers);
    }
    forkJoin({
      data: this.incidentsService.getAllWithFilters(
        this.paginationConfig.currentPage - 1 || 0,
        this.advancedSearchFilter,
        {
          active: 'incidentDate',
          direction: 'desc',
        }
      ),
      dashboardData: this.incidentsService.getIncidentDashboardStatistics(
        DashboardModules.INCIDENTS,
        this.advancedSearchFilter
      ),
    }).subscribe(({ data, dashboardData }) => {
      this.data = data.result.content;
      this.paginationConfig.totalItems = data.result.totalElements;
      this.cdr.detectChanges();
      this.dashboardData = dashboardData as IncidentStatistics;
      // this.getAssignedCities();
      // this.getAssignedIncidentsCategories();
      this.isLoading$.next(false);
    });
  }

  changeView(tabIndex: IncidentViewsEnum) {
    this.store.dispatch(SetCurrentView({ view: tabIndex }));
    this.store.dispatch(SetPageNumber({ pageNumber: 1 }));
  }

  getPriority(priority: { id?: number }) {
    const foundPriority = this.priorities.find(
      (pr) => priority && pr.id === priority?.id && pr.isActive
    );
    if (foundPriority) {
      return foundPriority;
    }
    return null;
  }

  getKpiPeriodClass(timeTaken: number): string {
    if (timeTaken < 0.3) {
      return 'bg-anti-flash-white';
    } else if (timeTaken >= 0.3 && timeTaken < 0.6) {
      return 'bg-medium-champagne';
    } else if (timeTaken >= 0.6 && timeTaken < 1) {
      return 'bg-pale-pink';
    } else {
      return 'bg-tulip';
    }
  }

  private loadCenters() {
    this.incidentsService.getCenters().subscribe((res) => {
      this.centers = res['result'];
    });
  }

  private loadCategories() {
    this.incidentsService.getIncidentCategories().subscribe(
      (data) => {
        if (data) {
          this.categories = data.result;
          const categories: DataOptions = {
            formControlName: AdvancedSearchFieldsEnum.CATEGORY,
            children: this.categories,
          };
          this.advancedSearchDataList.push(categories);
        }
      },
      (error) => {}
    );
  }

  onDropdownChange($event: { value: [] }) {
    this.selectedDisplayedCols = $event.value;
    switch (this.currentView) {
      case IncidentViewsEnum.ALL_INCIDENTS:
      case IncidentViewsEnum.COMPLETED_INCIDENTS:
      case IncidentViewsEnum.IN_PROGRESS_INCIDENTS:
      case IncidentViewsEnum.REJECTED_INCIDENTS:
        this.store.dispatch(
          SetIncidentsSelectedColumns({
            selectedCols: this.selectedDisplayedCols,
          })
        );
        break;
      case IncidentViewsEnum.INQUIRIES:
        this.store.dispatch(
          SetInquiriesSelectedColumns({
            selectedCols: this.selectedDisplayedCols,
          })
        );
        break;
      case IncidentViewsEnum.INTERIM_INCIDENTS:
        this.store.dispatch(
          SetInterimIncidentsSelectedColumns({
            selectedCols: this.selectedDisplayedCols,
          })
        );
        break;
    }
  }

  getCity(cityId: number): string {
    const foundCity =
      this.centers &&
      this.centers?.length &&
      this.centers.find((center) => center.id === cityId);
    return foundCity;
  }

  getReportingVia(reportingViaValue: { id: number }) {
    const foundReportingVia = this.reportingVias.find(
      (rv) => rv.id === reportingViaValue.id && rv.isActive
    );
    return foundReportingVia;
  }
  getStatusVia(statusViaValue: { id: number }) {
    const foundStatusVia = this.incidentStatu.find(
      (sv) => sv.id === statusViaValue.id && sv.isActive
    );
    return foundStatusVia;
  }

  getParentOrg(org: any[]) {
    if (org && org.length) {
      if (org.length == 1) {
        return org[0].orgStructure;
      } else {
        const foundOrgIndex = org.findIndex(
          (o) => o.orgStructure?.id == this.advancedSearchFilter?.organization
        );
        return org[foundOrgIndex]?.orgStructure;
      }
    }
    return null;
  }

  openAdvancedSearchModal() {
    this.dialog.open(AdvancedSearchComponent, {
      data: {
        formFields: this.advancedSearchFormFields,
        dataLists: this.advancedSearchDataList,
      },
    });
  }

  loadingAdvancedSearchData() {
    const priorities: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.PRIORITY,
      children: this.commonData?.priorities,
    };

    const reportingVias: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA,
      children: this.commonData?.reportingVias,
    };

    const status: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.STATUS,
      children: this.commonData?.interimIncidentStatuses,
    };

    this.advancedSearchDataList = [priorities, reportingVias, status];
  }

  pageChanged($event: number) {
    this.store.dispatch(SetPageNumber({ pageNumber: $event }));
  }

  loadData() {
    switch (this.currentView) {
      case IncidentViewsEnum.IN_PROGRESS_INCIDENTS:
        this.loadInProgressIncidents();
        break;

      case IncidentViewsEnum.COMPLETED_INCIDENTS:
        this.loadCompletedIncidents();
        break;
      case IncidentViewsEnum.REJECTED_INCIDENTS:
        this.loadRejectedIncidents();
        break;

      case IncidentViewsEnum.ALL_INCIDENTS:
        this.loadAllIncidents();
        break;

      case IncidentViewsEnum.INQUIRIES:
        this.loadInquiries();
        break;

      case IncidentViewsEnum.INTERIM_INCIDENTS:
        this.loadInterimIncidents();
        break;
      case IncidentViewsEnum.DRAFTED_INCIDENTS:
        this.loadDraftedIncidintes();
        break;
    }
  }

  openStatusDialog(id): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '540px',
      disableClose: false,
      data: {
        incId: id,
        message: this.translateService.instant('INCIDENTS.ARE_YOU_SURE'),
        buttonText: {
          ok: this.translateService.instant('ACTIONS.YES'),
          cancel: this.translateService.instant('ACTIONS.NO'),
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadInterimIncidents();
    });
  }

  navigateTo(route: IncidentViewNavigation, data?: any) {
    switch (route) {
      case IncidentViewNavigation.ADD_INCIDENT:
        this.router.navigate(['incidents/report', { data }]);
        break;
      case IncidentViewNavigation.VIEW_INCIDENT:
        this.router.navigate(['incidents/view', data]);
        break;
      case IncidentViewNavigation.VIEW_INQURY:
        this.router.navigate(['incidents/inquiry', data]);
        break;
      case IncidentViewNavigation.VIEW_INTERIM_INCIDENT:
        this.router.navigate(['incidents/view-interim', data]);
        break;
      case IncidentViewNavigation.APPROVE_INTERIM:
        this.router.navigate(['incidents/report-interim', data]);
        break;
    }
  }

  showRow(rowValue: RowValueEnum) {
    const found =
      this.selectedDisplayedCols.findIndex((col) => col.value === rowValue) >=
      0;
    return found;
  }

  ngOnDestroy(): void {
    // this.store.dispatch(
    //   SetSelectedColumns({ selectedCols: this.selectedDisplayedCols })
    // );
  }

  sendMail(e, id) {
    e.stopPropagation();
    this.openDialog(id);
  }

  openDialog(id): void {
    this.dialog.open(EmailListComponent, {
      width: '600px',
      disableClose: false,
      data: {
        incId: id,
      },
    });
  }

  canUserUpdate(Porg, respID, incident: any) {
    if (incident.status.id !== 2 && incident.status.id !== 3) {
      if (this.commonData.currentOrgDetails.id == Porg) {
        return true;
      } else {
        return this.commonData.currentOrgDetails.id == respID;
      }
    } else {
      return false;
    }
  }

  updateIncident(id) {
    this.router.navigate(['incidents/edit', id]);
  }
  deleteIncident(incidentDetails) {
    this.incidentsService
      .updateIncidentStatus({
        incidentId: +incidentDetails?.id,
        statusId: 4,
        finalStatement: '',
      })
      .subscribe(
        (response) => {
          this.alertService.openSuccessSnackBar();
          this.loadDraftedIncidintes();
          this.getDashboardData();
        },
        (err) => {
          this.alertService.openFailureSnackBar();
        }
      );
  }

  canUserTaskUpdate(respID) {
    return respID == this.commonData.currentOrgDetails.id;
  }

  canEditResponsibleOrg(incident: any) {
    if (incident?.status?.id === 2) {
      return false;
    }
    return (
      incident?.responsibleOrg?.id === this.commonData.currentOrgDetails.id
    );
  }

  createTask(title, id) {
    this.router.navigate(['incidents/createTask', { title, id }]);
  }

  openModal(type, id, incId) {
    this.dialog.open(ResponsibleOrgsComponent, {
      disableClose: false,
      panelClass: 'modal',
      width: '600px',
      height: 'auto',
      data: {
        type,
        id,
        incidentId: incId,
      },
    });
  }

  exportPdf() {
    let status;
    status =
      IncidentViewsEnum.IN_PROGRESS_INCIDENTS == this.currentView
        ? INCIDENT_STATUS.IN_PROCESSING
        : IncidentViewsEnum.COMPLETED_INCIDENTS == this.currentView
        ? INCIDENT_STATUS.DONE
        : IncidentViewsEnum.REJECTED_INCIDENTS == this.currentView
        ? INCIDENT_STATUS.REJECTED
        : null;
    this.isLoading$.next(true);
    this.incidentsService
      .downloadReport(
        'PDF',
        this.paginationConfig.currentPage,
        {
          ...this.advancedSearchFilter,
          status,
        },
        []
      )
      .subscribe((response) => {
        const blob = new Blob([response.body], { type: 'pdf' });
        window.URL.createObjectURL(blob);
        const fileName = 'download.pdf';
        //importedSaveAs(blob, fileName);
        this.isLoading$.next(false);
      });
  }

  exportExcel() {
    let status;
    status =
      IncidentViewsEnum.IN_PROGRESS_INCIDENTS == this.currentView
        ? INCIDENT_STATUS.IN_PROCESSING
        : IncidentViewsEnum.COMPLETED_INCIDENTS == this.currentView
        ? INCIDENT_STATUS.DONE
        : IncidentViewsEnum.REJECTED_INCIDENTS == this.currentView
        ? INCIDENT_STATUS.REJECTED
        : null;
    this.isLoading$.next(true);
    this.incidentsService
      .downloadReport(
        'EXCEL',
        this.paginationConfig.currentPage,
        {
          ...this.advancedSearchFilter,
          status,
        },
        []
      )
      .subscribe((response) => {
        const blob = new Blob([response.body], { type: 'excel' });
        window.URL.createObjectURL(blob);
        const fileName = 'download.xlsx';
        //importedSaveAs(blob, fileName);
        this.isLoading$.next(false);
      });
  }
}
