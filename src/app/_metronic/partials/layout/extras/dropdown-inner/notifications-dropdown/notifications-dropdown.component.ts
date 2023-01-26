import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NotifService } from '@core/api/services/notif.service';
import { Observable, Subject } from 'rxjs';
import { isEmpty } from 'lodash';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications-dropdown',
  templateUrl: './notifications-dropdown.component.html',
  styleUrls: ['./notifications-dropdown.component.scss'],
})
export class NotificationsDropdownComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('myDrop', { static: true }) myDrop: any;

  // Variables.
  notifCount$: Observable<any>;
  private display;
  private startTimestamp;
  private interval;
  destroy$: Subject<boolean> = new Subject();

  isOpened: boolean;
  status = false;
  notification$: Observable<any>;
  lang = 'en';
  private pageSize = 5;
  private pageIndex = 0;
  private lastPage = 1000;

  constructor(
    private translationService: TranslationService,
    private notificationService: NotifService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private notifService: NotifService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.notifCount$ = this.notificationService.unreadCount$;
    this.notification$ = this.notificationService.notification$;

    this.notifService.getNotifications().subscribe();

    // only if sidebar open
    this.notifService.sidebarVisibilityChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isOpened = value;
      });
  }
  @HostListener('document:visibilitychange', ['$event'])
  visibilityChange($event: Event) {
    if (document.visibilityState === 'visible') {
      this.notifService.getNotifications().subscribe();
    }
  }

  panelOpened() {
    this.notificationService.toggleSidebarVisibility();
  }

  async _nextPage() {
    const page = await this.notificationService
      .getNotifications(this.pageIndex, this.pageSize)
      .toPromise();
  }

  async getNext() {
    if (this.pageIndex <= this.lastPage) {
      await this._nextPage();
      this.pageIndex++;
    }
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
      this.myDrop.toggle();
      this.router.navigate([item.routing]);
    }
  }

  startTimer(page) {
    clearInterval(this.interval);
    const result = page.filter((itm) => itm.read == false);

    this.startTimestamp = moment().startOf('day');
    this.interval = setInterval(() => {
      this.startTimestamp.add(1, 'second');
      this.display = this.startTimestamp.format('HH:mm:ss');
      if (moment.duration(this.display).asSeconds() >= 3) {
        this.stopTimer(result);
      }
    }, 1000);
  }

  stopTimer(result: any[]) {
    result.forEach((item) => {
      this.markAsRead(item.id);
    });
    this.cdr.detectChanges();
    clearInterval(this.interval);
    this.display = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
