import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {NotifService} from "@core/api/services/notif.service";
import {isEmpty} from 'lodash';
import {Router} from "@angular/router";
import {TranslationService} from "../../../../modules/i18n/translation.service";

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {
  notification$: Observable<any>;
  lang = 'en';
  display;
  notifCount$: Observable<any>;
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
    this.notificationService.getNotifications().subscribe();

    this.notificationService.popup$.subscribe(popup => {
      if (popup) {
        this.display = true;
      } else {
        this.display = false;
      }
    });


  }
  markAsRead(id) {
    this.notificationService.markAsRead(id);
  }
  makeAllAsRead() {
    this.notificationService.markAllAsRead();
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
      // this.myDrop.toggle();
      this.router.navigate([item.routing]);
    }
  }
  close() {
    this.display = false;
  }
}
