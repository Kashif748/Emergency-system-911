import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TABS } from './tabs.const';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BrowseBCAction } from '../states/browse-bc.action';
import { BCAction, BCState } from '@core/states';
import { BcVersions } from '../../../api/models/bc-versions';
import { VERSION_STATUSES } from '@core/states/bc/bc/bc.state';

@Component({
  selector: 'app-bc-lists',
  templateUrl: './bc-lists.component.html',
  styleUrls: ['./bc-lists.component.scss'],
})
export class BcListsComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  activeItem: MenuItem;
  sidebar = false;

  VERSION_STATUSES = VERSION_STATUSES;
  public position$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
  );
  public smallScreen: boolean;

  public selectedVersion: BcVersions;

  @Select(BCState.loading)
  public loading$: Observable<boolean>;

  @Select(BCState.blocking)
  public blocking$: Observable<boolean>;

  public versions$: Observable<BcVersions[]>;

  private destroy$ = new Subject();
  constructor(
    private router: Router,
    private langFacade: ILangFacade,
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.store
      .select(BCState.selectedVersion)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        tap((version) => (this.selectedVersion = version))
      )
      .subscribe();

    this.versions$ = this.store.select(BCState.versions).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((versions) =>
        versions.filter(
          (version) => version.status?.id !== VERSION_STATUSES.ARCHIVED
        )
      )
    );

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        map((c) => c.matches),
        tap((c) => {
          this.smallScreen = c;
          c ? (this.sidebar = false) : (this.sidebar = true);
        })
      )
      .subscribe();

    this.translate.currentLoader
      .getTranslation(this.translate.currentLang)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        tap((t) => {
          this.items = this.prepareMenu(TABS);
        })
      )
      .subscribe();
  }

  prepareMenu(items: MenuItem[]): MenuItem[] {
    return items.map((tab) => {
      if (tab?.separator) return tab;
      tab.command = (e) => this.setCurrentTab(e?.item);
      tab.label = this.translate.instant(tab.label);
      if (tab.items && tab.items.length > 0) {
        tab.items = this.prepareMenu(tab.items);
      }
      return tab;
    });
  }

  setCurrentTab(item: MenuItem) {
    this.activeItem = item;
    if (item.state) {
      this.router.navigate(
        ['bc/lists', ...item.state?.routerLink?.split('/')].filter((v) => !!v),
        {
          queryParamsHandling: 'merge',
        }
      );
    }
  }

  setValueGlobally(value: BcVersions) {
    this.store.dispatch(
      new BrowseBCAction.SetVersionId({
        versionId: value?.id,
      })
    );
  }

  toggleDialog() {
    return this.store.dispatch(new BrowseBCAction.ToggleDialog());
  }

  changeStatues(status: VERSION_STATUSES) {
    this.store.dispatch(
      new BrowseBCAction.ChangeStatus({
        versionId: this.selectedVersion?.id,
        statusId: status,
      })
    );
  }
}
