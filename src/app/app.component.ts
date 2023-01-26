import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  Inject,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterEvent,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { ILangFacade } from '@core/facades/lang.facade';
import { IThemeFacade } from '@core/facades/theme.facade';
import { ILinkService } from '@core/services/link.service';
import { IStorageService } from '@core/services/storage.service';

import { isEmpty } from 'lodash';

import { Subscription } from 'rxjs';

import { CommonService } from './_metronic/core/services/common.service';
import { PushNotificationsService } from './_metronic/core/services/push.notifications.service';
import { SplashScreenService } from './_metronic/partials/layout/splash-screen/splash-screen.service';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UpdateLastRouterUrl } from './modules/incidents/new-incidents-view/store/incidents-dashboard.actions';

export let appInjector;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  styleLoaded = false;
  stompClient: any;

  constructor(
    private langFacade: ILangFacade,
    private splashScreenService: SplashScreenService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _notificationService: PushNotificationsService,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private themeFacade: IThemeFacade,
    private linkService: ILinkService,
    private storageService: IStorageService,
    private store: Store
  ) {
    appInjector = injector;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        if (
          !(
            event.url.includes('incidents/edit') ||
            event.url.includes('incidents/inquiry')
          )
        ) {
          this.store.dispatch(UpdateLastRouterUrl({ url: event.url }));
        }
      });
  }

  ngOnInit() {
    const urlParams = new URLSearchParams(window?.location?.search);
    const error = urlParams.get('error_description');
    error && this.storageService.setItem('UaePassError', error);

    this.themeFacade.ngOnInit();
    let sub = this.themeFacade.vm$.subscribe((state) => {
      switch (state.ActiveTheme) {
        case 'light':
          this.linkService.RemoveTag('theme');
          this.linkService.AddTag({
            id: 'theme',
            rel: 'stylesheet',
            href: 'light.css',
          });
          break;
        case 'dark':
          this.linkService.RemoveTag('theme');
          this.linkService.AddTag({
            id: 'theme',
            rel: 'stylesheet',
            href: 'dark.css',
          });
          break;
        case 'adnoc-light':
          this.linkService.RemoveTag('theme');
          this.linkService.AddTag({
            id: 'theme',
            rel: 'stylesheet',
            href: 'adnoc-light.css',
          });
          break;
        case 'adnoc-dark':
          break;
        default:
          this.linkService.RemoveTag('theme');
          this.linkService.AddTag({
            id: 'theme',
            rel: 'stylesheet',
            href: 'light.css',
          });
          break;
      }
    });

    this.unsubscribe = [...this.unsubscribe, sub];

    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // is  Supported Browser   none Supported =[ IE , Safari]
        const isSupported = this.splashScreenService.checkBrowserVersion();

        // hide splash screen
        if (isSupported) {
          this.splashScreenService.hide();
        }

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
    // Subscribe to language change start, to reload the app when lang changed.
  }

  notify1(msg) {
    let data = [];
    data.push({
      title: 'Notification',
      alertContent: msg.msg,
      route: !isEmpty(msg.data) ? msg.data.actions[0].routing : '',
    });
    this._notificationService.generateNotification(data);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
