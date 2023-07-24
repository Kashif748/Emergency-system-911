import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {filter, map, take, takeUntil, tap} from "rxjs/operators";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {ILangFacade} from "@core/facades/lang.facade";
import {MessageHelper} from "@core/helpers/message.helper";
import {LazyLoadEvent, MenuItem, TreeNode} from "primeng/api";
import {BcActivities} from "../../../api/models/bc-activities";
import {OrgActivityState} from "@core/states/org-activities/orgActivity.state";
import {BrowseOrgActivityStateModel, BrowseOrganizationState} from "../states/browse-organization.state";
import {BrowseOrganizationAction} from "../states/browse-organization.action";
import {ActivityFrquencyState} from "@core/states/bc/activity-frquency/activity-frquency.state";
import {ActivityFrquencyAction, OrgDetailAction} from "@core/states";
import {BcActivityFrequencies} from "../../../api/models/bc-activity-frequencies";
import {OrgDetailState} from "@core/states/bc/org-details/org-detail.state";

@Component({
  selector: 'app-browse-organizations',
  templateUrl: './browse-organizations.component.html',
  styleUrls: ['./browse-organizations.component.scss']
})
export class BrowseOrganizationsComponent implements OnInit, OnDestroy {
  public page$: Observable<BcActivities[]>;
  @Select(OrgActivityState.loading)
  public loading$: Observable<boolean>;
  @Select(OrgActivityState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowseOrganizationState.state)
  public state$: Observable<BrowseOrgActivityStateModel>;

  @Select(BrowseOrganizationState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(ActivityFrquencyState.page)
  public activityFre$: Observable<BcActivityFrequencies[]>;

  @Select(OrgDetailState.orgHir)
  public departmentsTree$: Observable<TreeNode[]>;

  nodes: TreeNode[];

  public activityArea = [
    {
      id: 0,
      lable: this.translate.instant('ACTIONS.NO'),
    },
    {
      id: 1,
      lable: this.translate.instant('ACTIONS.YES'),
    }
    ];

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
    {
      name: 'USER_MANAGEMENT.USERS.NAME_AR',
      code: 'firstNameAr,middleNameAr,lastNameAr',
    },
    {
      name: 'USER_MANAGEMENT.USERS.NAME_EN',
      code: 'firstNameEn,middleNameEn,lastNameEn',
    },
    { name: 'SHARED.ORG', code: 'orgStructure.nameEn' },
    { name: 'USER_MANAGEMENT.EMIRATES_ID', code: 'emiratesId' },
    { name: 'SHARED.USERNAME', code: 'userName' },
    { name: 'SHARED.JOB_TITLE', code: 'title' },
    { name: 'SHARED.ACTIVE', code: 'isActive' },
  ];

  public columns = [
    {
      name: 'SHARED.TITLE',
      code: 'title',
      disabled: true,
    },
    {
      name: 'SHARED.DESC',
      code: 'desc',
      disabled: true,
    },
    { name: 'SHARED.INCIDENT_ID', code: 'incidentId' },
    { name: 'SHARED.PRIORITY', code: 'priority' },
    { name: 'SHARED.DUE_DATE', code: 'dueDate' },
    { name: 'SHARED.STATUS', code: 'status' },
    { name: 'SHARED.CREATED_BY', code: 'createdBy' },
    { name: 'SHARED.ASSIGNEE', code: 'assignee' },
  ];
  public type$: Observable<string>;

  constructor(
    private store: Store,
    private translate: TranslateService,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private langFacade: ILangFacade,
    private route: ActivatedRoute
  ) {
    this.activityFre$.pipe(
      filter((orgs) => !!orgs),
      map((orgs) => {
        return {
          data: orgs,
        } as TreeNode;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch([
      new ActivityFrquencyAction.LoadPage({
        page: 0,
        size: 20}),
      new OrgDetailAction.GetOrgHierarchy({
        page: 0,
        size: 20
      })
    ]).pipe(
      tap(() => {
        this.departmentsTree$.subscribe((data) => {
          this.nodes = this.buildTree(data);
        }),
        takeUntil(this.destroy$);
        take(1);
      }),
    ).subscribe();
    this.type$ = this.route.queryParams.pipe(map((params) => params['_type']));
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
        this.changeView('CARDS');
      });
    const taskActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(OrgActivityState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...taskActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                // disabled: !u.isActive,
              },
            ],
          };
        })
      )
    );
  }

  private buildTree(data: any[]): TreeNode[] {
    // Helper function to build the tree structure
    const treeNodes: TreeNode[] = [];
    const parentNodes = [
      { label: 'Department', data: 2 },
      { label: 'Sector', data: 1 },
      { label: 'Section', data: 3 },
    ];

    parentNodes.forEach((parentNode) => {
      const children = data.filter(
        (item) => item.bcOrgHirType.id === parentNode.data
      );
      const node: TreeNode = {
        label: parentNode.label,
        data: parentNode.data,
        children: this.buildChildNodes(children),
      };
      treeNodes.push(node);
    });

    return treeNodes;
  }
  private buildChildNodes(data: any[]): TreeNode[] {
    // Helper function to build child nodes
    return data.map((item) => ({
      label: item.nameEn,
      data: item.id,
      children: this.buildChildNodes(
        data.filter((child) => child.parentId === item.id)
      ),
    }));
  }


  openDialog(id?: number) {
    this.store.dispatch(new BrowseOrganizationAction.ToggleDialog({ organizationId: id }));
  }

  search() {
    this.store.dispatch(new BrowseOrganizationAction.LoadOrganization());
  }

  clear() {
    this.store.dispatch([
      new BrowseOrganizationAction.UpdateFilter({ clear: true }),
      new BrowseOrganizationAction.LoadOrganization(),
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

        default:
          break;
      }
    }

    this.store
      .dispatch(new BrowseOrganizationAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseOrganizationAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseOrganizationAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseOrganizationAction.SortOrganization({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseOrganizationAction.SortOrganization({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  export(type: 'EXCEL' | 'PDF') {
    // this.store.dispatch(new BrowseUsersAction.Export({ type }));
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseOrganizationAction.LoadOrganization({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
