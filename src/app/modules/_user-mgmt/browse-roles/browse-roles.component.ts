import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageHelper } from '@core/helpers/message.helper';
import { TreeHelper } from '@core/helpers/tree.helper';
import { TreeModel } from '@core/models/tree.model';
import { IAuthService } from '@core/services/auth.service';
import { OrgAction, OrgState, RoleAction, RoleState } from '@core/states';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, MenuItem, TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
  OrgStructure,
  RoleProjection,
} from 'src/app/api/models';
import { BrowseRolesAction } from '../states/browse-roles.action';
import {
  BrowseRolesState,
  BrowseRolesStateModel,
} from '../states/browse-roles.state';

@Component({
  selector: 'app-browse-roles',
  templateUrl: './browse-roles.component.html',
  styleUrls: ['./browse-roles.component.scss'],
})
export class BrowseRolesComponent implements OnInit, OnDestroy {
  public page$: Observable<RoleProjection[]>;
  @Select(RoleState.loading)
  public loading$: Observable<boolean>;
  @Select(RoleState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowseRolesState.state)
  public state$: Observable<BrowseRolesStateModel>;

  @Select(BrowseRolesState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(OrgState.orgs)
  public orgs$: Observable<OrgStructure[]>;

  public orgsTree$: Observable<TreeModel[]>;

  private destroy$ = new Subject();

  public sortableColumns = [
    {
      name: 'SHARED.NAME_AR',
      code: 'nameAr',
    },
    {
      name: 'SHARED.NAME_EN',
      code: 'nameEn',
    },
    { name: 'SHARED.ORG', code: 'orgId.nameEn' },
    { name: 'SHARED.INHERITED', code: 'inherited' },
    { name: 'SHARED.ACTIVE', code: 'isActive' },
  ];

  public columns = [
    {
      name: 'SHARED.NAME_AR',
      code: 'nameAr',
      disabled: true,
    },
    {
      name: 'SHARED.NAME_EN',
      code: 'nameEn',
      disabled: true,
    },
    { name: 'SHARED.ORG', code: 'org' },
    { name: 'SHARED.INHERITED', code: 'inherited' },
    { name: 'SHARED.PRIVILEGES', code: 'privileges' },
  ];
  private orgId: number;
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
    this.store.dispatch(
      new OrgAction.LoadOrgs({
        orgId: this.orgId,
      })
    );
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
        this.changeView('CARDS');
      });
    const roleActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(RoleState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...roleActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !u.isActive,
              },
              {
                ...roleActions[1],
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

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new RoleAction.Activate({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseRolesAction.ToggleDialog({ roleId: id }));
  }

  search() {
    this.store.dispatch(new BrowseRolesAction.LoadRoles());
  }

  clear() {
    this.store.dispatch([
      new BrowseRolesAction.UpdateFilter({ clear: true }),
      new BrowseRolesAction.LoadRoles(),
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

    this.store.dispatch(new BrowseRolesAction.UpdateFilter(filter));
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseRolesAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseRolesAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseRolesAction.SortRoles({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseRolesAction.SortRoles({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseRolesAction.LoadRoles({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
