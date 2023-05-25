import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { BrowseImpactLevelAction } from '../states/browse-impact-level.action';
import { ImpactLevelState } from '@core/states/bc/impact-level/impact-level.state';
import { BcImpactLevel } from '../../../../api/models/bc-impact-level';
import {
  BrowseImpactLevelState,
  BrowseImpactLevelStateModel,
} from '../states/browse-impact-level.state';
import { DATA } from '../../tabs.const';
import { ILangFacade } from '@core/facades/lang.facade';
import { BrowseBusinessContinuityState } from '../../states/browse-business-continuity.state';

@Component({
  selector: 'app-browse-impact-level',
  templateUrl: './browse-impact-level.component.html',
  styleUrls: ['./browse-impact-level.component.scss'],
})
export class BrowseImpactLevelComponent implements OnInit, OnDestroy {
  @Select(ImpactLevelState.page)
  public page$: Observable<BcImpactLevel[]>;

  @Select(ImpactLevelState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpactLevelState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpactLevelState.state)
  public state$: Observable<BrowseImpactLevelStateModel>;

  private destroy$ = new Subject();
  constructor(private store: Store, private lang: ILangFacade) {}

  ngOnInit(): void {
    this.store
      .select(BrowseBusinessContinuityState.versionId)
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(200),
        tap((v) => this.loadPage())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactLevelAction.LoadImpactLevel({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }
}
