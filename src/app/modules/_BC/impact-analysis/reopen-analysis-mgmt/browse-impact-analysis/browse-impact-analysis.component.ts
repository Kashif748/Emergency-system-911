import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {ConfirmationService, LazyLoadEvent, TreeNode} from 'primeng/api';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {auditTime, filter, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {BrowseImpactAnalysisState, BrowseImpactAnalysisStateModel} from '../../states/browse-impact-analysis.state';
import {ILangFacade} from '@core/facades/lang.facade';
import {ImpactAnalysisState} from '@core/states/impact-analysis/impact-analysis.state';
import {BcActivityAnalysis, BcAnalysisStatus, BcCycles, Bcrto} from 'src/app/api/models';
import {BrowseImpactAnalysisAction} from '../../states/browse-impact-analysis.action';
import {
  ActivityFrquencyAction,
  ActivityFrquencyState,
  ActivityPrioritySeqState,
  OrgDetailAction,
  OrgDetailState,
  RtoState,
} from '@core/states';
import {TranslateObjPipe} from '@shared/sh-pipes/translate-obj.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {BcOrgHierarchyProjection} from 'src/app/api/models/bc-org-hierarchy-projection';
import {TreeHelper} from '@core/helpers/tree.helper';
import {BrowseReourceAnalysisStateModel, BrowseResourceAnalysisState,} from '../../states/browse-resource-analysis.state';
import {BcResources} from '../../../../../api/models/bc-resources';
import {ResourceAnalysisState} from '@core/states/impact-analysis/resource-analysis.state';
import {BrowseResourceAnalysisAction} from '../../states/browse-resource-analysis.action';
import {ImapactAnalysisAction} from '@core/states/impact-analysis/impact-analysis.action';

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
  public orgHireracy: TreeNode[] = [];

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
  avoidSearch = false;
  orgHierarchyId: number;
  cycleId: number;
  alreadyFoundResource: boolean = false;
  cycleStatus: boolean = false;
  closeAlertBox: boolean = true;
  isResourceOnDivision: boolean = false;

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
    { name: 'ACTIVITY_NAME', code: 'activityName', disabled: true },
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

  constructor(
    private store: Store,
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private translateObj: TranslateObjPipe,
    private lang: ILangFacade,
    private treeHelper: TreeHelper,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
  ) {
    this.lang.vm$.pipe().subscribe((res) => {
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
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.orgHierarchyId = params['_division'];
        this.cycleId = params['_cycle'];
        this.alreadyFoundResource = false;
      });
  }

  findObjectById(id: number, dataArray: any): any {
    for (const item of dataArray) {
      if (item.data.id == id) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const result = this.findObjectById(id, item.children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  selectOrgHierarchyById(id: number) {
    /*this.store
      .select(OrgDetailState.orgHirSearch)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        map((data) => this.setTree(data))
      )
      .subscribe();*/
    const orgItem = this.findObjectById(id, this.orgHir);
    if (orgItem) {
      const orgHierarchyId = {
        orgHierarchyId: orgItem,
      };
      this.updateFilter(orgHierarchyId);
    }
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

    this.store
      .select(OrgDetailState.orgHirSearch)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        map((data) => this.setTree(data))
      )
      .subscribe();

    this.store
      .dispatch([
        new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
        new BrowseImpactAnalysisAction.LoadCycles({ page: 0, size: 100 }),
      ])
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        filter((p) => !!p),
        tap(() => {
          const checkParentID = this.orgHir.find(
            (item) => item.data.id == this.orgHierarchyId
          );
          this.cycles$
            .pipe(
              takeUntil(this.destroy$),
              take(1),
              map((cycles) => cycles.find((cycle) => cycle.id == this.cycleId)),
              tap((foundCycle) => {
                this.cycleStatus = foundCycle.status.id !== 3;
                this.updateFilter({ cycleId: foundCycle });
              })
            )
            .subscribe();
          if (checkParentID) {
            const orgHierarchyId = { orgHierarchyId: checkParentID };
            this.updateFilter(orgHierarchyId);
            this.loadPage();
            this.loadResourcePage();
          } else {
            this.store
              .dispatch(
                new OrgDetailAction.GetOrgHierarchyParent({
                  page: 0,
                  size: 100,
                  id: this.orgHierarchyId,
                })
              )
              .pipe(
                switchMap(() => this.store.select(OrgDetailState.orgHirParent)),
                takeUntil(this.destroy$),
                take(1),
                tap((orgHirParent) => {
                  this.store
                    .dispatch([
                      new OrgDetailAction.GetOrgHierarchySearch({
                        page: 0,
                        size: 100,
                        parentId: orgHirParent[0].id
                          ? orgHirParent[0].id
                          : this.orgHierarchyId,
                      }),
                      new BrowseImpactAnalysisAction.LoadCycles({
                        page: 0,
                        size: 100,
                      }),
                    ])
                    .pipe(
                      takeUntil(this.destroy$),
                      take(1),
                      tap(() => {
                        this.selectOrgHierarchyById(this.orgHierarchyId);
                        this.loadPage();
                        this.loadResourcePage();
                      })
                    )
                    .subscribe();
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();

    // All filters states
    this.store.dispatch([
      new BrowseImpactAnalysisAction.LoadActivitiesStatuses(),
      new ActivityFrquencyAction.LoadPage({ page: 0, size: 100 }),
    ]);

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

    this.resourcePage$ = this.store.select(ResourceAnalysisState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          if (
            u.orgHierarchy.id == this.orgHierarchyId &&
            u.cycle.id == this.cycleId
          ) {
            this.alreadyFoundResource = true;
          }
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
    if (!this.avoidSearch) {
      this.store.dispatch(new BrowseResourceAnalysisAction.LoadPage());
    }
  }
  updateFilter(
    filter: { [key: string]: any },
    event?: KeyboardEvent,
    click?: boolean
  ) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    if (filter['activityName'] || filter['activityFrequenceId']) {
      this.avoidSearch = true;
    } else {
      this.avoidSearch = false;
    }
    if (filter['orgHierarchyId']) {
      const hierarchyType = filter['orgHierarchyId']?.data?.bcOrgHirType?.id;
      this.isResourceOnDivision = hierarchyType === 2;
    }

    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
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
    this.store.dispatch(new BrowseImpactAnalysisAction.UpdateFilter(filter));
    this.store.dispatch(new BrowseResourceAnalysisAction.UpdateFilter(filter));

    if (click) {
      this.cycleStatus = filter['cycleId'] && filter['cycleId'].status.id !== 3;
      this.closeAlertBox = this.cycleStatus;
      this.store.dispatch(new BrowseImpactAnalysisAction.UpdateRoute(filter));
      this.search();
      this.checkStatus(filter);
    }
  }
  clear() {
    this.store.dispatch([
      new BrowseImpactAnalysisAction.UpdateFilter({ clear: true }),
      new BrowseResourceAnalysisAction.UpdateFilter({ clear: true }),
      new BrowseResourceAnalysisAction.LoadPage(),
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
    //  this.store.dispatch(new BrowseUsersAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.Sort({ field: event.value })
    );
  }
  createResource(event: Event) {
    if (!this.orgHierarchyId || !this.cycleId) {
      return;
    }
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('RESOURCES.CONFIREM'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(
          new BrowseResourceAnalysisAction.CreateResourceAnalysis({
            cycle: { id: this.cycleId },
            orgHierarchy: {
              id: this.orgHierarchyId,
              orgStructure: null,
            },
            isActive: true
          })
        );
      },
      reject: () => {
        //reject action
      },
    });
  }
  resourceSort(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.Sort({ field: event.value })
    );
  }

  resourceOrder(event) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.Sort({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.Sort({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }

  startResourceAnalysis(resource: BcResources) {
    this.router.navigate(['bc/resources'], {
      queryParams: {
        _cycle: resource?.cycle?.id,
        _resource: resource?.id,
        _division: resource?.orgHierarchy?.id,
      },
    });
  }

    startAnalysis(activity: BcActivityAnalysis) {
    this.router.navigate(['bc/activity-analysis'], {
      queryParams: {
        _cycle: activity?.cycle?.id,
        _activity: activity?.id,
        _division: this.orgHierarchyId,
      },
    });
  }
  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.LoadPage({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }
  public loadResourcePage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseResourceAnalysisAction.LoadPage({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  public checkStatus(filters) {
    const orgHie = filters['orgHierarchyId']
      ? filters['orgHierarchyId']?.id
      : this.orgHierarchyId;
    const cycle = filters['cycleId'] ? filters['cycleId']?.id : this.cycleId;
    this.store
      .dispatch(
        new BrowseImpactAnalysisAction.LoadAnalysisStatusInfo({
          orgHierarchyId: orgHie,
          cycleId: cycle,
        })
      )
      .pipe(
        switchMap(() =>
          this.store.select(ImpactAnalysisState.loadAnalysisStatus)
        ),
        takeUntil(this.destroy$),
        take(1),
        filter((p) => !!p),
        tap((status) => {
          this.store.dispatch(
            new ImapactAnalysisAction.LoadStatusBasedOnStatusId({
              id: status?.id,
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  closeAlert() {
    this.closeAlertBox = false;
  }
}
