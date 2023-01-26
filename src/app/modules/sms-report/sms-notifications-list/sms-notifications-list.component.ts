import { SmsNotificationModalComponent } from './../sms-notification-modal/sms-notification-modal.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SmsModalComponent } from '../../call-duty/call-duty/sms-modal/sms-modal.component';
import { TranslationService } from '../../i18n/translation.service';
import { SmsReportService } from '../sms-report/sms-report.service';
import { MatDialogRef } from '@angular/material/dialog';

enum AlertsStates {
  Hide,
  HasError,
  NoError,
}
@Component({
  selector: 'app-sms-notifications-list',
  templateUrl: './sms-notifications-list.component.html',
  styleUrls: ['./sms-notifications-list.component.scss'],
})
export class SmsNotificationsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  alertState: AlertsStates = AlertsStates.Hide;
  alertsStates = AlertsStates;
  alertMsg = 'ERROR_HAS_HAPPEND';
  sms = new FormControl('0552619198', [Validators.required]);

  loading = true;
  dataSource = new MatTableDataSource<any>([]);
  categories: any[] = [];
  lang = 'en';
  DialogRef: MatDialogRef<any>;
  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'paging',
  };

  displayedColumns: string[] = [
    'mobile number',
    'body',
    'created on',
    'status',
  ];

  constructor(
    private translationService: TranslationService,
    private smsReportService: SmsReportService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SmsModalComponent>
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    let commonData = JSON.parse(localStorage.getItem('commonData'));
    if (commonData) {
      this.categories = commonData['assetsCategory'];
    }

    this.getTableData();
  }
  getTableData() {
    this.loading = true;
    this.smsReportService.getSmsReport().subscribe((data) => {
      this.loading = false;
      this.dataSource = new MatTableDataSource<any>(data.content);
    });
  }

  pageChanged(event) {
    this.paginationConfig.currentPage = event;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editMob(r) {
    const dialogRef = this.dialog.open(SmsNotificationModalComponent, {
      data: { row: r },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTableData();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
