import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { Observable, Subject } from 'rxjs';
import { map, skip, tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { NotificationsDialogComponent } from './notifications-dialog/notifications-dialog.component';
import { NotificationsTableService } from './notifications-table.service';
import {
  NOTIFICATION_TABLE_TYPES,
  NOTIFICATION_STATUS,
  NOTIFICATION_TABLE_COLUMNS,
} from './notifications-table.types';
import {ConfirmDialogComponent} from "../../../modules/confirm-dialog/confirm-dialog.component";
import {AlertsService} from "../../../_metronic/core/services/alerts.service";

@Component({
  selector: 'app-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.scss'],
})
export class NotificationsTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input() recordId: number;
  @Input() moduleId: number;

  public modelRef: MatDialogRef<any>

  // Variables
  tableTypes = NOTIFICATION_TABLE_TYPES;
  notiStatus = NOTIFICATION_STATUS;
  activeTable = new FormControl(NOTIFICATION_TABLE_TYPES.SMS);
  displayedColumns = [];
  lang = 'en';
  transaction = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  totalElement$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();
  loading = true;
  currentPage = 1;
  public dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));

  constructor(
    public matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private incidentsNotificationsService: NotificationsTableService,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService,
    private langFacade: ILangFacade,
    private dialog: MatDialog,
    private alertService: AlertsService,
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.incidentsNotificationsService
      .getNotificationTransaction(this.moduleId, this.recordId)
      .subscribe((res) => {
        this.transaction = res;
        if (res?.length == 0) {
          this.loading = false;
          this.cdr.detectChanges();
        } else {
          this.incidentsNotificationsService.getNotifications(
            this.activeTable.value
          );
        }
      });
    this.totalElement$ =
      this.incidentsNotificationsService.totalElementChanged$;
    this.incidentsNotificationsService.incidnetsNotificationsChanged$
      .pipe(
        skip(1), //initail value empty array
        tap((incidnetsNotifications) => {
          switch (this.activeTable.value) {
            case this.tableTypes.EMAIL:
              this.displayedColumns = NOTIFICATION_TABLE_COLUMNS.EMAILS_TABLE;
              break;
            case this.tableTypes.SMS:
              this.displayedColumns = NOTIFICATION_TABLE_COLUMNS.SMS_TABLE;
              break;
            case this.tableTypes.PUSH:
              this.displayedColumns = NOTIFICATION_TABLE_COLUMNS.PUSH_TABLE;
              break;
            default:
              break;
          }
          this.dataSource.data = incidnetsNotifications.map((noti) => {
            // if (noti?.status) {
            //   noti.status = noti.status.replaceAll('_', ' ').toLowerCase();
            // }
            if (this.activeTable.value === this.tableTypes.EMAIL) {
              noti['to'] = noti?.emailNotificationReceivers?.filter(
                (reciver) => reciver?.emailNotificationRcvrsType.id === 1
              );
              noti['cc'] = noti?.emailNotificationReceivers?.filter(
                (reciver) => reciver?.emailNotificationRcvrsType.id === 2
              );
            }
            if (this.activeTable.value === this.tableTypes.PUSH) {
              noti['createdOn'] = noti?.createdAt;
              noti['status'] = noti?.isRead ? 'READ' : 'NOT_READ';
              const body = JSON.parse(noti?.message);

              const userCreatedBy = noti?.userCreatedBy;
              if (this.lang == 'en') {
                noti['body'] = body?.en?.body;
                noti['title'] = body?.en?.title;
                const username = `${userCreatedBy?.firstNameEn} ${userCreatedBy?.lastNameEn}`;
                noti['username'] = username?.replace('null', '');
              } else {
                noti['body'] = body?.ar?.body;
                noti['title'] = body?.ar?.title;
                const username = `${userCreatedBy?.firstNameAr} ${userCreatedBy?.lastNameAr}`;
                noti['username'] = username?.replace('null', '');
              }
            }

            return noti;
          });
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe();

    this.activeTable.valueChanges
      .pipe(tap(() => (this.loading = true)))
      .subscribe((tableType) => {
        this.dataSource.data = [];
        this.incidentsNotificationsService.getNotifications(tableType);
      });
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
    this.currentPage = event.pageIndex;
    this.loading = true;
    this.incidentsNotificationsService.getNotifications(
      this.activeTable.value,
      event.pageIndex,
      event.pageSize
    );
  }
  sortData(event) {
    this.loading = true;
    if (
      event?.active === 'createdOn' &&
      this.activeTable.value === this.tableTypes.PUSH
    ) {
      event.active = 'createdAt';
    }
    this.incidentsNotificationsService.getNotifications(
      this.activeTable.value,
      0,
      10,
      event
    );
  }

  showEmailBody(emailBody): void {
    this.matDialog.open(NotificationsDialogComponent, {
      data: {
        emailBody: emailBody,
        mode: 'emailBody',
      },
      panelClass: 'email-modal',
      maxWidth: '850px',
    });
  }
  showAllRecivers(recivers): void {
    this.matDialog.open(NotificationsDialogComponent, {
      data: {
        recivers: recivers,
        mode: 'recivers',
      },
      panelClass: 'modal',
    });
  }

  reSend(id: number) {
    const message = 'GENERAL.RESENT_CONFIRM';
    const actionName = 'GENERAL.SEND_CONFIRM';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      confirmMessage: message,
      action: actionName,
    };

    this.dialog
      .open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.incidentsNotificationsService
            .resendSMS(id)
            .subscribe(
              (response) => {
                this.incidentsNotificationsService.getNotifications(
                  this.activeTable.value
                );
                this.alertService.openSuccessSnackBar();
              },
              (err) => {
                this.alertService.openFailureSnackBar();
              }
            );
        }
      });
  }

  /*deleteIncident() {
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
  }*/
}
