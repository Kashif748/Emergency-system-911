import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ActivityFrquencyAction,
  ActivityFrquencyState,
  ActivityPrioritySeqAction,
  ActivityPrioritySeqState,
  OrgDetailAction, OrgDetailState,
  RtoAction,
  RtoState
} from "@core/states";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";
import {Select, Store} from "@ngxs/store";
import {BcActivityAnalysis, BcAnalysisStatus, BcCycles, Bcrto} from "../../../../../api/models";
import {TranslateService} from "@ngx-translate/core";
import {LazyLoadEvent, TreeNode} from "primeng/api";
import {Observable, Subject} from "rxjs";
import {TreeHelper} from "@core/helpers/tree.helper";
import {BcOrgHierarchyProjection} from "../../../../../api/models/bc-org-hierarchy-projection";
import {auditTime, filter, map, takeUntil} from "rxjs/operators";
import {ImpactAnalysisState} from "@core/states/impact-analysis/impact-analysis.state";
import {ILangFacade} from "@core/facades/lang.facade";
import {BrowseImpactAnalysisAction} from "../../states/browse-impact-analysis.action";
import {BrowseImpactAnalysisState, BrowseImpactAnalysisStateModel} from "../../states/browse-impact-analysis.state";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {BcResources} from "../../../../../api/models/bc-resources";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseReourceAnalysisStateModel, BrowseResourceAnalysisState} from "../../states/browse-resource-analysis.state";
import {BrowseResourceAnalysisAction} from "../../states/browse-resource-analysis.action";

@Component({
  selector: 'app-browse-resource-analysis',
  templateUrl: './browse-resource-analysis.component.html',
  styleUrls: ['./browse-resource-analysis.component.scss']
})
export class BrowseResourceAnalysisComponent implements OnInit, OnDestroy {
// filters
  public orgHir: TreeNode[] = [];
  public orgHireracy: TreeNode[] = [];

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  @Select(ImpactAnalysisState.activityStatuses)
  public activityStatuses$: Observable<BcAnalysisStatus[]>;

  private auditLoadOrgPage$ = new Subject<string>();
  // table
  public page$: Observable<BcResources[]>;

  @Select(ResourceAnalysisState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ResourceAnalysisState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseResourceAnalysisState.state)
  public state$: Observable<BrowseReourceAnalysisStateModel>;

  @Select(BrowseResourceAnalysisState.hasFilters)
  public hasFilters$: Observable<boolean>;

  private destroy$ = new Subject();

  public sortableColumns = [
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

  public columns = [
    {
      name: 'RESOURCES.DIVISION',
      code: 'orgHierarchy',
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
      new BrowseImpactAnalysisAction.LoadCycles({ page: 0, size: 100 }),
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),

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

    // Table State
    this.page$ = this.store
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
        this.orgHireracy = [];
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
    this.orgHireracy = JSON.parse(JSON.stringify(this.orgHir));
    this.orgHireracy.forEach((node) => {
      this.markDisabledNodes(node);
    });
  }
  markDisabledNodes(node: TreeNode) {
    if (node.children) {
      node.expanded = true;
      node.children.forEach((child) => {
        this.markDisabledNodes(child);
      });
    }
    node.selectable = node?.data?.bcOrgHirType?.id === 2;
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
    this.store.dispatch(new BrowseResourceAnalysisAction.LoadPage());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store.dispatch(new BrowseResourceAnalysisAction.UpdateFilter(filter));
  }
  clear() {
    this.store.dispatch([
      new BrowseResourceAnalysisAction.UpdateFilter({ clear: true }),
      new BrowseResourceAnalysisAction.LoadPage(),
    ]);
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.ChangeColumns({ columns: event.value })
    );
  }
  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new BrowseUsersAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.Sort({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.Sort({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  startAnalysis(resource: BcResources) {
    this.router.navigate(['bc/resources'], {
      queryParams: {
        _cycle: resource?.cycle?.id,
        _resource: resource?.id,
      },
    });
  }
  public loadPage(event: LazyLoadEvent) {
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
