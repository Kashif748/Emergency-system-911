import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { MessageHelper } from '@core/helpers/message.helper';
import { LazyLoadEvent, MenuItem, TreeNode } from 'primeng/api';
import { BcActivities } from '../../../../api/models/bc-activities';
import { OrgActivityState } from '@core/states/org-activities/orgActivity.state';
import {
  BrowseOrgActivityStateModel,
  BrowseOrganizationState,
} from '../states/browse-organization.state';
import { BrowseOrganizationAction } from '../states/browse-organization.action';
import { ActivityFrquencyState } from '@core/states/bc/activity-frquency/activity-frquency.state';
import { ActivityFrquencyAction, OrgDetailAction } from '@core/states';
import { BcActivityFrequencies } from '../../../../api/models/bc-activity-frequencies';
import { OrgDetailState } from '@core/states/bc/org-details/org-detail.state';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { BcOrgHierarchy } from '../../../../api/models/bc-org-hierarchy';
import { PrivilegesService } from '@core/services/privileges.service';

@Component({
  selector: 'app-browse-organizations',
  templateUrl: './browse-organizations.component.html',
  styleUrls: ['./browse-organizations.component.scss'],
})
export class BrowseOrganizationsComponent implements OnInit, OnDestroy {
  public orgHir$: Observable<TreeNode[]>;

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
      lable: 'ACTIVITY_DIALOG.INTERNAL',
      value: 'true',
    },
    {
      id: 1,
      lable: 'ACTIVITY_DIALOG.EXTERNAL',
      value: 'false',
    },
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
      name: 'ACTIVITY_NAME',
      code: 'nameEn',
    },
    {
      name: 'ACTIVITY_NAME_AR',
      code: 'nameAr',
    },
    { name: 'ACTIVITY_FEQ', code: 'activityFrequence' },
    { name: 'ACTIVITY_AREA', code: 'internal' },
    { name: 'ARIS', code: 'externalReference' },
  ];

  public columns = [
    {
      name: 'ACTIVITY_NAME',
      code: 'nameEn',
      disabled: true,
    },
    {
      name: 'ACTIVITY_NAME_AR',
      code: 'nameAr',
      disabled: true,
    },
    { name: 'ACTIVITY_FEQ', code: 'activityFrequence' },
    { name: 'ACTIVITY_AREA', code: 'internal' },
    { name: 'ARIS', code: 'externalReference' },
  ];

  constructor(
    private store: Store,
    private translate: TranslateService,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private langFacade: ILangFacade,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private translateObj: TranslateObjPipe,
    private privilegesService: PrivilegesService
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
        size: 20,
      }),
      new OrgDetailAction.GetOrgHierarchy({
        page: 0,
        size: 20,
      }),
    ]);

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
                disabled: !this.privilegesService.checkActionPrivileges([
                  'PRIV_ED_DEL_SITUATION',
                  'PRIV_ADD_FILE_SITUATION',
                ]),
              },
            ],
          };
        })
      )
    );
    this.orgHir$ = this.store.select(OrgDetailState.orgHir).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      tap(console.log),
      map((data) => this.setTree(data)),
      tap(console.log)
    );
  }

  public setTree(_searchResponses: BcOrgHierarchy[]): TreeNode[] {
    console.log(_searchResponses);

    const nest = (items, id = null, link = 'parentId') =>
      items
        .filter((item) => item[link] === id)
        .map((item: BcOrgHierarchy) => {
          let node: TreeNode;
          node = {
            key: item.id.toString(),
            data: item,
            label: ' m',
            children: nest(items, item.id),
          };
          return node;
        });
    const tree = nest(_searchResponses);
    console.log(tree);

    return tree;
  }

  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseOrganizationAction.ToggleDialog({ organizationId: id })
    );
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
        case 'orgHierarchyId':
          filter['orgHierarchyId'] = {
            id: filter['orgHierarchyId']?.data,
            labelEn: filter['orgHierarchyId'].labelEn
              ? filter['orgHierarchyId'].labelEn
              : filter['orgHierarchyId'].label,
            labelAr: filter['orgHierarchyId'].labelAr
              ? filter['orgHierarchyId'].labelEn
              : filter['orgHierarchyId'].label,
          };
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
      new BrowseOrganizationAction.SortOrganization({
        order: event.checked ? 'desc' : 'asc',
      })
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
