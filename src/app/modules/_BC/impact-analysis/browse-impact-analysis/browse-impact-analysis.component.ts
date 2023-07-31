import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import {
  BrowseImpactAnalysisState,
  BrowseImpactAnalysisStateModel,
} from '../states/browse-impact-analysis.state';
import { ILangFacade } from '@core/facades/lang.facade';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import {
  BcActivityAnalysis,
  BcAnalysisStatus,
  BcCycles,
  BcOrgHierarchy,
  Bcrto,
} from 'src/app/api/models';
import { BrowseImpactAnalysisAction } from '../states/browse-impact-analysis.action';
import {
  ActivityFrquencyAction,
  ActivityFrquencyState,
  ActivityPrioritySeqAction,
  ActivityPrioritySeqState,
  OrgDetailAction,
  OrgDetailState,
  RtoAction,
  RtoState,
} from '@core/states';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-impact-analysis',
  templateUrl: './browse-impact-analysis.component.html',
  styleUrls: ['./browse-impact-analysis.component.scss'],
})
export class BrowseImpactAnalysisComponent implements OnInit, OnDestroy {
  // filters
  public orgHir$: Observable<TreeNode[]>;

  @Select(ActivityPrioritySeqState.page)
  public prioritySeq$: Observable<boolean>;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  @Select(ActivityFrquencyState.page)
  public activityFrquency$: Observable<boolean>;

  @Select(RtoState.page)
  public rtosPage$: Observable<Bcrto[]>;

  @Select(ImpactAnalysisState.activityStatuses)
  public activityStatuses$: Observable<BcAnalysisStatus[]>;

  // table
  public page$: Observable<BcActivityAnalysis[]>;

  @Select(ImpactAnalysisState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpactAnalysisState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpactAnalysisState.state)
  public state$: Observable<BrowseImpactAnalysisStateModel>;

  @Select(BrowseImpactAnalysisState.hasFilters)
  public hasFilters$: Observable<boolean>;

  private destroy$ = new Subject();

  public sortableColumns = [
    {
      name: 'ACTIVITY_NAME',
      code: 'activityName',
    },
    {
      name: 'ACTIVITY_FEQ',
      code: 'activityFrequency',
    },
    { name: 'ANALYSIS_CRCLE', code: 'analysisCycle' },
    { name: 'RTO', code: 'rto' },
    { name: 'PRIORITY_LEVEL', code: 'priorityLevel' },
    { name: 'STATUS', code: 'status' },
  ];

  public columns = [
    { name: 'ACTIVITY_NAME', code: 'activityName' },
    {
      name: 'ACTIVITY_FEQ',
      code: 'activityFrequency',
    },
    { name: 'ANALYSIS_CRCLE', code: 'analysisCycle' },
    { name: 'RTO', code: 'rto' },
    { name: 'PRIORITY_LEVEL', code: 'priorityLevel' },
    { name: 'STATUS', code: 'status' },
  ];

  /**
   *
   */
  constructor(
    private store: Store,
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private translateObj: TranslateObjPipe,
    private lang: ILangFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
        this.changeView('CARDS');
      });

    // All filters states
    this.store.dispatch([
      new BrowseImpactAnalysisAction.LoadActivitiesStatuses(),
      new BrowseImpactAnalysisAction.LoadCycles({ page: 0, size: 100 }),
      new OrgDetailAction.GetOrgHierarchy({ page: 0, size: 100 }),
      new ActivityFrquencyAction.LoadPage({ page: 0, size: 100 }),
      new ActivityPrioritySeqAction.LoadPage({
        page: 0,
        size: 100,
      }),
      new RtoAction.LoadPage({
        page: 0,
        size: 100,
      }),
    ]);

    this.orgHir$ = this.store.select(OrgDetailState.orgHir).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => this.setTree(data)),
      tap(console.log)
    );

    // Table State
    this.page$ = this.store
      .select(ImpactAnalysisState.activityAnalysisPage)
      .pipe(
        filter((p) => !!p),

        map((page) =>
          page?.map((u) => {
            return {
              ...u,
              actions: [
                {
                  label: this.translate.instant('START_ANALYSIS'),
                  icon: 'pi pi-pencil',
                  command: () => {
                    this.startAnalysis(u);
                  },
                },
              ],
            };
          })
        )
      );
  }

  public setTree(_searchResponses: BcOrgHierarchy[]): TreeNode[] {
    const nest = (items, id = null, link = 'parentId') =>
      items
        .filter((item) => item[link] === id)
        .map((item: BcOrgHierarchy) => {
          let node: TreeNode;
          node = {
            key: item.id.toString(),
            data: item,
            label: this.translateObj.transform(item),
            children: nest(items, item.id),
          };
          return node;
        });
    return nest(_searchResponses);
  }

  search() {
    this.store.dispatch(new BrowseImpactAnalysisAction.LoadPage());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store.dispatch(new BrowseImpactAnalysisAction.UpdateFilter(filter));
  }
  clear() {
    this.store.dispatch([
      new BrowseImpactAnalysisAction.UpdateFilter({ clear: true }),
      new BrowseImpactAnalysisAction.LoadPage(),
    ]);
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ChangeColumns({ columns: event.value })
    );
  }
  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new BrowseUsersAction.ChangeView({ view }));
  }

  sort(event) {
    /*  this.store.dispatch(
      new BrowseUsersAction.SortUsers({ field: event.value })
    );*/
  }

  order(event) {
    /*this.store.dispatch(
      new BrowseUsersAction.SortUsers({ order: event.checked ? 'desc' : 'asc' })
    );*/
  }

  startAnalysis(activity: BcActivityAnalysis) {
    this.router.navigate(['bc/activity-analysis'], {
      queryParams: {
        _cycle: activity?.cycle?.id,
        _activity: activity?.id,
      },
    });
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.LoadPage({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
