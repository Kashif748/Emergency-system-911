import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { auditTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import {
  BrowseImpactAnalysisState,
  BrowseImpactAnalysisStateModel,
} from '../../states/browse-impact-analysis.state';
import { ILangFacade } from '@core/facades/lang.facade';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import {
  BcActivityAnalysis,
  BcAnalysisStatus,
  BcCycles,
  BcOrgHierarchy,
  Bcrto,
} from 'src/app/api/models';
import {BrowseImpactAnalysisAction} from '../../states/browse-impact-analysis.action';
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
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';
import { TreeHelper } from '@core/helpers/tree.helper';
import {BrowseReourceAnalysisStateModel, BrowseResourceAnalysisState} from "../../states/browse-resource-analysis.state";
import {BcResources} from "../../../../../api/models/bc-resources";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseResourceAnalysisAction} from "../../states/browse-resource-analysis.action";

@Component({
  selector: 'app-browse-impact-analysis',
  templateUrl: './browse-impact-analysis.component.html',
  styleUrls: ['./browse-impact-analysis.component.scss'],
})
export class BrowseImpactAnalysisComponent implements OnInit, OnDestroy {
  // resource page

  public resourcePage$: Observable<BcResources[]>;

  @Select(ResourceAnalysisState.totalRecords)
  public resourceTotalRecords$: Observable<number>;

  @Select(ResourceAnalysisState.loading)
  public resourceLoading$: Observable<boolean>;

  @Select(BrowseResourceAnalysisState.state)
  public browseResourceState$: Observable<BrowseReourceAnalysisStateModel>;


  //   analysis page
  // filters
  public orgHir: TreeNode[] = [];

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();

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
      code: 'activityName.id',
    },
    {
      name: 'ACTIVITY_FEQ',
      code: 'activityFrequence.id',
    },
    { name: 'ANALYSIS_CRCLE', code: 'cycle.id' },
    { name: 'RTO', code: 'rto' },
    { name: 'PRIORITY_LEVEL', code: 'priorityLevel' },
    { name: 'STATUS', code: 'status.id' },
  ];

  public columns = [
    { name: 'ACTIVITY_NAME', code: 'activityName', disabled: true},
    {
      name: 'ACTIVITY_FEQ',
      code: 'activityFrequency',
    },
    { name: 'ANALYSIS_CRCLE', code: 'analysisCycle' },
    { name: 'RTO', code: 'rto' },
    { name: 'PRIORITY_LEVEL', code: 'priorityLevel' },
    { name: 'STATUS', code: 'status' },
  ];

  public resourceSortableColumns = [
    {
      name: 'RESOURCES.DIVISION',
      code: 'orgHierarchy.id',
    },
    {
      name: 'RESOURCES.CYCLE',
      code: 'cycle.id',
    },
    { name: 'RESOURCES.ONSITE_STAFF', code: 'staffOnSite' },
    { name: 'RESOURCES.OFFSITE_STAFF', code: 'staffRemotely' },
    { name: 'RESOURCES.STATUS', code: 'status' },
  ];

  public resoureColumns = [
    {
      name: 'RESOURCES.DIVISION',
      code: 'orgHierarchy',
      disabled: true,
    },
    {
      name: 'RESOURCES.CYCLE',
      code: 'cycle',
    },
    { name: 'RESOURCES.ONSITE_STAFF', code: 'staffOnSite' },
    { name: 'RESOURCES.OFFSITE_STAFF', code: 'staffRemotely' },
    { name: 'RESOURCES.STATUS', code: 'status' },
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
    private treeHelper: TreeHelper,
    private router: Router
  ) {
    this.lang.vm$
      .pipe
      ()
      .subscribe((res) => {
        if (res['key'] == 'ar') {
          this.sortableColumns[0].code = 'activity.nameAr';
          this.sortableColumns[1].code = 'activity.activityFrequence.nameAr';
          this.sortableColumns[2].code = 'cycle.nameAr';
        } else {
          this.sortableColumns[0].code = 'activity.nameEn';
          this.sortableColumns[1].code = 'activity.activityFrequence.nameEn';
          this.sortableColumns[2].code = 'cycle.nameEn';
        }
      });
  }

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
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
      new ActivityFrquencyAction.LoadPage({ page: 0, size: 100 }),
      new ActivityPrioritySeqAction.LoadPage({
        page: 0,
        size: 100,
        versionId: 0,
      }),
      new RtoAction.LoadPage({
        page: 0,
        size: 100,
        versionId: 0,
      }),
    ]);
    this.store
      .select(OrgDetailState.orgHirSearch)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        map((data) => this.setTree(data))
      )
      .subscribe();

    this.auditLoadOrgPage$
      .pipe(takeUntil(this.destroy$), auditTime(2000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new OrgDetailAction.GetOrgHierarchySearch({
            page: 0,
            size: 100,
            name: search,
          })
        );
      });

    // resourec table state

    this.resourcePage$ = this.store
      .select(ResourceAnalysisState.page)
      .pipe(
        filter((p) => !!p),

        map((page) =>
          page?.map((u) => {
            return {
              ...u,
              actions: [
                {
                  label: this.translate.instant('START_RESOURC_ANALYSIS'),
                  icon: 'pi pi-pencil',
                  command: () => {
                    this.startResourceAnalysis(u);
                  },
                },
              ],
            };
          })
        )
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
  public setTree(_searchResponses: BcOrgHierarchyProjection[]) {
    if (_searchResponses.length == 0) {
      if (this.orgHir.length == 0) {
        this.orgHir = [];
      }
      return;
    }
    let branch = this.treeHelper.orgHir2TreeNode(_searchResponses);
    if (branch?.length > 0) {
      branch.forEach(
        (item) => (item.label = this.translateObj.transform(item.data))
      );
    }

    const parentId = _searchResponses[0].parentId;
    const parentNode = this.treeHelper.findOrgHirById(this.orgHir, parentId);
    // console.log(parentId ,parentNode);

    if (parentNode && parentId) {
      parentNode.children = [...branch, ...parentNode.children];
    } else {
      this.orgHir = branch;
    }
  }
  filterOrgHir(event) {
    this.auditLoadOrgPage$.next(event.filter);
  }
  nodeExpand(node: TreeNode) {
    if (node.children.length === 0) {
      this.store.dispatch(
        new OrgDetailAction.GetOrgHierarchySearch({
          page: 0,
          size: 100,
          parentId: parseInt(node?.key),
        })
      );
    }
  }

  search() {
    this.store.dispatch(new BrowseImpactAnalysisAction.LoadPage());
    this.store.dispatch(new BrowseResourceAnalysisAction.LoadPage());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store.dispatch(new BrowseImpactAnalysisAction.UpdateFilter(filter));
    this.store.dispatch(new BrowseResourceAnalysisAction.UpdateFilter(filter));
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
  resourceChangeColumns(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.ChangeColumns({ columns: event.value })
    );
  }
  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new BrowseUsersAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.Sort({ field: event.value })
    );
  }

  resourceSort(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.Sort({ field: event.value })
    );
  }

  resourceOrder(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.Sort({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.Sort({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  startResourceAnalysis(resource: BcResources) {
    this.router.navigate(['bc/resources'], {
      queryParams: {
        _cycle: resource?.cycle?.id,
        _resource: resource?.id,
      },
    });
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
  public loadResourcePage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.LoadPage({
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
