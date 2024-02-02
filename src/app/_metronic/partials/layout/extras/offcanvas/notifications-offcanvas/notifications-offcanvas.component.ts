import {isEmpty} from 'lodash';
import {Router} from '@angular/router';
import {Direction} from '@angular/cdk/bidi';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import * as moment from 'moment';

import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {NotifService} from '@core/api/services/notif.service';

import {DmsService} from '@core/api/services/dms.service';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-notifications-offcanvas',
  templateUrl: './notifications-offcanvas.component.html',
  styleUrls: ['./notifications-offcanvas.component.scss'],
})
export class NotificationsOffcanvasComponent implements OnInit, OnDestroy {
  extrasNotificationsOffcanvasDirectionCSSClass: string;

  dir: Direction;

  private display;
  private startTimestamp;
  private interval;

  status = false;

  notification$: Observable<any>;
  asideVisible: boolean;
  isOpened: boolean;
  destroy$: Subject<boolean> = new Subject();

  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;

  public lang: string;
  constructor(
    private translationService: TranslationService,
    private dmsService: DmsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notifService: NotifService
  ) {
    this.asideVisible = this.notifService.isSidebarVisible;
    this.lang = this.translationService.getSelectedLanguage();
  }

  private pageSize = 15;
  private pageIndex = 0;
  private lastPage = 1000;

  ngOnInit(): void {
    this.dir =
      this.translationService.getSelectedLanguage() == 'en' ? 'ltr' : 'rtl';

    this.extrasNotificationsOffcanvasDirectionCSSClass = `offcanvas-${
      this.dir == 'ltr' ? 'right' : 'left'
    }`;

    this.notification$ = this.notifService.notification$;

    // only if sidebar open
    this.notifService.sidebarVisibilityChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isOpened = value;
        if (value) {
          this.pageIndex = 0;
          this.lastPage = 10000;

          // this.getNext();
          this.perfectScroll.directiveRef.scrollToTop(0, 1);
        }
      });
  }

  get isSidebarVisible(): boolean {
    return this.notifService.isSidebarVisible;
  }

  async _nextPage() {
    const page = await this.notifService
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
    this.notifService.markAsRead(id);
  }

  makeAllAsRead() {
    this.notifService.markAllAsRead();
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

  panelClosed() {
    this.notifService.toggleSidebarVisibility();
  }

  redirect(item) {
    const element: HTMLElement = document.getElementById(
      'kt_quick_notifications_close'
    ) as HTMLElement;
    element.click();
    if (!isEmpty(item.routing)) {
      if (item.read == 'false') {
        this.markAsRead(item.id);
      }
      this.router.navigateByUrl(item.routing);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
