import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { auditTime, filter, map, take, takeUntil, tap } from 'rxjs/operators';
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
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';
import { TreeHelper } from '@core/helpers/tree.helper';

@Component({
  selector: 'app-browse-organizations',
  templateUrl: './browse-organizations.component.html',
  styleUrls: ['./browse-organizations.component.scss'],
})
export class BrowseOrganizationsComponent implements OnInit, OnDestroy {
  public orgHir: TreeNode[] = [];

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();

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
    { name: 'ACTIVITY_NAME', code: 'nameEn' },
    { name: 'ACTIVITY_NAME_AR', code: 'nameAr' },
    { name: 'ACTIVITY_FEQ', code: '' },
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
    private translateObj: TranslateObjPipe,
    private breakpointObserver: BreakpointObserver,
    private langFacade: ILangFacade,
    private treeHelper: TreeHelper,
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
    this.langFacade.vm$
      .pipe
      // map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
      ()
      .subscribe((res) => {
        if (res['key'] == 'ar') {
          this.sortableColumns[2].code = 'activityFrequence.nameAr';
        } else {
          this.sortableColumns[2].code = 'activityFrequence.nameEn';
        }
      });
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
      new OrgDetailAction.GetOrgHierarchySearch({
        page: 0,
        size: 100,
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
                disabled: !this.privilegesService.checkActionPrivileges(
                  'PRIV_ED_ORG_ACTIVITY'
                ),
              },
            ],
          };
        })
      )
    );
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
    console.log(this.orgHir);
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
          filter['orgHierarchyId'] = filter['orgHierarchyId']?.key
            ? {
                id: filter['orgHierarchyId']?.key,
                labelEn: filter['orgHierarchyId']?.data?.nameEn,
                labelAr: filter['orgHierarchyId']?.data?.nameAr,
              }
            : undefined;
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
