import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  AfterViewInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { IncidentsService as IncService } from 'src/app/core/api/services/incident.service';
import { finalize, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { CommonService } from '@core/services/common.service';
import { AppCacheKeys } from '@core/constant/AppCacheKeys';
import { AppCommonData } from '@core/entities/AppCommonData';
import { PageConfig } from '../../incidents.model';

@Component({
  selector: 'app-interim-incidents',
  templateUrl: './interim-incidents.component.html',
  styleUrls: ['./interim-incidents.component.scss'],
})
export class InterimIncidentsComponent
  implements OnInit, AfterViewInit, OnChanges
{
  // UI
  dataSource1: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line:no-input-rename
  @Input('InterimIncidents') filteredInterimIncidents = [];
  @Input('paginationInterim') paginationInterim: PageConfig;
  @Output() OnSortChanged = new EventEmitter();

  // Variables
  displayedColumns: string[];
  panelOpenState = false;
  interimIncidents: any[] = [];
  lang = 'en';
  currentTab = 'Day';
  commonData: AppCommonData;
  privilege: any;
  page = 1;
  paginationConfig: {
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    id: string;
  };
  currentOrg: any = '';
  loading = false;
  canReportIncident: boolean;
  canEdit = false;
  interimBool: boolean;

  constructor(
    private router: Router,
    private translationService: TranslationService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private incidentsService: IncidentsService,
    private readonly commonService: CommonService,
    private incService: IncService
  ) {
    this.privilege = JSON.parse(
      localStorage.getItem(AppCacheKeys.USER_PRIVILEGES)
    );
    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
      id: 'interpage',
    };
    this.commonData = this.commonService.getCommonData();
  }

  ngOnInit(): void {
    this.dataSource1 = new MatTableDataSource();
    this.displayedColumns = [
      'id',
      //'subject',
      'reporterContact',
      'createdOn',
      'reportingVia',
      'status',
      'actions',
    ];

    this.canCreateIncident();
    this.lang = this.translationService.getSelectedLanguage();
    this.currentOrg = this.commonData?.currentOrgDetails;
    this.getInterimIncidents();
  }

  ngAfterViewInit() {
    this.dataSource1.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interimIncidents = changes?.filteredInterimIncidents?.currentValue;
  }

  canCreateIncident() {
    this.canReportIncident = this.privilege.includes('PRIV_CR_INC');
  }

  reportIncident(id) {
    this.router.navigate(['incidents/report-interim', id]);
  }

  getInterimIncidents() {
    if (this.incService.sortInterim != undefined) {
      this.incService.pageInterim = this.paginationInterim.currentPage - 1;
      this.loading = true;
      this.incidentsService
        .searchInterimIncidents(
          this.incService.pageInterim,
          this.incService.InterimForm,
          20,
          this.incService.sortInterim
        )
        .pipe(
          map((res) => {
            return res['result'];
          })
        )
        .subscribe((data) => {
          if (data) {
            //  this.paginationInterim.currentPage = data.number + 1;
            this.paginationInterim.totalItems = data.totalElements;
            this.interimIncidents = data.content;
            this.loading = false;
            this.cd.markForCheck();
          }
        });
    }
    this.interimBool = false; //updated
  }

  pageChanged(event) {
    this.paginationInterim.currentPage = event;
    this.interimBool = true;
    this.getInterimIncidents();
  }

  changeStatus(event, id) {
    event.stopPropagation();
    this.openStatusDialog(id);
  }

  openStatusDialog(id): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
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

    dialogRef.afterClosed().subscribe((result) => {
      this.loading = false;
      this.getInterimIncidents();
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

  viewInterimIncident(id) {
    this.router.navigate(['incidents/view-interim', id]);
  }

  viewncident(id) {
    this.router.navigate(['incidents/view', id]);
  }

  onSortChanged(event) {
    this.OnSortChanged.emit(event);
  }
}
