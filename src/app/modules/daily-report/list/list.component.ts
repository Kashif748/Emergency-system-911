import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {AdcdaService} from '@core/api/services/adcda.service';
import {DmsService} from '@core/api/services/dms.service';
import {CommonService} from '@core/services/common.service';
import {UrlHelperService} from '@core/services/url-helper.service';

import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';

import {TranslationService} from '../../i18n/translation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  // Variables
  displayedColumns: string[] = [
    'ReporterName',
    'ApprovedBy',
    'ApprovedOn',
    'CreatedOn',
    'Status',
    'Actions',
  ];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  lang: string;
  private reportStatuses: {
    id?: number;
    nameAr?: string;
    nameEn?: string;
    isActive?: boolean;
  }[];
  search: string;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 100;
  public currentUser: any;
  private sort: { active: string; direction: 'asc' | 'desc' } = {
    active: 'createdOn',
    direction: 'desc',
  };

  constructor(
    private translationService: TranslationService,
    private adcdaService: AdcdaService,
    private commonService: CommonService,
    private dmsService: DmsService,
    private urlHelper: UrlHelperService,
    private alertService: AlertsService,
    private cdr: ChangeDetectorRef
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }


  public async approve(report) {
    try {
      await this.adcdaService.approve(report).toPromise();
    } catch (error) {
      this.alertService.openFailureSnackBarWithMsg(
        this.lang == 'en'
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar
      );
    }
    await this.onPagination({pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.totalElements});
  }

  applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.onPagination({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalElements,
    });
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.commonService.getCommonData()?.currentUserDetails;
    await this.onPagination({
      pageSize: 10,
      pageIndex: 0,
      length: this.totalElements,
    });
  }

  sortChange(event) {
    this.sort = event;
    this.onPagination({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      length: 10,
    });
  }

  async onPagination(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.reportStatuses =
      this.commonService.getCommonData()?.operationalReportStatus;
    const response = await this.adcdaService
      .getAll(event.pageSize, event.pageIndex, this.search, this.sort)
      .toPromise();
    this.pageSize = response.result.size;
    this.totalElements = response.result.totalElements;
    this.dataSource.data = (response.result.content as any[]).map((r) => {
      r.status = this.reportStatuses?.find((s) => s.id == r.status.id);
      return {...r.createdBy, ...r} as any;
    });
    this.cdr.detectChanges();
  }

  async download(id) {
    const files = await this.dmsService
      .getDmsFiles(id, 26)
      .pipe(map((r) => r.result))
      .toPromise();

    if (files?.length > 0) {
      const file = files[files?.length - 1];
      this.urlHelper.download(file);
    } else {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get('ERROR_MSG.FILE_HAS_NO_CONTENT')
      );
    }
  }

}
