import { IncidentsService } from './../../../../../_metronic/core/services/incidents.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

import { PushNotificationsService } from 'src/app/_metronic/core/services/push.notifications.service';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Directionality } from '@angular/cdk/bidi';
import { IncidentCategory2 } from '@core/entities/AppCommonData';
import { ClosureIncidentPopupComponent } from '@shared/components/closure-incident-popup/closure-incident-popup.component';

@Component({
  selector: 'app-view-interim-incident',
  templateUrl: './view-interim-incident.component.html',
  styleUrls: ['./view-interim-incident.component.scss'],
})
export class ViewInterimIncidentComponent implements OnInit {
  // UI
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  tabs = [
    {
      key: 'INCIDENTS.INCIDENT_INFO',
      icon: 'Code/Info-circle',
      index: 0,
    },
    // {
    //   key: 'INCIDENTS.MAP_INFO',
    //   icon: 'Map/Marker2',
    //   index: 1,
    // },
    {
      key: 'INCIDENTS.LIST_OF_FILES',
      icon: 'Files/Selected-file',
      index: 2,
    },
  ];

  changeCurrentTab(tab) {
    this.currentTab = tab.index;
  }
  loading = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  DialogRef: MatDialogRef<any>;

  // Variables
  isMobileView = true;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  incidentDetails: any;
  incidentTasks: any;
  workLogs: any;
  incidentId: any;
  incidentSubject: any;
  Porg: any = '';
  PorgID: any = '';
  Sorg: any = [];
  operational_Reports: any;
  taskTypes: any;
  ProBackstyle: any;
  paginationConfig: any;
  subCatId: any;
  kpiPeriod: any;

  lang = 'en';
  currentTab = 0;
  commonData: any;
  currentOrg: any = '';

  selectedFiles: FileList;

  message = '';

  dataSource: any;
  orgId: any;
  canEdit: boolean = false;
  category: any;
  mainCategory: any;

  assetData: any[] = [];

  back() {
    this.location.back();
  }
  public form: FormGroup;

  displayStatisticsChart: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    public _matDialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _notificationService: PushNotificationsService,
    private incidentservice: IncidentsService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    public directionality: Directionality
  ) {
    let id = this.route.snapshot.params['id'];
    this.incidentId = id;

    this._notificationService.requestPermission();

    this.paginationConfig = {
      itemsPerPage: 5,
      currentPage: 0,
      totalItems: 0,
    };
    this.form = this.formBuilder.group({
      incidentHospitals: [],
    });

    this.incidentservice.viewInterimIncidents(id).subscribe(
      async (data) => {
        if (data) {
          this.incidentDetails = data.result;
          this.category = (
            this.commonData['incidentCategories'] as IncidentCategory2[]
          ).find((cat) => cat.id == this.incidentDetails?.category?.id);
          this.mainCategory = (
            this.commonData['incidentCategories'] as IncidentCategory2[]
          ).find((cat) => cat.id == this.category?.parent?.id);
          this.cd.detectChanges();
        }
      },
      (error) => {}
    );
  }

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = JSON.parse(localStorage.getItem('commonData'));

    this.currentOrg = this.commonData.currentOrgDetails;

    // process  view  and  responsive
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobileView = state.matches;
        this.isMobileView ? this.drawer.close() : this.drawer.open();
        this.cd.detectChanges();
      });
  }

  getReportedVia(id) {
    if (!_.isEmpty(this.commonData)) {
      const status = _.find(this.commonData?.reportingVias, ['id', id]);
      return this.lang === 'en' ? status?.nameEn : status?.nameAr;
    }
  }

  getStatusVia(id) {
    if (!_.isEmpty(this.commonData)) {
      const status = _.find(this.commonData?.interimIncidentStatuses, ['id', id]);
      return this.lang === 'en' ? status?.nameEn : status?.nameAr;
    }
  }

  getcityId(id) {
    if (!_.isEmpty(this.commonData)) {
      const city = _.find(this.commonData?.cities, ['id', id]);
      return this.lang === 'en' ? city?.nameEn : city?.nameAr;
    }
  }

  changeStatus(event, id) {
    event.stopPropagation();
    this.openStatusDialog(id);
  }

  openStatusDialog(id): void {
    const dialogRef = this._matDialog.open(StatusDialogComponent, {
      width: '540px',
      disableClose: false,
      data: {
        incId: id,
        message:
          this.lang == 'en'
            ? 'Are you sure you want to decline?'
            : 'هل انت متأكد من إلغاء الطلب؟',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
  }

  getActionDoneByFullName(action: any) {
    return this.lang == 'en' ? action?.['firstNameEn'] + ' ' + action?.['lastNameEn'] : action?.['firstNameAr'] + ' ' + action?.['lastNameAr'];
  }
}
