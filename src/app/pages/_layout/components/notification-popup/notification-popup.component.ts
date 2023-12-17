import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subject} from "rxjs";
import {NotifService} from "@core/api/services/notif.service";
import {isEmpty} from 'lodash';
import {Router} from "@angular/router";
import {TranslationService} from "../../../../modules/i18n/translation.service";
import {takeUntil} from "rxjs/operators";

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
  ) { }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.notifCount$ = this.notificationService.unreadCount$;
    this.notification$ = this.notificationService.unreadNotificationInPopup$;
    this.notificationService.getNotifications().pipe(takeUntil(this.destroy$)).subscribe();

    this.notificationService.popup$.pipe(takeUntil(this.destroy$)).subscribe(popup => {
      this.display = popup;
    });

  }
  markAsRead(id) {
    this.notificationService.markAsRead(id);
    this.notifCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      if (count === 0) {
        this.display = false;
      }});
  }
  makeAllAsRead() {
    this.notificationService.markAllAsRead();
    this.display = false;
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
