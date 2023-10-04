import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {BcActivities} from "../../../../api/models/bc-activities";
import {Select, Store} from "@ngxs/store";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";
import {TreeHelper} from "@core/helpers/tree.helper";
import {ILangFacade} from "@core/facades/lang.facade";
import {PrivilegesService} from "@core/services/privileges.service";
import {TranslateService} from "@ngx-translate/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {filter, map, takeUntil} from "rxjs/operators";
import {OrgActivityState} from "@core/states/org-activities/orgActivity.state";
import {BrowseBiaAppAction} from "../states/browse-bia-app.action";
import {BrowseBiaAppState, BrowseBiaAppStateModel} from "../states/browse-bia-app.state";

@Component({
  selector: 'app-browse-bia-app',
  templateUrl: './browse-bia-app.component.html',
  styleUrls: ['./browse-bia-app.component.scss']
})
export class BrowseBiaAppComponent implements OnInit, OnDestroy {
  public page$: Observable<BcActivities[]>;

  @Select(BrowseBiaAppState.state)
  public state$: Observable<BrowseBiaAppStateModel>;

  @Select(OrgActivityState.loading)
  public loading$: Observable<boolean>;

  @Select(OrgActivityState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(BrowseBiaAppState.hasFilters)
  public hasFilters$: Observable<boolean>;

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
    { name: 'APP', code: 'application' },
    { name: 'DIVISION', code: 'divisionName' },
    { name: 'CYCLE', code: 'cycle' },
    { name: 'ANALYSIS', code: 'analysisCyclePercentage' },
    { name: 'ARIS', code: 'state' },
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
    private privilegesService: PrivilegesService
  ) { }

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
                /*disabled: !this.privilegesService.checkActionPrivileges(
                  'PRIV_ED_ORG_ACTIVITY'
                ),*/
              },
            ],
          };
        })
      )
    );
  }

  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseBiaAppAction.ToggleDialog({ BiaId: id })
    );
  }

  search() {
    this.store.dispatch(new BrowseBiaAppAction.LoadBia());
  }

  clear() {
    this.store.dispatch([
      new BrowseBiaAppAction.UpdateFilter({ clear: true }),
      new BrowseBiaAppAction.LoadBia(),
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
      new BrowseBiaAppAction.SortBia({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortBia({
        order: event.checked ? 'desc' : 'asc',
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

  public loadPage(event: LazyLoadEvent) {
    /*this.store.dispatch(
      new BrowseOrganizationAction.LoadOrganization({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );*/
  }

}