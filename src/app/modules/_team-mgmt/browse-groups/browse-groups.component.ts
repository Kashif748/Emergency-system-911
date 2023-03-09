import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrgAction, OrgState, UserAction} from "../../../core/states";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {OrgStructure, Role, UserAndRoleProjection} from "../../../api/models";
import {LazyLoadEvent, MenuItem, TreeNode} from "primeng/api";
import {BrowseUsersAction} from "../../_user-mgmt/states/browse-users.action";
import {BrowseGroupsAction} from "../states/browse-groups.action";
import {GroupState} from "@core/states/group/group.state";
import {BrowseGroupsState, BrowseGroupsStateModel} from "../states/browse-groups.state";
import {filter, map, take, takeUntil} from "rxjs/operators";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {TranslateService} from "@ngx-translate/core";
import {GroupUserAndRolesProjection} from "../../../api/models/group-user-and-roles-projection";
import {IAuthService} from "@core/services/auth.service";
import {TreeHelper} from "@core/helpers/tree.helper";
import {CenterState} from "@core/states/service-center-area/centers/center.state";
import {CenterAction} from "@core/states/service-center-area/centers/center.action";
import {CommonService} from "@core/services/common.service";


@Component({
  selector: 'app-browse-groups',
  templateUrl: './browse-groups.component.html',
  styleUrls: ['./browse-groups.component.scss']
})
export class BrowseGroupsComponent implements OnInit, OnDestroy {
  public page$: Observable<GroupUserAndRolesProjection[]>;

  @Select(GroupState.loading)
  public loading$: Observable<boolean>;
  @Select(GroupState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowseGroupsState.state)
  public state$: Observable<BrowseGroupsStateModel>;

  @Select(BrowseGroupsState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(OrgState.orgs)
  public orgs$: Observable<OrgStructure[]>;

  @Select(CenterState.centers)
  public centers$: Observable<any[]>;


  private destroy$ = new Subject();
  public orgsTree$: Observable<TreeNode[]>;

  orgId: number;
  public categories$: any[];

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
      code: 'nameAr',
    },
    {
      name: 'USER_MANAGEMENT.USERS.NAME_EN',
      code: 'nameEn',
    },
    { name: 'SHARED.ORG', code: 'orgStructure.nameEn,orgStructure.nameAr' },
    { name: 'GROUP.LEADER', code: 'manager' },
  ];

  public columns = [
    { name: 'USER_MANAGEMENT.USERS.NAME_AR', code: 'nameAr', disabled: true },
    { name: 'USER_MANAGEMENT.USERS.NAME_EN', code: 'nameEn'},
    { name: 'SHARED.ORG', code: 'org'},
    { name: 'GROUP.LEADER', code: 'leader' },
    { name: 'GROUP.USERS_NO', code: 'usersnumber' },
    { name: 'GROUP.SHIFT_SCHEDULE', code: 'shift_schedule' },
  ];

  public groupMembers$ = [
    {nameEn: 'All Groups', nameAr: 'الكل', value: null},
    {nameEn: 'Has Members', nameAr: 'تملك  أعضاء', value: true},
    {nameEn: 'No Members', nameAr: 'لا  تملك أعضاء', value: false}
  ];

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private auth: IAuthService,
    private treeHelper: TreeHelper,
    private readonly commonService: CommonService) {

    this.orgId = this.auth.getClaim('orgId');
    this.orgsTree$ = this.orgs$.pipe(
      filter((orgs) => !!orgs),
      map((orgs) =>
        this.treeHelper.composeOrgTree({
          orgs: orgs as any,
          rootId: this.orgId,
          mapper(o) {
            return {
              key: o.id as any,
              labelEn: o.nameEn,
              labelAr: o.nameAr,
              data: o,
            } as TreeNode;
          },
        })
      )
    );
    this.centers$.pipe(
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
      new OrgAction.LoadOrgs({
        orgId: this.orgId}),
       new CenterAction.LoadServiceCenter()
       ]);
    this.categories$ = this.getChildrenCategories();
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
         this.changeView('CARDS');
      });

    const groupActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(GroupState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...groupActions[0],
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

  getChildrenCategories() {
    const categories: any[] =
      this.commonService.getCommonData().incidentCategories;
    if (categories.length <= 0) {
      return [];
    }

    return categories.filter((item) => item.parent != null);
  }

  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseGroupsAction.Export({ type }));
  }

  openDialog(groupId?: number) {
    this.store.dispatch(new BrowseGroupsAction.ToggleDialog({ id: groupId }));
  }
  search() {
    this.store.dispatch(new BrowseGroupsAction.LoadGroups());
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseGroupsAction.ChangeColumns({ columns: event.value })
    );
  }

  sort(event) {
    this.store.dispatch(
      new BrowseGroupsAction.SortGroups({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseGroupsAction.SortGroups({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseGroupsAction.ChangeView({ view }));
  }

  clear() {
    this.store.dispatch([
      new BrowseGroupsAction.UpdateFilter({ clear: true }),
      new BrowseGroupsAction.LoadGroups(),
    ]);
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgId':
          filter['orgId'] = filter['orgId']
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
    this.store.dispatch(new BrowseGroupsAction.UpdateFilter(filter));
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseGroupsAction.LoadGroups({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }

}
