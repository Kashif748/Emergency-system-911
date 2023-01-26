import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpaginationResponce } from 'src/app/modules/news/models/paginationResponce';
import { DataSourceService } from 'src/app/modules/services/data-source/data-source.service';
import { NOTIFICATION_TABLE_TYPES } from './notifications-table.types';

@Injectable({
  providedIn: 'root',
})
export class NotificationsTableService extends DataSourceService {
  notificationTransactionChange$: Observable<any[]>;
  private notificationTransaction$: BehaviorSubject<any[]>;
  private notificationTransaction = [];

  incidnetsNotificationsChanged$: Observable<any[]>;
  private incidnetsNotifications$: BehaviorSubject<any[]>;
  private incidnetsNotifications = [];

  totalElement: number = 0;
  totalElementChanged$: Observable<number>;
  private totalElement$: BehaviorSubject<number>;
  tableTypes = NOTIFICATION_TABLE_TYPES;

  constructor() {
    super('');
    // transcations
    this.notificationTransaction$ = new BehaviorSubject(
      this.notificationTransaction
    );
    this.notificationTransactionChange$ =
      this.notificationTransaction$.asObservable();

    // notifications
    this.incidnetsNotifications$ = new BehaviorSubject(
      this.incidnetsNotifications
    );
    this.incidnetsNotificationsChanged$ =
      this.incidnetsNotifications$.asObservable();

    this.totalElement$ = new BehaviorSubject(this.totalElement);
    this.totalElementChanged$ = this.totalElement$.asObservable();
  }

  getNotificationTransaction(moduleId, recordId): Observable<any> {
    let httpParams = new HttpParams()
      .append('moduleId', moduleId.toString())
      .append('recordId', recordId.toString());

    return this.getAll<IpaginationResponce<any[]>>(
      'notification-transactions',
      httpParams
    ).pipe(
      map((items) => {
        if (items?.content) {
          this.notificationTransaction = items.content.map((item) => item.id);
          this.notificationTransaction$.next(this.notificationTransaction);
          return this.notificationTransaction;
        }
        return [];
      })
    );
  }

  getNotifications(
    tableType: NOTIFICATION_TABLE_TYPES = NOTIFICATION_TABLE_TYPES.SMS,
    pageNumber: number = 0,
    pageSize: number = 10,
    sort?
  ) {
    let endPoint = 'notification/transactions';
    let defaultSort = 'id,asc';
    if (tableType === NOTIFICATION_TABLE_TYPES.PUSH) {
      endPoint = 'inapp-notif/transactions';
    }
    if (tableType === NOTIFICATION_TABLE_TYPES.EMAIL) {
      endPoint = 'mail/transactions';
    }
    let httpParams = new HttpParams()
      .append('page', pageNumber.toString())
      .append('size', pageSize.toString())
      .append('sort', sort ? sort.active + ',' + sort.direction : defaultSort)
      .append('notificationTransId', this.notificationTransaction.join(','));

    this.totalElement = 0;
    this.getAll<IpaginationResponce<any[]>>(endPoint, httpParams)
      .pipe(
        map((res) => {
          this.totalElement += res.totalElements;
          this.totalElement$.next(this.totalElement);
          return res.content;
        })
      )
      .subscribe((res) => {
        this.incidnetsNotifications = res;
        this.incidnetsNotifications$.next(this.incidnetsNotifications);
      });
  }
}
