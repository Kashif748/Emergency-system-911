import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from "rxjs/operators";
import {IpaginationResponce} from "../../../news/models/paginationResponce";
import {BehaviorSubject, Observable} from "rxjs";
import {Notification} from "./model/notification-management";
import {Reminder} from "../../../incidents/view-incidents/incident-reminder/model/Incident-Reminder";
import {DataSourceService} from "../../../services/data-source/data-source.service";
import {PushNotification} from "./model/push-notification";
import {WorklongTemplate} from "./model/worklog-template";
import {NotificationPlaceholder} from "./model/notification-placeholder";
let END_POINT: string = "";

@Injectable({
  providedIn: 'root'
})
export class NotificationManagementService extends DataSourceService {
  // variable
  notificationChanged$: Observable<Notification[]>;
  private notifications$: BehaviorSubject<Notification[]>;
  private notifications: Notification[];
  private totalElement$: BehaviorSubject<number>;
  totalElementChanged$: Observable<number>;


  totalElement: number = 0;
  notificationPlaceholderTotalElement: number = 0;
  pushTotalElement: number = 0;
  worklogTotalElement: number = 0;


  // notification- placeholder
  notificationPlaceholderChanged$: Observable<NotificationPlaceholder[]>;
  private notificationPlaceholder$: BehaviorSubject<NotificationPlaceholder[]>;
  private notificationPlaceholder: NotificationPlaceholder[];
  private notificationPlaceholderTotalElement$: BehaviorSubject<number>;
  notificationPlaceholderTotalElementChanged$: Observable<number>;

  private pushTotalElement$: BehaviorSubject<number>;
  private worklogTotalElement$: BehaviorSubject<number>;

  // push Notification

  pushNotificationChanged$: Observable<PushNotification[]>;
  private pushNotifications$: BehaviorSubject<PushNotification[]>;
  private pushNotifications: PushNotification[];
  pushNotificationTotalElement: number = 0;
  pushNotificationTotalElementChanged$: Observable<number>;
  private pushNotificationTotalElement$: BehaviorSubject<number>;

  //// worklog Template

  worklongTemplateChanged$: Observable<WorklongTemplate[]>;
  private worklongTemplates$: BehaviorSubject<WorklongTemplate[]>;
  private worklongTemplates: WorklongTemplate[];
  worklongTemplateTotalElementChanged$: number = 0;
  worklongTemplatesTotalElementChanged$: Observable<number>;
  private worklongTemplateTotalElement$: BehaviorSubject<number>;



  constructor(public http: HttpClient) {
    super(END_POINT);
    // sms
    this.notifications = null;
    this.notifications$ = new BehaviorSubject(this.notifications);
    this.notificationChanged$ = this.notifications$.asObservable();
    this.totalElement$ = new BehaviorSubject(this.totalElement);
    this.totalElementChanged$ = this.totalElement$.asObservable();

    // Notification-placeholder

    this.notificationPlaceholder = null;
    this.notificationPlaceholder$ = new BehaviorSubject(this.notificationPlaceholder);
    this.notificationPlaceholderChanged$ = this.notificationPlaceholder$.asObservable();
    this.notificationPlaceholderTotalElement$ = new BehaviorSubject(this.notificationPlaceholderTotalElement);
    this.notificationPlaceholderTotalElementChanged$ = this.notificationPlaceholderTotalElement$.asObservable();

    // Push Notification
    this.pushNotifications = null;
    this.pushNotifications$ = new BehaviorSubject(this.pushNotifications);
    this.pushNotificationChanged$ = this.pushNotifications$.asObservable();
    this.pushNotificationTotalElement$ = new BehaviorSubject(this.pushTotalElement);
    this.pushNotificationTotalElementChanged$ = this.pushNotificationTotalElement$.asObservable();

    // worklog Template

    this.worklongTemplates = null;
    this.worklongTemplates$ = new BehaviorSubject(this.worklongTemplates);
    this.worklongTemplateChanged$ = this.worklongTemplates$.asObservable();
    this.worklongTemplateTotalElement$ = new BehaviorSubject(this.worklogTotalElement);
    this.worklongTemplatesTotalElementChanged$ = this.worklongTemplateTotalElement$.asObservable();
  }
  getModules(){
    return this.http.get<any>(`${environment.apiUrl}/modules`, {}).pipe();
  }

/*  getNotificationPlaceHolders(id){
    return this.http.get<any>(`${environment.apiUrl}/notification-placeholder?moduleId=` + id, {}).pipe();
  }*/

  getNotificationPlaceHolders(id, pageNumber: number = 0, pageSize: number = 10){
    const httpParams = new HttpParams()
      .append("page", pageNumber.toString())
      .append("size", pageSize.toString())

    this.getAll<IpaginationResponce<NotificationPlaceholder[]>>(`notification-placeholder?moduleId=` + id, httpParams).
    pipe(map((items) => {
      if (items) {
        items.content = items.content.map((item) => new NotificationPlaceholder(item));
        return items;
      } else {
        return items;
      }
    })).subscribe((data) => {
      this.notificationPlaceholder = data.content;
      this.notificationPlaceholderTotalElement = data.totalElements;
      this.notificationPlaceholderTotalElement$.next(this.notificationPlaceholderTotalElement);
      this.placeholderNotify();
    });
  }

  getSmsTemplate(id, pageNumber: number = 0, pageSize: number = 10){
    const httpParams = new HttpParams()
      .append("page", pageNumber.toString())
      .append("size", pageSize.toString())

    this.getAll<IpaginationResponce<Notification[]>>(`events-config-sms/templates?moduleId=` + id, httpParams).
    pipe(map((items) => {
      if (items) {
        items.content = items.content.map((item) => new Notification(item));
        return items;
      } else {
        return items;
      }
    })).subscribe((data) => {
      this.notifications = data.content;
      this.totalElement = data.totalElements;
      this.totalElement$.next(this.totalElement);
      this.notify();
    });
  }

  getPushTemplate(id, pageNumber: number = 0, pageSize: number = 10){
    const httpParams = new HttpParams()
      .append("page", pageNumber.toString())
      .append("size", pageSize.toString());

    this.getAll<IpaginationResponce<PushNotification[]>>(`push-notificatios-body/templates?moduleId=` + id, httpParams).
    pipe(map((items) => {
      if (items) {
        items.content = items.content.map((item) => new PushNotification(item));
        return items;
      } else {
        return items;
      }
    })).subscribe((data) => {
      this.pushNotifications = data.content;
      this.pushTotalElement = data.totalElements;
      this.pushNotificationTotalElement$.next(this.pushTotalElement);
      this.pushNotify();
    });
  }

  getWorklogTemplate(id, pageNumber: number = 0, pageSize: number = 10){

    const httpParams = new HttpParams()
      .append("page", pageNumber.toString())
      .append("size", pageSize.toString());

    this.getAll<IpaginationResponce<WorklongTemplate[]>>(`system-events/templates?moduleId=` + id, httpParams).
    pipe(map((items) => {
      if (items) {
        items.content = items.content.map((item) => new WorklongTemplate(item));
        return items;
      } else {
        return items;
      }
    })).subscribe((data) => {
      this.worklongTemplates = data.content;
      this.worklogTotalElement = data.totalElements;
      this.worklongTemplateTotalElement$.next(this.worklogTotalElement);
      this.worklogNotify();
    });
  }

  notify() {
    console.log(this.notifications);
    this.notifications$.next(this.notifications);
  }

  placeholderNotify() {
    this.notificationPlaceholder$.next(this.notificationPlaceholder);
  }

  pushNotify() {
    console.log(this.notifications);
    this.pushNotifications$.next(this.pushNotifications);
  }

  worklogNotify() {
    console.log(this.notifications);
    this.worklongTemplates$.next(this.worklongTemplates);
  }

  editSmsNotification(id, template) {
    return new Promise((resolve, reject) => {
      this.put<any>({
        id: `${id}`,
        template: `${template}`
      }, null, 'events-config-sms')
        .pipe(map((item) => new Notification(item)))
        .subscribe(
          (data) => {
            this.notifications = this.notifications.map((item) =>
              item.id === id ? data : item
            );
            this.notify();

            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  editPushNotification(data) {
    return new Promise((resolve, reject) => {
      this.put<any>({
        id: data.id,
        body: data.body,
        enBody: data.enBody,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        isActive: true
      }, null, 'push-notificatios-body')
        .pipe(map((item) => new PushNotification(item)))
        .subscribe(
          (data) => {
            this.pushNotifications = this.pushNotifications.map((item) =>
              item.id === data.id ? data : item
            );
            this.pushNotify();

            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  editWorklog(data) {
    return new Promise((resolve, reject) => {
      this.put<any>({
        id: data.id,
        config: data.config,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr
      }, null, 'system-events')
        .pipe(map((item) => new WorklongTemplate(item)))
        .subscribe(
          (data) => {
            this.worklongTemplates = this.worklongTemplates.map((item) =>
              item.id === data.id ? data : item
            );
            this.worklogNotify();

            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
