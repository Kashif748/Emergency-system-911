import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';

import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { PushNotificationsService } from 'src/app/_metronic/core/services/push.notifications.service';
import { AssetsInfoComponent } from '../assets-info/assets-info.component';
import { HospitalsComponent } from '../hospitals/hospitals.component';
import { TranslationService } from '../../i18n/translation.service';
import { TranslateService } from '@ngx-translate/core';

import { HospitalsStatisticsComponent } from '../hospital-data/hospitals-statistics/hospitals-statistics.component';
import { AlertsService } from '../../../_metronic/core/services/alerts.service';
import { IncidentsService } from '../../../_metronic/core/services/incidents.service';
import { ResponsibleOrgsModel } from './responsible-orgs/responsible-org.modal';
import { ResponsibleOrgsComponent } from './responsible-orgs/responsible-orgs.component';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { GroupService } from '@core/api/services/group.service';
import { concatMap, map, skip, takeUntil, tap, filter } from 'rxjs/operators';
import { ShareMapLocationComponent } from './share-map-location/share-map-location.component';
import { DialogService } from '@core/services/dialog.service';
import { BaseComponent } from '@shared/components/base.component';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { CommonService } from '@core/services/common.service';
import { AppCommonData } from '@core/entities/AppCommonData';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { ClosureIncidentPopupComponent } from '@shared/components/closure-incident-popup/closure-incident-popup.component';
import { IncidentLogAttachmentPopupComponent } from '@shared/components/incident-log-attachment-popup/incident-log-attachment-popup.component';
import { forkJoin } from 'rxjs';
import { Log } from '../log/log.component';
import { ShareLocationService } from '../../share-location/shareLocation.service';
import { AddressSearchResultModel } from '@shared/components/map/utils/map.models';
import { IncidentReminderComponent } from './incident-reminder/incident-reminder.component';
import { MapService } from '@shared/components/map/services/map.service';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-view-incidents',
  templateUrl: './view-incidents.component.html',
  styleUrls: ['./view-incidents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewIncidentsComponent extends BaseComponent implements OnInit {
  // UI
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('assetStatistics')
  assetStatistics: HospitalsStatisticsComponent;
  @ViewChild('hospitalEl')
  hospitalEl: HospitalsComponent;
  @ViewChild('assetEl')
  assetEl: AssetsInfoComponent;
  hideCloseAndExportIncidentReportBtn = false;
  DialogRef: MatDialogRef<any>;
  tabs = [
    {
      key: 'INCIDENTS.INCIDENT_INFO',
      icon: 'Code/Info-circle',
      index: 0,
    },
    {
      key: 'INCIDENTS.CHALLENGES_REQUMENDATIONS',
      icon: 'Code/Lock-circle',
      index: 1,
    },
    {
      key: 'INCIDENTS.WORKLOGS',
      icon: 'Code/Time-schedule',
      index: 2,
    },
    {
      key: 'OPERATIONAL_REPORTS.OPERATIONAL_REPORTS',
      icon: 'Files/File',
      index: 3,
      privileges: 'PRIV_CR_OP_RPT',
    },
    {
      key: 'INCIDENTS.TASKS_FOR_THIS_INCIDENT',
      icon: 'Code/Done-circle',
      index: 4,
    },

    {
      key: 'INCIDENTS.MAP_INFO',
      icon: 'Map/Marker2',
      index: 5,
    },

    {
      key: 'INCIDENTS.LIST_OF_FILES',
      icon: 'Files/Selected-file',
      index: 6,
    },

    {
      key: 'INCIDENTS.STATISTICS_INFO',
      icon: 'Shopping/Chart-line1',
      index: 7,
    },
    {
      key: 'INCIDENTS.ASSETS',
      icon: 'Shopping/Chart-line2',
      index: 8,
    },
    {
      key: 'INCIDENTS.LOCATION_EVENTS',
      icon: 'Map/Position',
      index: 9,
    },
    {
      key: 'INCIDENTS.REMINDER',
      icon: 'Home/Alarm-clock',
      index: 10,
    },
    {
      key: 'INCIDENTS.NOTIFICATIONS',
      icon: 'General/Notifications1',
      index: 11,
      privileges: 'PRIV_VW_INC_NOTIF',
    },
  ];
  public form: FormGroup;

  @ViewChild('hospitalsContainer', { read: ViewContainerRef })
  hospitalsContainer: ViewContainerRef;

  // worklog
  @ViewChild('worklogContainer', { read: ViewContainerRef })
  worklogContainer: ViewContainerRef;

  // incident tasks
  @ViewChild('tasksContainer', { read: ViewContainerRef })
  tasksContainer: ViewContainerRef;

  // operation reports
  @ViewChild('operationalReportsContainer', { read: ViewContainerRef })
  operationalReportsContainer: ViewContainerRef;

  // challenges
  @ViewChild('challengesContainer', { read: ViewContainerRef })
  challengesContainer: ViewContainerRef;

  // reminders
  @ViewChild('reminderContainer', { read: ViewContainerRef })
  reminderContainer: ViewContainerRef;

  // notifications
  @ViewChild('notificationsContainer', { read: ViewContainerRef })
  notificationsContainer: ViewContainerRef;

  // Variables
  isMobileView = true;
  readonly INCIDENT_TAG_ID = UploadTagIdConst.INCIDENT;
  readonly REPORTER_TAG_ID = UploadTagIdConst.REPORTER_IMAGE;
  priorityStyle: any;
  incidentDetails: any;
  incidentId: any;
  Porg: any = '';
  incidentOrg: any = [];
  PorgID: any = '';
  Sorg: any = [];
  paginationConfig: any;
  kpiPeriod: any;
  lang = 'en';
  currentTab = 0;
  commonData: AppCommonData;
  hospitalInfo: [];
  message = '';
  data: ResponsibleOrgsModel[];
  dataSource: any;
  orgId: any;
  canEdit = false;
  assetData: any[] = [];
  Hospitals: any[] = [];
  incidentCategory: any;
  incidentSubCategories: any[] = [];
  isExportingPDF = false;
  showMapLocation = true;
  addressPointLocation: AddressSearchResultModel = null;
  showMapComponent: boolean = false;
  isDraft: boolean = false;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private translateService: TranslateService,
    private alertService: AlertsService,
    private cd: ChangeDetectorRef,
    public matDialog: MatDialog,
    private notificationsService: PushNotificationsService,
    private incidentsService: IncidentsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly customDatePipe: CustomDatePipe,
    protected groupService: GroupService,
    private dialogService: DialogService,
    private breakpointObserver: BreakpointObserver,
    private readonly commonService: CommonService,
    private shareLocationService: ShareLocationService,
    protected mapService: MapService,
    private dialog: MatDialog,
  ) {
    super();
    this.incidentId = this.route.snapshot.params['id'];
    this.notificationsService.requestPermission();
    this.paginationConfig = {
      itemsPerPage: 5,
      currentPage: 0,
      totalItems: 0,
    };
    this.form = this.formBuilder.group({
      incidentHospitals: [],
    });
  }

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.commonService.getCommonData();
    console.log(this.commonData['incidentStatus']);
    this.dataSource = new MatTableDataSource(this.data);
    this.orgId = this.getOrgId();
    this.loadIncident(this.incidentId);
    this.incidentsService.responsibleOrgsChange
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.loadIncident(this.incidentId);
      });

    // process  view  and  responsive
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobileView = state.matches;
        this.isMobileView ? this.drawer.close() : this.drawer.open();
        this.cd.detectChanges();
      });
  }

  private loadIncident(id: any) {
    forkJoin({
     /* reportLocationRequest: this.shareLocationService.getReporterLocation(
        this.incidentId
      ),*/
      incidentDetails: this.incidentsService.viewIncidents(id),
    }).subscribe(
      ({ incidentDetails }) => {
        /*if (reportLocationRequest['result']) {
          if (reportLocationRequest['result']['location']) {
            const [latitude, longitude] = reportLocationRequest['result'][
              'location'
            ]['text']
              .replace('POINT (', '')
              .replace(')', '')
              .split(' ');
            this.addressPointLocation = {
              Lat: latitude ?? '',
              Lng: longitude ?? '',
              Address: '',
            };
          }
        }*/

        if (incidentDetails) {
          this.incidentDetails = incidentDetails.result;
          // draft incident
          if (this.incidentDetails?.status?.id === 5) {
            this.isDraft = true;
            this.hideCloseAndExportIncidentReportBtn = true;
            this.hideDraftTabs();
          }
          this.form
            .get('incidentHospitals')
            .patchValue(this.incidentDetails?.incidentHospitals);
          this.incidentDetails['incidentDate'] = this.datePipe.transform(
            this.customDatePipe.transform(this.incidentDetails['incidentDate']),
            'yyyy-MM-dd HH:mm:ss'
          );

          this.hospitalInfo = incidentDetails.result.incidentHospitals;
          this.Hospitals = [...incidentDetails.result.incidentHospitals];
          this.incidentsService.setHospitals(this.Hospitals);

          if (this.incidentDetails?.kpi) {
            this.getKpis(this.incidentDetails?.kpi.id);
          }
          this.getOrgName();
          this.canEditResponsible();
          this.cd.detectChanges();
        }
      },
      (error) => {
        this.hideCloseAndExportIncidentReportBtn = true;
      }
    );
  }

  deleteIncident() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.incidentsService
            .updateIncidentStatus({
              incidentId: this.incidentDetails?.id,
              statusId: 4,
              finalStatement: '',
            })
            .subscribe(
              (response) => {
                this.alertService.openSuccessSnackBar();
                this.back();
              },
              (err) => {
                this.alertService.openFailureSnackBar();
              }
            );
        }
      });
  }
  back() {
    this.location.back();
  }

  changeCurrentTab(tab) {
    this.currentTab = tab.index;
    this.selectedTabChange({ index: tab.index } as any);
  }
  async selectedTabChange(event: MatTabChangeEvent) {
    this.currentTab = event.index;
    switch (event.index) {
      case 1:
        await this.loadChallenges();
        break;
      case 2:
        await this.loadWorkLog();
        break;
      case 3:
        await this.loadOperationalReports();
        break;
      case 4:
        await this.loadTasks();
        break;
      case 5:
        await this.getReporterLocation(this.incidentId);
        break;
      case 7:
        await this.loadHospitals();
        break;
      case 10:
        await this.loadReminder();
      case 11:
        await this.loadNotifications();
        break;
    }
  }
  hideDraftTabs() {
    const visiableTabs = [0, 5, 2, 6, 11];
    this.tabs = this.tabs.filter((tab) => visiableTabs.includes(tab.index));
  }

  async getReporterLocation(incidentId?: string) {
    this.shareLocationService
      .getReporterLocation(incidentId)
      .subscribe((assets: any) => {
        if (assets['result']) {
          if (assets['result']['location']) {
            const [latitude, longitude] = assets['result'][
              'location'
              ]['text']
              .replace('POINT (', '')
              .replace(')', '')
              .split(' ');
            this.addressPointLocation = {
              Lat: latitude ?? '',
              Lng: longitude ?? '',
              Address: '',
            };
          }
        }
        this.showMapComponent = true;
        if (assets['location']) {
          const [latitude, longitude] = assets['location']['text']
            .replace('POINT (', '')
            .replace(')', '')
            .split(' ');
          this.addressPointLocation = {
            Lat: latitude ?? '',
            Lng: longitude ?? '',
            Address: '',
          };
        }
        this.cd.detectChanges();
      });
  }

  async loadHospitals() {
    this.hospitalsContainer?.clear();
    const { HospitalsContainerComponent } = await import(
      './hospitals-container/hospitals-container.component'
    );
    const hospitalsFactory = this.cfr.resolveComponentFactory(
      HospitalsContainerComponent
    );
    const { instance, changeDetectorRef } =
      this.hospitalsContainer.createComponent(
        hospitalsFactory,
        null,
        this.injector
      );
    instance.form = this.form;
    instance.incidentId = this.incidentDetails.id;
    changeDetectorRef.detectChanges();
  }

  async loadWorkLog() {
    this.worklogContainer?.clear();
    const { LogComponent } = await import('../log/log.component');
    const workLogFactory = this.cfr.resolveComponentFactory(LogComponent);
    const { instance, changeDetectorRef } =
      this.worklogContainer.createComponent(
        workLogFactory,
        null,
        this.injector
      );
    instance.id = this.incidentId;
    instance.type = 'incident';
    instance.incident = this.incidentDetails;
    changeDetectorRef.detectChanges();
  }

  async loadTasks() {
    this.tasksContainer?.clear();
    const { IncidentTaskComponent } = await import(
      './incident-task/incident-task.component'
    );
    const incidentTaskFactory = this.cfr.resolveComponentFactory(
      IncidentTaskComponent
    );
    const { instance, changeDetectorRef } = this.tasksContainer.createComponent(
      incidentTaskFactory,
      null,
      this.injector
    );
    instance.incidentDetails = this.incidentDetails;
    changeDetectorRef.detectChanges();
  }

  async loadOperationalReports() {
    this.operationalReportsContainer?.clear();
    const { OperationalReportsComponent } = await import(
      '../operational-reports/operational-reports.component'
    );
    const operationalReportsFactory = this.cfr.resolveComponentFactory(
      OperationalReportsComponent
    );
    const { instance, changeDetectorRef } =
      this.operationalReportsContainer.createComponent(
        operationalReportsFactory,
        null,
        this.injector
      );
    instance.incId = this.incidentId;
    changeDetectorRef.detectChanges();
  }

  async loadChallenges() {
    this.challengesContainer?.clear();
    const { ChallengesComponent } = await import(
      '../challenges/challenges.component'
    );
    const challengesFactory =
      this.cfr.resolveComponentFactory(ChallengesComponent);
    const { instance, changeDetectorRef } =
      this.challengesContainer.createComponent(
        challengesFactory,
        null,
        this.injector
      );
    changeDetectorRef.detectChanges();
  }

  async loadReminder() {
    this.reminderContainer?.clear();
    const { IncidentReminderComponent } = await import(
      '../view-incidents/incident-reminder/incident-reminder.component'
    );
    const reminderFactory = this.cfr.resolveComponentFactory(
      IncidentReminderComponent
    );
    const { instance, changeDetectorRef } =
      this.reminderContainer.createComponent(
        reminderFactory,
        null,
        this.injector
      );
    changeDetectorRef.detectChanges();
  }

  async loadNotifications() {
    this.notificationsContainer?.clear();
    const { NotificationsTableComponent } = await import(
      'src/app/shared/components/notifications-table/notifications-table.component'
    );
    const notificationsFactory = this.cfr.resolveComponentFactory(
      NotificationsTableComponent
    );
    const { instance, changeDetectorRef } =
      this.notificationsContainer.createComponent(
        notificationsFactory,
        null,
        this.injector
      );
    instance.recordId = this.incidentId;
    instance.moduleId = 2;

    changeDetectorRef.detectChanges();
  }

  getOrgName() {
    this.Sorg = [];
    const org = {
      name: null,
      id: null,
    };
    this.incidentOrg = [];
    this.incidentDetails.incidentOrgs.forEach((element) => {
      if (element.isMain && element.isMain == true) {
        this.lang === 'en'
          ? (this.Porg = element.orgStructure.nameEn)
          : (this.Porg = element.orgStructure.nameAr);
        this.lang === 'en'
          ? (org.name = element.orgStructure.nameEn)
          : (org.name = element.orgStructure.nameEn);
        org.id = element.orgStructure.id;
        this.PorgID = element.orgStructure.id;
        this.incidentOrg.push(org);
      } else {
        this.Sorg.push(element);
      }
    });
  }

  createTask() {
    this.router.navigate(['incidents/createTask']);
  }

  createTasks(id) {
    this.router.navigate(['incidents/createTask', { title: 'any', id }]);
  }

  updateTask(id) {
    this.router.navigate(['incidents/updateTask', id]);
  }

  viewTask(id) {
    this.router.navigate(['incidents/viewTask', id]);
  }

  getkpi(id) {
    const kpiName = _.find(this.commonData.kpi, ['id', id]);
    if (!_.isEmpty(kpiName)) {
      return this.lang === 'en' ? kpiName.nameEn : kpiName.nameAr;
    } else {
      return '';
    }
  }

  getPriorityNameId(id) {
    const priority = _.find(this.commonData.priorities, ['id', id]);
    if (priority) {
      this.priorityStyle = `text-dark font-weight-500 label label-lg label-${priority?.color} label-inline text-white`;
      return this.lang === 'en' ? priority.nameEn : priority.nameAr;
    }
    if (!_.isEmpty(priority)) {
      return this.lang === 'en' ? priority.nameEn : priority.nameAr;
    } else {
      return '';
    }
  }

  getStatusId(id) {
    const status = _.find(this.commonData.incidentStatus, ['id', id]);
    if (!_.isEmpty(status)) {
      return this.lang === 'en' ? status.nameEn : status.nameAr;
    } else {
      return '';
    }
  }

  getCityId(id) {
    const city = _.find(this.commonData.cities, ['id', id]);
    if (!_.isEmpty(city)) {
      return this.lang === 'en' ? city.nameEn : city.nameAr;
    } else {
      return '';
    }
  }

  goToUpdateIncidentPage() {
    this.router.navigate(['incidents/edit', this.incidentId]);
  }

  openAssetForm() {
    this.assetEl.add(this.incidentOrg);
  }

  getOrgId() {
    return this.commonData.currentOrgDetails.id;
  }

  getOrgCode(): string {
    return this.commonData.currentOrgDetails.code;
  }

  openModal(type, id, incId) {
    this.DialogRef = this.matDialog.open(ResponsibleOrgsComponent, {
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

  public getKpis(kpiId: number): void {
    this.incidentsService
      .getKpiById(kpiId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data && data.result) {
            const kpiPriorities = data.result.kpiPriorities;
            const kpiPriority = kpiPriorities.find(
              (k) => k.priority.id === this.incidentDetails.priority.id
            );
            if (kpiPriority) {
              this.kpiPeriod = kpiPriority.period;
            }
            this.cd.detectChanges();
          }
        },
        (error) => {}
      );
  }

  // check update previlge
  canUserUpdate(respID) {
    if (this.commonData.currentOrgDetails.id == this.PorgID) {
      return true;
    } else {
      return this.commonData.currentOrgDetails.id == respID;
    }
  }

  canEditResponsible() {
    if (this.incidentDetails?.status?.id === 2) {
      return false;
    }
    this.canEdit = this.incidentDetails?.responsibleOrg?.id ==
      this.commonData?.currentOrgDetails?.id && this.incidentDetails?.status?.id === 1;
    this.cd.detectChanges();
  }

  canShowDescription() {
    const orgExists = ['ADM', 'AAM', 'DRM'].includes(this.getOrgCode());
    if (!orgExists) {
      return true;
    }
    return (
      this.incidentDetails?.description !== null &&
      this.incidentDetails?.description != ''
    );
  }

  openShareMapLocationDialog() {
    this.DialogRef = this.matDialog.open(ShareMapLocationComponent, {
      disableClose: false,
      panelClass: 'modal',
      width: '400px',
      height: 'auto',
      data: {
        incidentId: this.incidentId,
        taskId: null,
      },
    });
  }

  closeIncidentConfirm() {
    const body = {
      createdBy: {
        id: this.commonData.currentUserDetails.id,
      },
      createdOn: new Date().toISOString(),
      id: 0,
      notes: '',
    };
    const InProgressStatusId = 1;
    const draftStatusId = 5;
    const dialogRef = this.matDialog.open(ClosureIncidentPopupComponent, {
      minWidth: '600px',
      minHeight: '400px',
      data: {
        incidentStatus: this.commonData?.incidentStatus.filter(
          (v) => v.id !== InProgressStatusId && v.id !== draftStatusId
        ),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: { status: any; finalStatement: string }) => {
        let finalStatement = data.finalStatement;
        this.incidentDetails.status = { id: data?.status?.id };
        if (data) {
          this.incidentsService
            .updateIncidentStatus({
              incidentId: +this.incidentDetails.id,
              statusId: +this.incidentDetails.status?.id,
              finalStatement: data.finalStatement,
            })
            .subscribe(
              (response) => {
                this.alertService.openSuccessSnackBar();
                this.incidentDetails.status =
                  this.commonData?.incidentStatus.find(
                    (v) => v.id === data?.status?.id
                  );
                this.incidentDetails.closedDate =
                  response['result']?.closedDate;
                this.cd.markForCheck();
                this.updateCloseDateOnGisMap();
              },
              (err) => {
                this.alertService.openFailureSnackBar();
              }
            );
        }
      });
  }

  async updateCloseDateOnGisMap() {
    // close date reflect on gis map

    let layer;
    layer = await this.mapService.getIncidentPointLayer();
    try {
      const featureSet = await this.mapService.queryGraphic(
        layer,
        'incident',
        this.incidentId
      );
      const graphics = featureSet?.features?.map((g) => {
        g.setAttribute('CLOSE_DATE', this.incidentDetails.closedDate);
        return g;
      });
      this.mapService.applyEdits(graphics, layer, 'updateFeatures');
    } catch (error) {}
  }

  getIncidentGroupName(index: number) {
    const groups = this.incidentDetails?.incidentGroups as any[];
    if (!groups) {
      return '';
    }
    const group = groups[index].group;
    const orgStructure = group?.orgStructure;
    let name = '';
    if (this.lang === 'en') {
      name = group.nameEn + ' - ' + orgStructure?.nameEn;
    } else {
      name = group.nameAr + ' - ' + orgStructure?.nameAr;
    }
    return name;
  }

  showIncidentLogAttachmentModal() {
    forkJoin({
      worklogs: this.incidentsService
        .getIncidentworkLogs(this.incidentId)
        .pipe(map((res) => res?.result?.content as Log[])),
      files: this.incidentsService
        .getIncidentFiles(this.incidentId)
        .pipe(map((res) => res?.result as any[])),
    }).subscribe(({ worklogs, files }) => {
      const dialogRef = this.matDialog.open(
        IncidentLogAttachmentPopupComponent,
        {
          minWidth: '600px',
          minHeight: '400px',
          maxHeight: '90vh',
          data: {
            worklogs: worklogs.filter((l) => l.modifiable),
            files,
          },
        }
      );

      dialogRef.afterClosed().subscribe((data) => {
        if (data?.doAction) {
          this.exportPDF(
            this.incidentId,
            data?.selectedWorkLogs,
            data?.selectedFiles
          );
        }
      });
    });
  }

  exportPDF(incidentId, workLogIds, filesUuids) {
    this.isExportingPDF = true;
    this.cd.detectChanges();
    this.incidentsService
      .exportIncidentReport(incidentId, workLogIds, filesUuids)
      .subscribe((response) => {
        const blob = new Blob([response.body], { type: 'pdf' });
        window.URL.createObjectURL(blob);

        const fileLabel = `${this.translateService.instant(
          'INCIDENTS.INCIDENT_REPORT',
          { serial: this.incidentDetails.serial }
        )}`;
        const fileDate = `${DateTimeUtil.format(
          new Date(),
          'YYYY-MM-DD H:mm'
        )}`;

        const fileName = `${fileLabel} ${fileDate}.pdf`;
        importedSaveAs(blob, fileName);
        this.isExportingPDF = false;
        this.cd.detectChanges();
      });
  }

  showShareMapLocation(event) {
    this.showMapLocation = event;
  }
}
