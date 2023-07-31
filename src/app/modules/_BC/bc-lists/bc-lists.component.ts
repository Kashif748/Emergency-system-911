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
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TABS } from './tabs.const';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BrowseBCAction } from '../states/browse-bc.action';
import { BCAction, BCState } from '@core/states';
import { BcVersions } from '../../../api/models/bc-versions';
import { BrowseBCState } from '../states/browse-bc.state';

@Component({
  selector: 'app-bc-lists',
  templateUrl: './bc-lists.component.html',
  styleUrls: ['./bc-lists.component.scss'],
})
export class BcListsComponent implements OnInit, AfterViewInit, OnDestroy {
  items: MenuItem[] = [];
  activeItem: MenuItem;
  sidebar = false;

  public position$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
  );
  public smallScreen: boolean;

  public selectedVersion: BcVersions;

  @Select(BCState.loading)
  public loading$: Observable<boolean>;

  @Select(BCState.versions)
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
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.prepareMenu(TABS);
      this.cdr.detectChanges();
    }, 1000);
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

  setValueGlobally(version: BcVersions) {
    this.store.dispatch(
      new BrowseBCAction.GetVersion({ versionId: version?.id })
    );
  }

  toggleDialog() {
    return this.store.dispatch(new BrowseBCAction.ToggleDialog());
  }

  sendApprovel(status: number) {
    this.store
      .dispatch(
        new BrowseBCAction.GetStatus({
          versionId: this.selectedVersion?.id,
          statusId: status,
        })
      )
      .pipe(
        switchMap(() => this.store.select(BCState.status)),
        takeUntil(this.destroy$),
        take(1),
        tap((status) => {
          this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 }));
        })
      )
      .subscribe();
  }

  approved(status: number) {
    this.store
      .dispatch(
        new BrowseBCAction.GetStatus({
          versionId: this.selectedVersion?.id,
          statusId: status,
        })
      )
      .pipe(
        switchMap(() => this.store.select(BCState.status)),
        takeUntil(this.destroy$),
        take(1),
        tap((status) => {
          this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 }));
        })
      )
      .subscribe();
  }

  returnModification(status: number) {
    this.store
      .dispatch(
        new BrowseBCAction.GetStatus({
          versionId: this.selectedVersion?.id,
          statusId: status,
        })
      )
      .pipe(
        switchMap(() => this.store.select(BCState.status)),
        takeUntil(this.destroy$),
        take(1),
        tap((status) => {
          this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 }));
        })
      )
      .subscribe();
  }
}
