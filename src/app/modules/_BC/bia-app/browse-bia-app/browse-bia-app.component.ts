import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {LazyLoadEvent, MenuItem, TreeNode} from "primeng/api";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";
import {TreeHelper} from "@core/helpers/tree.helper";
import {ILangFacade} from "@core/facades/lang.facade";
import {PrivilegesService} from "@core/services/privileges.service";
import {TranslateService} from "@ngx-translate/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {auditTime, filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseBiaAppAction} from "../states/browse-bia-app.action";
import {BrowseBiaAppState, BrowseBiaAppStateModel} from "../states/browse-bia-app.state";
import {BiaAppsState} from "@core/states/bia-apps/bia-apps.state";
import {BcAnalysisByOrgHierarchyResponse} from "../../../../api/models/bc-analysis-by-org-hierarchy-response";
import {BcAnalysisStatus, BcCycles} from "../../../../api/models";
import {ImpactAnalysisState} from "@core/states/impact-analysis/impact-analysis.state";
import {Router} from "@angular/router";
import {OrgDetailAction, OrgDetailState} from "@core/states";
import {BcOrgHierarchyProjection} from "../../../../api/models/bc-org-hierarchy-projection";
import {BrowseImpactAnalysisAction} from "../../impact-analysis/states/browse-impact-analysis.action";

@Component({
  selector: 'app-browse-bia-app',
  templateUrl: './browse-bia-app.component.html',
  styleUrls: ['./browse-bia-app.component.scss']
})
export class BrowseBiaAppComponent implements OnInit, OnDestroy {
  public page$: Observable<BcAnalysisByOrgHierarchyResponse[]>;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  @Select(BrowseBiaAppState.state)
  public state$: Observable<BrowseBiaAppStateModel>;

  @Select(BiaAppsState.loading)
  public loading$: Observable<boolean>;

  @Select(BiaAppsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(BrowseBiaAppState.hasFilters)
  public hasFilters$: Observable<boolean>;

  public sortAnalysisCycles$: Observable<any[]>;

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;

  @Select(ImpactAnalysisState.activityStatuses)
  public activityStatuses$: Observable<BcAnalysisStatus[]>;

  private auditLoadOrgPage$ = new Subject<string>();
  selectedCycle: any;
  public orgHir: TreeNode[] = [];
  public orgHireracy: TreeNode[] = [];
  private destroy$ = new Subject();
  public exportActions = [
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_XLSX'),
      icon: 'pi pi-file-excel',
      command: () => this.export('EXCEL'),
    },
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_PDF'),
      icon: 'pi pi-file-pdf',
      command: () => this.export('PDF'),
    },
  ] as MenuItem[];

  public sortableColumns = [
    { name: 'DIVISION', code: 'orgHierarchy' },
    { name: 'STATE', code: 'status' },
  ];

  public columns = [
    {
      name: 'APP',
      code: 'application',
      disabled: true,
    },
    {
      name: 'DIVISION',
      code: 'divisionName',
      disabled: true,
    },
    { name: 'CYCLE', code: 'cycle' },
    { name: 'ANALYSIS', code: 'analysisCyclePercentage' },
    { name: 'STATE', code: 'state' },
  ];
  constructor(
    private store: Store,
    private translate: TranslateService,
    private translateObj: TranslateObjPipe,
    private breakpointObserver: BreakpointObserver,
    private langFacade: ILangFacade,
    private treeHelper: TreeHelper,
    private privilegesService: PrivilegesService,
    private router: Router
  ) {
    this.langFacade.vm$
      .pipe
      // map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
      ()
      .subscribe((res) => {
        if (res['key'] == 'ar') {
          this.sortableColumns[0].code = 'orgHierarchy.nameAr';
          this.sortableColumns[1].code = 'status.nameAr';
        } else {
          this.sortableColumns[0].code = 'orgHierarchy.nameEn';
          this.sortableColumns[1].code = 'status.nameEn';
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
    this.store.dispatch([
      new BrowseBiaAppAction.LoadCycles({ page: 0, size: 100 }),
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
      new BrowseBiaAppAction.LoadActivitiesStatuses(),
    ]).pipe(
      takeUntil(this.destroy$),
      take(1),
      filter((p) => !!p),
      tap(() => {
        this.store.dispatch(new BrowseBiaAppAction.UpdateCycle({
          cycle: this.selectedCycle}));
        this.loadPage(null, this.selectedCycle);
      })
    ).subscribe();
    this.sortAnalysisCycles$ = this.cycles$.pipe(
      filter((cycles) => !!cycles),
      switchMap((cycles) => {
        return of([...cycles].sort((a, b) => b.id - a.id));
      })
    );
    this.sortAnalysisCycles$.subscribe(cycles => {
      if (cycles.length > 0) {
        const sortedCycles = [...cycles];
        this.selectedCycle = sortedCycles[0].id;
      }
    });
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
    const taskActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(BiaAppsState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...taskActions[0],
                command: () => {
                  // this.goToResourceAndActivity(u);
                },
              },
            ],
          };
        })
      )
    );
  }

  search() {
    this.store.dispatch(new BrowseBiaAppAction.LoadBia({
      pageRequest: undefined,
      cycleId: this.selectedCycle
    }));
  }

  clear() {
    this.store.dispatch([
      new BrowseBiaAppAction.UpdateFilter({ clear: true }),
      new BrowseBiaAppAction.LoadBia({ pageRequest: undefined,
        cycleId: this.selectedCycle}),
    ]);
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgIds':
          filter['orgIds'] = filter['orgIds']
            .map((o) => {
              return {
                key: o?.key,
                labelEn: o.labelEn,
                labelAr: o.labelAr,
              };
            })
            .filter((id) => ![undefined, null].includes(id));
          break;
        case 'orgHierarchyId':
          filter['orgHierarchyId'] = {
            id: filter['orgHierarchyId']?.key,
            labelEn: filter['orgHierarchyId'].data.nameEn,
            labelAr: filter['orgHierarchyId'].data.nameAr,
          };
          break;
        default:
          break;
      }
    }

    this.store
      .dispatch(new BrowseBiaAppAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseBiaAppAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortBia({ field: event.value, cycle: this.selectedCycle})
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortBia({
        order: event.checked ? 'desc' : 'asc', cycle: this.selectedCycle
      })
    );
  }

  export(type: 'EXCEL' | 'PDF') {
    // this.store.dispatch(new BrowseUsersAction.Export({ type }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadPage(event?: LazyLoadEvent, cycle?) {
    this.store.dispatch(
      new BrowseBiaAppAction.LoadBia({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        cycleId: cycle ? cycle : this.selectedCycle,
      })
    );
  }

  setCycleId(value: BcCycles) {
    this.store.dispatch(new BrowseBiaAppAction.UpdateCycle({
      cycle: value}))
    this.loadPage(null, value);
  }


  public setTree(searchResponses: BcOrgHierarchyProjection[]) {
    if (searchResponses.length == 0) {
      if (this.orgHir.length == 0) {
        this.orgHir = [];
        this.orgHireracy = [];
      }
      return;
    }
    const branch = this.treeHelper.orgHir2TreeNode(searchResponses);
    if (branch?.length > 0) {
      branch.forEach(
        (item) => (item.label = this.translateObj.transform(item.data))
      );
    }

    const parentId = searchResponses[0].parentId;
    const parentNode = this.treeHelper.findOrgHirById(this.orgHir, parentId);
    // console.log(parentId ,parentNode);

    if (parentNode && parentId) {
      parentNode.children = [...branch, ...parentNode.children];
    } else {
      this.orgHir = branch;
    }
    this.orgHireracy = this.orgHir
    this.orgHireracy.forEach((node) => {
      this.markDisabledNodes(node);
    });
  }
  markDisabledNodes(node: TreeNode) {
    if (node.children) {
      node.children.forEach((child) => {
        this.markDisabledNodes(child);
      });
    }
    node.selectable = node.data.bcOrgHirType.id === 2;
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
}
