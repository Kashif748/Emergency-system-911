import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { EmailListComponent } from '../email-list/email-list.component';
import { ResponsibleOrgsComponent } from '../view-incidents/responsible-orgs/responsible-orgs.component';
import { PushNotificationsService } from '../../../_metronic/core/services/push.notifications.service';
import {
  DataOptions,
  FormFieldName,
} from '@shared/components/advanced-search/advanced-search.component';
import { AdvancedSearchFieldsEnum } from '@shared/components/advanced-search/advancedSearch.model';
import { ICategory } from '../../reporting/model/incidents-report';
import { IncidentsService } from '@core/api/services/incident.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { IncidentFilter } from '@core/api/models/filters.model';
import { CommonService } from '@core/services/common.service';
import { IStorageService } from '@core/services/storage.service';
import { AppCommonData } from '@core/entities/AppCommonData';
import { Directionality } from '@angular/cdk/bidi';
import {
  DisplayColumn,
  INCIDENTS_TABS,
  INCIDENT_STATUS,
  PageConfig,
} from '../incidents.model';
import { TranslationService } from '../../i18n/translation.service';
import { AppCacheKeys } from '@core/constant/AppCacheKeys';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { InquiryService } from '@core/api/services/inquiry.service';
import { Inquiry } from '@core/api/models/inquiry.model';
import { IncidentViewsEnum } from '../new-incidents-view/const';

export enum ViewMode {
  Card = 'card',
  Table = 'table',
}

export const INTERIM_STATUS = [
  { id: 1, nameEn: 'Under Evaluation', nameAr: 'تحت التقييم', value: '1'},
  { id: 2, nameEn: 'Approved', nameAr: 'معتمد', value: '2' },
  { id: 3, nameEn: 'Declined', nameAr: 'مرفوض', value: '3' },
  { id: 4, nameEn: 'Transferred', nameAr: 'تحويل', value: '4' },
];

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss'],
})
export class IncidentComponent implements OnInit, AfterViewInit {
  // UI
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchbar') searchbar: ElementRef;
  @ViewChild('panel') panel: MatExpansionPanel;

  // Variables
  displayedColumns: DisplayColumn[] = [];
  inquiriesDisplayedColumns: DisplayColumn[] = [];
  inquiries: Inquiry[] = [];
  paginationConfigInquiries: PageConfig;
  inquiriesSort: MatSort;
  inquiriesFilter = {};

  dataSource: MatTableDataSource<any>;
  panelOpenState = false;
  incidents: any[] = [];
  lang = 'en';
  currentTab = 'Day';
  commonData: AppCommonData;
  previlage: any;
  page = 1;
  paginationConfigIncidents: PageConfig;
  paginationConfigClosedIncidents: PageConfig;
  ProBackstyle: any;
  form: FormGroup;
  InterimForm: FormGroup;
  status: any;
  priorities: any;
  minDate: Date;
  maxDate: Date;
  searchText = '';
  loading = new BehaviorSubject<boolean>(false);
  toggleSearch = false;
  canReportIncident: boolean;
  DialogRef: MatDialogRef<any>;
  showInterim = true;
  Interimincidents: any = [];
  paginationInterim: PageConfig;
  selectedTab = 0;
  incidentsFilter: IncidentFilter = {};
  viewMode = ViewMode;
  currentViewMode = ViewMode.Table;
  incidentsFormFields: FormFieldName[] = [
    { formControlName: AdvancedSearchFieldsEnum.SUBJECT },
    { formControlName: AdvancedSearchFieldsEnum.SR_NO },
    { formControlName: AdvancedSearchFieldsEnum.CREATED_DATE },
    { formControlName: AdvancedSearchFieldsEnum.END_DATE },
    { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
    { formControlName: AdvancedSearchFieldsEnum.IS_KPI_EXPIRED },
  ];
  reportedVia: any = [];
  interimStatus: any = [];
  advancedSearchDataList: DataOptions[] = [];
  closedIncidents: any[] = [];
  centers: any[] = [];
  incidentStatus = INCIDENT_STATUS;
  incidentsTabs = INCIDENTS_TABS;
  sortPage = '';
  pageActive = '';

  constructor(
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private storageService: IStorageService,
    private notificationsService: PushNotificationsService,
    protected location: Location,
    private incidentService: IncidentsService,
    public directionality: Directionality,
    private translationService: TranslationService,
    private inquiryService: InquiryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.commonService.getCommonData();
    this.previlage = this.storageService.getItem<string[]>(
      AppCacheKeys.USER_PRIVILEGES
    );
    this.paginationConfigIncidents = {
      itemsPerPage: 20,
      currentPage: 0,
      totalItems: 100,
      id: 'inc_table_rep',
      sort: '',
      active: '',
    };
    this.paginationConfigClosedIncidents = {
      itemsPerPage: 20,
      currentPage: 0,
      totalItems: 100,
      id: 'inc_table_comp',
      sort: '',
      active: '',
    };
    this.paginationConfigInquiries = {
      itemsPerPage: 20,
      currentPage: 0,
      totalItems: 100,
      id: 'first',
      sort: '',
      active: '',
    };
    this.paginationInterim = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: 100,
      id: 'interpage',
      sort: '',
      active: '',
    };
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      { id: 'id', keyTranslate: 'INCIDENTS.SR_NO' },
      { id: 'subject', keyTranslate: 'INCIDENTS.SUBJECT' },
      { id: 'priority', keyTranslate: 'INCIDENTS.PRIORITY' },
      { id: 'incidentCategory', keyTranslate: 'INCIDENTS.CATEGORY' },
      { id: 'center', keyTranslate: 'INCIDENTS.CENTER' },
      { id: 'teams', keyTranslate: 'INCIDENTS.TEAMS_ASSIGNED' },
      { id: 'incidentDate', keyTranslate: 'INCIDENTS.DATE' },
      { id: 'actions', keyTranslate: 'INCIDENTS.ACTIONS' },
    ];
    this.inquiriesDisplayedColumns = [
      { id: 'id', keyTranslate: 'INCIDENTS.INQUIRIES.ID' },
      { id: 'subject', keyTranslate: 'INCIDENTS.INQUIRIES.SUBJECT' },
      { id: 'createdDate', keyTranslate: 'INCIDENTS.INQUIRIES.CREATED_DATE' },
      {
        id: 'reportedByMobile',
        keyTranslate: 'INCIDENTS.INQUIRIES.REPORTER_PHONE',
      },
      { id: 'actions', keyTranslate: 'INCIDENTS.ACTIONS' },
    ];
    this.loadCenters();
    this.createForm();
    this.loadingAdvancedSearchData();
    this.canCreateIncident();

    this.loading.next(true);

    this.reportedVia = this.commonData?.reportingVias;
    this.interimStatus = this.commonData?.interimIncidentStatuses;
    this.getTargetViewIfExist();
  }

  getTargetViewIfExist() {
    const viewId = +this.activatedRoute.snapshot.params['view'];
    const tabChangeEvent = new MatTabChangeEvent();
    if (viewId === IncidentViewsEnum.INTERIM_INCIDENTS) {
      tabChangeEvent.index = INCIDENTS_TABS.INTERIM_INCIDENT_TAB;
      this.createForm();
      this.onTabChange(tabChangeEvent);
    } else {
      this.getProcessingIncidents();
    }
  }

  getProcessingIncidents() {
    this.incidentService
      .getAllWithFilters(
        0,
        { status: INCIDENT_STATUS.IN_PROCESSING },
        { active: 'incidentDate', direction: 'desc' }
      )
      .subscribe((data) => {
        this.incidents = data.result.content;
        this.paginationConfigIncidents.totalItems = data.result.totalElements;
        this.getAssignedCities();
        this.getAssignedIncidentsCategories();
        this.loading.next(false);
      });
  }

  getInquiries(isSorting?: boolean) {
    this.loading.next(true);
    this.inquiryService
      .getInquiriesByPage(
        this.inquiriesFilter,
        this.paginationConfigInquiries.currentPage,
        this.paginationConfigInquiries.itemsPerPage,
        this.inquiriesSort
      )
      .subscribe((data) => {
        this.inquiries = data?.result?.content;
        this.loading.next(false);
        this.paginationConfigInquiries.totalItems = data.result.totalElements;
        this.paginationConfigInquiries.currentPage = isSorting
          ? data.result.number
          : data.result.number + 1;
        this.cd.detectChanges();
      });
  }
  onPaginationChangedInquiries(event) {
    this.paginationConfigInquiries = event;
    this.getInquiries(false);
  }
  onSortChangedInquiries(event) {
    if(event.active != 'actions'){
      this.inquiriesSort = event;
      this.getInquiries(true);
    }

  }

  taskMap(data) {
    const tasks = data.result.content as any[];
    tasks.forEach(async (task) => {
      task.body = `${task.body?.substr(0, 50)?.substr(0, 50)} ${
        task?.body?.length > 50 ? '...' : ''
      }`;

      task.dueDate = new Date(task.dueDate);
      // set task priority
      task.priority = { id: task?.priority?.id ?? task?.priorityId };
      task.priority = _.find(this.commonData.priorities, [
        'id',
        task?.priority?.id,
      ]);

      // set task status
      task.status = { id: task.status?.id ?? task.statusId };
      const status = _.find(this.commonData.taskStatus, [
        'id',
        task?.status?.id,
      ]);
      if (!_.isEmpty(status)) {
        task.status.name = this.lang === 'en' ? status.nameEn : status.nameAr;
      }
    });
    return { tasks, totalElements: data?.result?.totalElements };
  }

  getAssignedCities() {
    const citiesIDs = [...new Set(this.incidents.map((v) => v.city?.id))];
    const CitiesArr = citiesIDs.map((v) =>
      this.commonData.cities.find((city) => city.id == v)
    );
    this.incidents.forEach((v) => {
      v.city = CitiesArr.find((vc) => vc.id == v?.city?.id);
    });
    this.closedIncidents.forEach((v) => {
      v.city = CitiesArr.find((vc) => vc.id == v?.city?.id);
    });
  }

  getAssignedIncidentsCategories() {
    const categoriesIDs = [
      ...new Set(this.incidents.map((v) => v.incidentCategory?.id)),
    ];
    const categoriesArr = categoriesIDs.map((v) =>
      this.commonData?.incidentCategories.find((cat) => cat.id == v)
    );
    this.incidents.forEach((v) => {
      v.incidentCategory = categoriesArr.find(
        (vic) => vic?.id == v?.incidentCategory?.id
      );
    });
    this.closedIncidents.forEach((v) => {
      v.incidentCategory = categoriesArr.find(
        (vic) => vic?.id == v?.incidentCategory?.id
      );
    });
  }

  loadingAdvancedSearchData() {
    const priorities: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.PRIORITY,
      children: this.commonData?.priorities,
    };
    const cities: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.CITY,
      children: this.commonData?.cities,
    };
    const mainCategories: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.CATEGORY,
      children: this.commonData?.incidentCategories?.filter(
        (cat: ICategory) => cat.parent === null
      ),
    };
    const reportingVias: DataOptions = {
      formControlName: AdvancedSearchFieldsEnum.REPORTING_VIA,
      children: this.commonData?.reportingVias,
    };
    const status: DataOptions = {
      formControlName: null,
      children: this.commonData?.incidentStatus,
    };
    this.advancedSearchDataList = [
      priorities,
      cities,
      mainCategories,
      reportingVias,
      status,
    ];
  }

  onFilterChanged(event) {
    this.loading.next(true);
    if (this.selectedTab == INCIDENTS_TABS.INQUIRY_TAB) {
      this.inquiriesSort = null;
      this.paginationConfigInquiries.currentPage = 0;
      this.inquiriesFilter = event;
      this.getInquiries();
    } else {
      this.incidentsFilter = event;
      this.incidentsFilter.status =
        this.selectedTab == INCIDENTS_TABS.REPORTED_INCIDENT_TAB
          ? INCIDENT_STATUS.IN_PROCESSING
          : INCIDENT_STATUS.DONE;
      this.incidentService
        .getAllWithFilters(0, this.incidentsFilter, {
          active: 'incidentDate',
          direction: 'desc',
        })
        .subscribe((data) => {
          this.loading.next(false);
          if (this.selectedTab == INCIDENTS_TABS.REPORTED_INCIDENT_TAB) {
            this.incidents = data.result.content;
            this.paginationConfigIncidents.currentPage = 1;
            this.paginationConfigIncidents.totalItems =
              data.result.totalElements;
          } else if (this.selectedTab == INCIDENTS_TABS.CLOSED_INCIDENT_TAB) {
            this.closedIncidents = data.result.content;
            this.paginationConfigClosedIncidents.currentPage = 1;
            this.paginationConfigClosedIncidents.totalItems =
              data.result.totalElements;
          }
          this.cd.detectChanges();
        });
    }
  }

  back() {
    this.location.back();
  }

  createForm() {
    this.InterimForm = this.fb.group({
      status: [''],
      subject: [''],
      reporterMobile: [''],
      reportingVia: [''],
    });
  }

  viewIncident(id) {
    this.router.navigate(['incidents/view', id]);
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

  updateIncident(id) {
    this.router.navigate(['incidents/edit', id]);
  }

  onSubmitInterim() {
    this.loading.next(true);
    this.getInterimIncidents();
  }

  clearSearchInterim() {
    this.InterimForm.reset();
    this.getInterimIncidents();
  }

  onSortInterimIncidents(event: any) {
    let sort = `${event.active},${event.direction}`;
    this.getInterimIncidents(sort);
  }

  getInterimIncidents(sort?: string) {
    this.incidentService.InterimForm = this.InterimForm.value;
    this.incidentService.sortInterim = sort;
    this.loading.next(true);
    this.incidentService
      .searchInterimIncidents(0, this.InterimForm.value, 20, sort)
      .pipe(
        map((res) => {
          return res['result'];
        })
      )
      .subscribe(
        (data) => {
          if (data) {
            this.Interimincidents = data.content;
            this.paginationInterim.totalItems = data.totalElements;
            this.loading.next(false);
            this.cd.markForCheck();
          }
        },
        (error) => {
          this.loading.next(false);
        }
      );
  }

  reportIncident() {
    this.router.navigate(['incidents/report']);
  }

  createTask(title, id) {
    this.router.navigate(['incidents/createTask', { title, id }]);
  }

  getStatusId(id) {
    if (!_.isEmpty(this.commonData)) {
      const status = _.find(this.commonData.incidentStatus, ['id', id]);
      return this.lang === 'en' ? status.nameEn : status.nameAr;
    }
  }

  canCreateIncident() {
    this.canReportIncident = this.previlage.includes('PRIV_CR_INC');
  }

  notify(title, msg) {
    const data = [];
    data.push({
      title: 'Approval',
      alertContent: 'This is First Notification Alert ',
    });
    this.notificationsService.generateNotification(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(type, id, incId) {
    this.DialogRef = this.dialog.open(ResponsibleOrgsComponent, {
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

  setPrimaryOrg(incidents) {
    incidents.forEach((inc) => {
      inc['incidentOrgs'].forEach((org) => {
        if (org.isMain && org.isMain == true) {
          inc.primaryOrgId = org.orgStructure.id;
        }
      });
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    if (
      this.selectedTab == INCIDENTS_TABS.INQUIRY_TAB &&
      event.index != INCIDENTS_TABS.INQUIRY_TAB
    ) {
      let ctrl = [
        { formControlName: AdvancedSearchFieldsEnum.PRIORITY },
        { formControlName: AdvancedSearchFieldsEnum.IS_KPI_EXPIRED },
        { formControlName: AdvancedSearchFieldsEnum.SR_NO },
      ];
      this.incidentsFormFields = [...this.incidentsFormFields, ...ctrl];
      this.cd.detectChanges();
    }
    this.selectedTab = event.index;
    switch (this.selectedTab) {
      case INCIDENTS_TABS.CLOSED_INCIDENT_TAB:
        this.getClosedIncidents();
        break;
      case INCIDENTS_TABS.INQUIRY_TAB: {
        this.incidentsFormFields = this.incidentsFormFields.filter((item) => {
          if (
            item.formControlName != AdvancedSearchFieldsEnum.PRIORITY &&
            item.formControlName != AdvancedSearchFieldsEnum.IS_KPI_EXPIRED &&
            item.formControlName != AdvancedSearchFieldsEnum.SR_NO
          ) {
            return item;
          }
        });
        this.getInquiries(true);
        break;
      }
      case INCIDENTS_TABS.INTERIM_INCIDENT_TAB:
        this.getInterimIncidents();
        break;
    }
  }

  getClosedIncidents() {
    this.loading.next(true);
    this.incidentService
      .getAllWithFilters(
        0,
        { status: INCIDENT_STATUS.DONE },
        { active: 'incidentDate', direction: 'desc' }
      )
      .subscribe((data) => {
        this.closedIncidents = data.result.content;
        this.paginationConfigClosedIncidents.totalItems =
          data.result.totalElements;
        this.loading.next(false);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onPaginationChanged(event: PageConfig) {
    this.sortPage = event.sort;
    this.pageActive = event.active;
    this.loading.next(true);
    if (this.selectedTab == INCIDENTS_TABS.REPORTED_INCIDENT_TAB) {
      this.incidentsFilter.status = INCIDENT_STATUS.IN_PROCESSING;
    } else if (this.selectedTab === INCIDENTS_TABS.CLOSED_INCIDENT_TAB) {
      this.incidentsFilter.status = INCIDENT_STATUS.DONE;
    } else {
      return;
    }
    const webservicePageNumber =
      event.currentPage > 0 ? event.currentPage - 1 : 0;
    if (this.selectedTab == INCIDENTS_TABS.REPORTED_INCIDENT_TAB) {
      if (this.sortPage == 'desc' || this.sortPage == '') {
        this.incidentService
          .getAllWithFilters(webservicePageNumber, this.incidentsFilter, {
            active: this.pageActive,
            direction: 'desc',
          })
          .subscribe((data) => {
            this.incidents = data.result.content;
            this.paginationConfigIncidents.currentPage = event.currentPage;
            this.paginationConfigIncidents.totalItems =
              data.result.totalElements;
            this.loading.next(false);
            this.cd.detectChanges();
          });
      }
      if (this.sortPage == 'asc') {
        this.incidentService
          .getAllWithFilters(webservicePageNumber, this.incidentsFilter, {
            active: this.pageActive,
            direction: 'asc',
          })
          .subscribe((data) => {
            this.incidents = data.result.content;
            this.paginationConfigIncidents.currentPage = event.currentPage;
            this.paginationConfigIncidents.totalItems =
              data.result.totalElements;
            this.loading.next(false);
            this.cd.detectChanges();
          });
      }
    } else if (this.selectedTab == INCIDENTS_TABS.CLOSED_INCIDENT_TAB) {
      if (this.sortPage == 'desc' || this.sortPage == '') {
        this.incidentService
          .getAllWithFilters(webservicePageNumber, this.incidentsFilter, {
            active: this.pageActive,
            direction: 'desc',
          })
          .subscribe((data) => {
            this.loading.next(false);
            this.closedIncidents = data.result.content;
            this.paginationConfigClosedIncidents.currentPage =
              event.currentPage;
            this.paginationConfigClosedIncidents.totalItems =
              data.result.totalElements;
            this.cd.detectChanges();
          });
      }
      if (this.sortPage == 'asc') {
        this.incidentService
          .getAllWithFilters(webservicePageNumber, this.incidentsFilter, {
            active: this.pageActive,
            direction: 'asc',
          })
          .subscribe((data) => {
            this.loading.next(false);
            this.closedIncidents = data.result.content;
            this.paginationConfigClosedIncidents.currentPage =
              event.currentPage;
            this.paginationConfigClosedIncidents.totalItems =
              data.result.totalElements;
            this.cd.detectChanges();
          });
      }
    }
  }

  onSortChange(event: any) {
    this.loading.next(true);
    if (this.selectedTab == INCIDENTS_TABS.REPORTED_INCIDENT_TAB) {
      this.incidentsFilter.status = INCIDENT_STATUS.IN_PROCESSING;
    } else if (this.selectedTab === INCIDENTS_TABS.CLOSED_INCIDENT_TAB) {
      this.incidentsFilter.status = INCIDENT_STATUS.DONE;
    } else {
      return;
    }
    const webservicePage =
      this.paginationConfigIncidents.currentPage > 0
        ? this.paginationConfigIncidents.currentPage - 1
        : this.paginationConfigIncidents.currentPage;
    this.incidentService
      .getAllWithFilters(webservicePage, this.incidentsFilter, event)
      .subscribe(
        (data) => {
          this.loading.next(false);
          if (this.selectedTab == INCIDENTS_TABS.REPORTED_INCIDENT_TAB) {
            this.incidents = data.result.content;
          } else if (this.selectedTab == INCIDENTS_TABS.CLOSED_INCIDENT_TAB) {
            this.closedIncidents = data.result.content;
          }
          this.cd.detectChanges();
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.loading.next(false);
        }
      );
  }

  private loadCenters() {
    this.incidentService.getCenters().subscribe((res) => {
      this.centers = res['result'];
    });
  }

  onViewModeChange(event: MatButtonToggleChange) {
    this.currentViewMode = event.value;
  }
}
