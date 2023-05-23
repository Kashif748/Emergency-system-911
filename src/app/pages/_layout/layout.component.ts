import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { isEmpty } from 'lodash';

import { PushNotificationsService } from 'src/app/_metronic/core/services/push.notifications.service';

import {
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

import { animations } from 'src/app/shared/animations/animation';
import { IAuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/services/common.service';
import { IStorageService } from 'src/app/core/services/storage.service';

import { LayoutInitService, LayoutService } from '../../_metronic/core';
import KTLayoutContent from '../../../assets/js/layout/base/content';
import { SysStatusService } from '@core/services/sys-status.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { SituationsState } from '@core/states/situations/situations.state';
import { SituationProjection } from 'src/app/api/models/situation-projection';
import { SituationsAction } from '@core/states/situations/situations.action';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [animations],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    private notificationsService: PushNotificationsService,
    private store: Store,
    private sysStatusService: SysStatusService,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initService.init();
  }
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;

  // Public variables
  isMobileView = true;

  selfLayout = 'default';
  asideSelfDisplay: true;
  contentClasses = '';
  headerMobileClasses = '';
  headerCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileAttributes = {};
  headerHTMLAttributes: any = {};
  isSideDisplay = true;
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  public headerMobileCss = 'header-mobile align-items-center';

  public headerCss = `header`;

  public wrapperCss = `d-flex flex-column flex-row-fluid wrapper h-100`;

  notify(msg) {
    const data = [];
    data.push({
      title: 'Notification',
      alertContent: msg.msg,
      route: !isEmpty(msg.data) ? msg.data.actions[0].routing : '',
    });
    this.notificationsService.generateNotification(data);
  }

  ngOnInit(): void {
    this.notificationsService.requestPermission();
    this.store.dispatch(new SituationsAction.GetActiveSituation());
    this.store
      .select(SituationsState.activeSituation)
      .pipe(
        filter((p) => !!p),
        takeUntil(this.destroy$),
        tap((situation) => {
          const cssClasses = ['golden', 'silver', 'bronze'];
          const activeClass = cssClasses[situation.themeType.id];
          this.headerMobileCss = `header-mobile align-items-center border-bottom-${activeClass}`;
          this.headerCss = `header border-bottom-${activeClass}`;
          this.wrapperCss = `d-flex flex-column flex-row-fluid wrapper h-100 bg-grd-${activeClass}`;
        })
      )
      .subscribe();

    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobileView = state.matches;
        if (!this.isMobileView) {
          this.drawer.close();
        }
        this.cdr.detectChanges();
      });

    // build view by layout config settings
    this.selfLayout = this.layout.getProp('self.layout');
    this.asideSelfDisplay = this.layout.getProp('aside.self.display');
    this.contentClasses = this.layout.getStringCSSClasses('content');
    this.headerMobileClasses = this.layout.getStringCSSClasses('header_mobile');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.asideHTMLAttributes = this.layout.getHTMLAttributes('aside');
    this.headerMobileAttributes =
      this.layout.getHTMLAttributes('header_mobile');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('header');
  }

  ngAfterViewInit(): void {
    if (this.ktAside) {
      for (const key in this.asideHTMLAttributes) {
        if (this.asideHTMLAttributes.hasOwnProperty(key)) {
          this.ktAside.nativeElement.attributes[key] =
            this.asideHTMLAttributes[key];
        }
      }
    }

    if (this.ktHeaderMobile) {
      for (const key in this.headerMobileAttributes) {
        if (this.headerMobileAttributes.hasOwnProperty(key)) {
          this.ktHeaderMobile.nativeElement.attributes[key] =
            this.headerMobileAttributes[key];
        }
      }
    }

    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
    // Init Content
    KTLayoutContent.init('kt_content');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  onSideMenuClosed(): void {
    this.isSideDisplay = false;
  }

  onOpenSidebar($event): void {
    this.isSideDisplay = !this.isSideDisplay;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
