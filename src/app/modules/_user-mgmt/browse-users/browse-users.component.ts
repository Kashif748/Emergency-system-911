import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@core/states/user/user.state';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { OrgStructure, Role, UserAndRoleProjection } from 'src/app/api/models';
import { MenuItem } from 'primeng/api';

import { BrowseUsersAction } from '../states/browse-users.action';
import {
  BrowseUsersState,
  BrowseUsersStateModel,
} from '../states/browse-users.state';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { MessageHelper } from '@core/helpers/message.helper';
import { UserAction } from '@core/states/user/user.action';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IAuthService } from '@core/services/auth.service';
import { OrgState, RoleState } from '@core/states';
import { TreeHelper } from '@core/helpers/tree.helper';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss'],
})
export class BrowseUsersComponent implements OnInit, OnDestroy {
  public page$: Observable<UserAndRoleProjection[]>;
  @Select(UserState.loading)
  public loading$: Observable<boolean>;
  @Select(UserState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowseUsersState.state)
  public state$: Observable<BrowseUsersStateModel>;

  @Select(BrowseUsersState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(OrgState.orgs)
  public orgs$: Observable<OrgStructure[]>;

  public roles$: Observable<Role[]>;

  private destroy$ = new Subject();

  public orgsTree$: Observable<TreeNode[]>;
  orgId: number;

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
    { name: 'SHARED.USERNAME', code: 'userName', disabled: true },
    {
      name: 'USER_MANAGEMENT.USERS.NAME_AR',
      code: 'nameAr',
    },
    {
      name: 'USER_MANAGEMENT.USERS.NAME_EN',
      code: 'nameEn',
    },
    { name: 'SHARED.ORG', code: 'org' },
    { name: 'USER_MANAGEMENT.EMIRATES_ID', code: 'emiratesId' },
    { name: 'SHARED.JOB_TITLE', code: 'title' },
    { name: 'USER_MANAGEMENT.ROLE', code: 'role' },
  ];

  /**
   *
   */
  constructor(
    private store: Store,
    private translate: TranslateService,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private auth: IAuthService,
    private treeHelper: TreeHelper
  ) {
    this.orgId = this.auth.getClaim('orgId');
    this.roles$ = this.store.select(RoleState.roles).pipe(
      filter((r) => !!r),
      take(1)
    );
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    const userActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(UserState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...userActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !u.isActive,
              },
              {
                ...userActions[1],
                command: () => {
                  this.activate(u.id);
                },
                disabled: u.isActive,
              },
            ],
          };
        })
      )
    );
  }

  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseUsersAction.Export({ type }));
  }

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new UserAction.Activate({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseUsersAction.ToggleDialog({ userId: id }));
  }

  search() {
    this.store.dispatch(new BrowseUsersAction.LoadUsers());
  }

  clear() {
    this.store.dispatch([
      new BrowseUsersAction.UpdateFilter({ clear: true }),
      new BrowseUsersAction.LoadUsers(),
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
        case 'roleIds':
          filter['roleIds'] = filter['roleIds']
            .map((r) => {
              return {
                id: r?.id,
                nameEn: r.nameEn,
                nameAr: r.nameAr,
              };
            })
            .filter((id) => ![undefined, null].includes(id));

        default:
          break;
      }
    }

    this.store.dispatch(new BrowseUsersAction.UpdateFilter(filter));
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseUsersAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseUsersAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseUsersAction.SortUsers({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseUsersAction.SortUsers({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseUsersAction.LoadUsers({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
