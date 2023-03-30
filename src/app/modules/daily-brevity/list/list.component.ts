import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { DailySummary } from 'src/app/core/api/models/daily-summary.models';
import { DailyReportService } from '@core/api/services/daily-report.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { TranslationService } from '../../i18n/translation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'ReporterName',
    'CreatedOn',
    'Status',
    'Actions',
  ];
  private subscriptions: Subscription[] = [];

  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  minDate: Date;
  maxDate: Date;
  lang;
  form: FormGroup;
  loading: boolean;
  constructor(
    private translationService: TranslationService,
    private dailyReportService: DailyReportService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  clearSearch() {
    this.form.reset({
      search: [''],
      fromDate: [''],
      toDate: [''],
    });
    this.onPagination({ pageSize: 10, pageIndex: 0, length: 10 });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      search: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.form.value.fromDate != '') {
      this.form.value.fromDate = DateTimeUtil.format(new Date(
        this.form.value.fromDate
      ), DateTimeUtil.DATE_FORMAT);
    }

    if (this.form.value.toDate != '') {
      this.form.value.toDate = DateTimeUtil.format(new Date(
        this.form.value.toDate
      ), DateTimeUtil.DATE_FORMAT);
    }
    this.onPagination({ pageSize: 10, pageIndex: 0, length: 10 });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private reportStatuses: {
    id?: number;
    nameAr?: string;
    nameEn?: string;
    isActive?: boolean;
  }[];

  pageSize = 10;
  totalElements = 100;

  ngOnInit(): void {
    this.buildForm();
    this.onPagination({ pageSize: 10, pageIndex: 0, length: 10 });
  }

  onPagination(event: PageEvent) {
    let commonData = JSON.parse(localStorage.getItem('commonData'));

    this.reportStatuses = commonData['dailySummaryReportStatus'];
    console.log(this.form.value.search);
    let sub = this.dailyReportService
      .getAll(
        event.pageSize,
        event.pageIndex,
        this.form.value.fromDate,
        this.form.value.toDate,
        null,
        this.form.value.search
      )
      .subscribe((response) => {
        //console.log(response);
        this.pageSize = response.result.size;
        this.totalElements = response.result.totalElements;
        this.dataSource.data = (<DailySummary[]>response.result.content).map(
          (r) => {
            r.status = this.reportStatuses.find((s) => s.id == r.status.id);
            return { ...r.createdBy, ...r } as any;
          }
        );
      });
    this.subscriptions = [...this.subscriptions, sub];
  }

  review(id) {
    let sub = this.dailyReportService.review(id).subscribe(
      (response) => {
        const newBlob = new Blob([response], { type: 'application/pdf' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        const downloadURL = URL.createObjectURL(newBlob);
        window.open(downloadURL);
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }
}
