import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subject} from "rxjs";
import {NotifService} from "@core/api/services/notif.service";
import {isEmpty} from 'lodash';
import {Router} from "@angular/router";
import {TranslationService} from "../../../../modules/i18n/translation.service";
import {takeUntil} from "rxjs/operators";
import {IStorageService} from "@core/services/storage.service";

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit, OnDestroy {
  notification$: Observable<any>;
  lang = 'en';
  display;
  notifCount$: Observable<any>;
  private destroy$ = new Subject();
  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
    private notificationService: NotifService,
    private router: Router,
    private sotrageService: IStorageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.notifCount$ = this.notificationService.unreadCount$;
    this.notification$ = this.notificationService.unreadNotificationInPopup$;
    this.notificationService.popup$.pipe(takeUntil(this.destroy$)).subscribe(popup => {
      this.display = popup;
    });
    this.display = this.sotrageService.getItem('popup');
    this.sotrageService.removeItem('popup');
  }
  markAsRead(id, event?: Event) {
    this.notificationService.markAsRead(id);
    this.notifCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      if (count === 0) {
        this.display = false;
      }
    });
    event?.stopPropagation();
  }
  makeAllAsRead() {
    this.notification$.pipe(takeUntil(this.destroy$)).subscribe((notifications) => {
      const notificationIds = notifications.map((notification) => notification.id);
      console.log('Notification IDs:', notificationIds);
      this.notificationService.markImportantNotifiAllAsRead(notificationIds);
      this.display = false;
    });
  }

  redirect(item) {
    const element: HTMLElement = document.getElementById(
      'kt_quick_notifications_close'
    ) as HTMLElement;
    // console.log("canvas" , element)
    element.click();
    if (!isEmpty(item.routing)) {
      if (item.read == 'false' || item.read == false) {
        this.markAsRead(item.id);
      }
      window.open(item.routing, '_blank');
    }
  }
  close() {
    this.display = false;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
