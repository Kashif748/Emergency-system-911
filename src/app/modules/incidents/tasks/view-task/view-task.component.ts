import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OrgService } from '@core/api/services/org.service';
import { GroupService } from '@core/api/services/group.service';
import { UserService } from '@core/api/services/user.service';
import * as _ from 'lodash';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { UrlHelperService } from 'src/app/core/services/url-helper.service';
import { map } from 'rxjs/operators';
import { PrivilegesService } from 'src/app/core/services/privileges.service';
import { TranslationService } from '../../../i18n/translation.service';
import { IncidentsService } from '../../../../_metronic/core/services/incidents.service';
import { MapConfig } from '@shared/components/map/services/map.service';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { CommonService } from '@core/services/common.service';
import { AppCommonData } from '@core/entities/AppCommonData';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareMapLocationComponent } from '../../view-incidents/share-map-location/share-map-location.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  // UI
  tabs = [
    {
      key: 'TASK.TASK_INFO',
      icon: 'Code/Info-circle',
      index: 0,
    },
    {
      key: 'TASK.WORKLOG.LABEL',
      icon: 'Code/Time-schedule',
      index: 1,
    },
    {
      key: 'INCIDENTS.MAP_INFO',
      icon: 'Map/Marker2',
      index: 2,
    },
    {
      key: 'INCIDENTS.LIST_OF_FILES',
      icon: 'Files/Selected-file',
      index: 3,
    },
    {
      key: 'INCIDENTS.NOTIFICATIONS',
      icon: 'General/Notifications1',
      index: 4,
      privileges: 'PRIV_VW_TSK_NOTIF',
    },
  ];

  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  @ViewChild('sidenav') sidenav: MatSidenav;
  // worklog
  @ViewChild('workLogContainer', { read: ViewContainerRef })
  workLogContainer: ViewContainerRef;
  // notifications
  @ViewChild('notificationsContainer', { read: ViewContainerRef })
  notificationsContainer: ViewContainerRef;
  DialogRef: MatDialogRef<any>;

  // Variables
  isMobileView = true;
  task: any;
  taskToUpdateStatus;
  fileInfos: any[];
  lang = 'en';
  currentTab = 0;
  commonData: AppCommonData;
  taskId: any;
  assignee: { id: any; nameAr: any; nameEn: any; type: any };
  formGroup: FormGroup;
  public mapConfig: MapConfig;
  // Constant
  readonly TASK_TAG_ID = UploadTagIdConst.TASK_WORK_LOG;
  IncidentId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private incidentService: IncidentsService,
    private orgService: OrgService,
    private groupService: GroupService,
    private userService: UserService,
    private urlHelper: UrlHelperService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
    private location: Location,
    private privilegesService: PrivilegesService,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver,
    private commonService: CommonService,
    public matDialog: MatDialog
  ) {
    this.taskId = this.route.snapshot.params['id'];
  }

  async ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.commonService.getCommonData();
    this.formGroup = this.buildForm();
    await this.loadTaskDetails();
    await this.loadTaskWorkLog();
    await this.loadNotifications();

    // process  view  and  responsive
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobileView = state.matches;
        this.isMobileView ? this.drawer.close() : this.drawer.open();
      });
  }

  private async loadTaskDetails() {
    this.incidentService.viewTask(this.taskId).subscribe(
      async (data) => {
        if (data) {
          this.IncidentId = data.result?.incidentId;
          this.taskToUpdateStatus = { ...data.result };
          this.formGroup.patchValue(this.taskToUpdateStatus);
          this.mapConfig = {
            mapType: MapViewType.TASK,
            zoomModel: {
              referenceId: data.result?.id,
              featureName: data.result?.featureName,
            },

            viewOnly: true,
            showLayers: false,
          };

          if (!data.result.featureName) {
            // load feature from incident.
            this.loadFeatureFromIncident(data.result?.incidentId);
          }

          this.task = data.result;

          let isAssignee = false;
          switch (data.result?.assignTo?.type) {
            case 'org':
              isAssignee =
                data.result?.assignTo?.assigneeId ===
                this.commonData?.currentOrgDetails?.id;
              break;
            case 'group':
              isAssignee = !!(
                this.commonData?.currentGroupDetails as any[]
              ).find((g) => g.id === data.result?.assignTo?.assigneeId);
              break;
            case 'user':
              isAssignee =
                data.result?.assignTo?.assigneeId ===
                this.commonData?.currentUserDetails?.id;
              break;
          }
          if (
            this.privilegesService.checkActionPrivileges('PRIV_RCV_TASK') &&
            isAssignee
          ) {
            await this.markAsViewed();
          }
          const assignee: { assigneeId: number; type: string } =
            this.task?.assignTo;

          // set task status
          if (!_.isEmpty(this.commonData)) {
            const status = _.find(this.commonData.taskStatus, [
              'id',
              this.task?.statusId,
            ]);
            if (!_.isEmpty(status)) {
              this.task.status =
                this.lang === 'en' ? status.nameEn : status.nameAr;
            }
          }

          // set task priority
          if (!_.isEmpty(this.commonData)) {
            this.task.priority = {
              id: this.task?.priority?.id ?? this.task?.priorityId,
            };
            this.task.priority = _.find(this.commonData.priorities, [
              'id',
              this.task?.priority?.id,
            ]);
          }

          // set task type
          const taskTypes = await this.incidentService
            .getTaskTypes()
            .pipe(map((r) => r.result as any[]))
            .toPromise();
          const type = taskTypes.find(
            (tt) => tt.id === this.task.taskType?.typeId
          );
          this.task.taskType = { ...this.task.taskType, ...type };

          // set task assignee
          switch (assignee.type) {
            case 'org':
              this.assignee = await this.orgService
                .getById(assignee?.assigneeId)
                .pipe(
                  map((r: any) => {
                    return {
                      id: r?.result?.id,
                      nameAr: r?.result?.nameAr,
                      nameEn: r?.result?.nameEn,
                      type: 'org',
                    };
                  })
                )
                .toPromise();
              break;
            case 'user':
              this.assignee = await this.userService
                .getById(assignee?.assigneeId)
                .pipe(
                  map((r: any) => {
                    return {
                      id: r?.result?.id,
                      nameAr: r?.result?.nameAr,
                      nameEn: r?.result?.nameEn,
                      type: 'user',
                    };
                  })
                )
                .toPromise();
              break;
            case 'group':
              this.assignee = await this.groupService
                .getById(assignee?.assigneeId)
                .pipe(
                  map((r: any) => {
                    return {
                      id: r?.result?.id,
                      nameAr: r?.result?.nameAr,
                      nameEn: r?.result?.nameEn,
                      type: 'group',
                    };
                  })
                )
                .toPromise();
              break;
          }

          this.cd.markForCheck();
        }
      },
      () => {
        this.alertService.openFailureSnackBar();
      }
    );

    await this.loadTaskFiles();
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
    instance.recordId = this.taskId;
    instance.moduleId = 3;
    changeDetectorRef.detectChanges();
  }

  async loadTaskFiles() {
    this.incidentService.getTaskFiles(this.taskId).subscribe(
      (data) => {
        if (data) {
          this.fileInfos = data.result;
          this.cd.markForCheck();
        }
      },
      () => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  async loadTaskWorkLog() {
    const { LogComponent } = await import('../../log/log.component');
    const workLogFactory = this.cfr.resolveComponentFactory(LogComponent);
    const { instance, changeDetectorRef } =
      this.workLogContainer.createComponent(
        workLogFactory,
        null,
        this.injector
      );
    instance.id = this.taskId;
    instance.type = 'task';
    changeDetectorRef.detectChanges();
  }

  async markAsViewed() {
    if (this.task.statusId === 1) {
      await this.updateStatus(2);
    }
  }

  async updateStatus(statusId) {
    try {
      await this.incidentService
        .updateTaskStatus(this.taskToUpdateStatus.id, statusId)
        .toPromise();

      this.alertService.openSuccessSnackBar();
      await this.loadTaskDetails();
    } catch {
      this.alertService.openFailureSnackBar();
    }
  }

  async download(file) {
    await this.urlHelper.download(file);
  }

  private buildForm() {
    return this.formBuilder.group({
      statusId: [null, [Validators.required]],
    });
  }

  changeCurrentTab(tab) {
    this.currentTab = tab.index;
  }

  back() {
    this.location.back();
  }

  async createTask() {
    await this.router.navigate(['incidents/createTask']);
  }

  private async loadFeatureFromIncident(incidentId: number) {
    try {
      const incident = await this.incidentService
        .viewIncidents(incidentId)
        .pipe(map((r) => r.result))
        .toPromise();
      this.mapConfig = {
        mapType: MapViewType.INCIDENT,
        zoomModel: {
          referenceId: incident?.id,
          featureName: incident?.featureName,
        },

        viewOnly: true,
        showLayers: false,
      };
    } catch (e) {
      this.mapConfig = {
        mapType: MapViewType.INCIDENT,
        zoomModel: {
          referenceId: incidentId,
          featureName: MapActionType.INCIDENT_POINT,
        },
        viewOnly: true,
        showLayers: false,
      };
    }
  }

  openShareMapLocationDialog() {
    this.DialogRef = this.matDialog.open(ShareMapLocationComponent, {
      disableClose: false,
      panelClass: 'modal',
      width: '400px',
      height: 'auto',
      data: {
        incidentId: this.IncidentId,
        taskId: this.taskId,
      },
    });
  }
}
