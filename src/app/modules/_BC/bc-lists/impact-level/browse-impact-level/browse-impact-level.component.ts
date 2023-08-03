import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { BrowseImpactLevelAction } from '../states/browse-impact-level.action';
import { ImpactLevelState } from '@core/states/bc/impact-level/impact-level.state';
import {
  BrowseImpactLevelState,
  BrowseImpactLevelStateModel,
} from '../states/browse-impact-level.state';
import { DATA } from '../../tabs.const';
import { ILangFacade } from '@core/facades/lang.facade';
import { BrowseBCState } from '../../../states/browse-bc.state';
import { BcImpactLevel, BcVersions } from 'src/app/api/models';
import { BCState } from '@core/states';
import { ActivatedRoute } from '@angular/router';

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

  public versionId: number;

  private destroy$ = new Subject();
  constructor(private store: Store,
    private route: ActivatedRoute,
    private lang: ILangFacade) {}

  ngOnInit(): void {
    this.route.queryParams
    .pipe(
      takeUntil(this.destroy$),
      map((params) => params['_version']),
      filter((p) => !!p)
    )
    .subscribe((version) => {
      this.versionId = version;
      this.loadPage();
    });

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
        versionId: this.versionId,

      })
    );
  }
}
