import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {TreeHelper} from "@core/helpers/tree.helper";
import {TranslateService} from "@ngx-translate/core";
import {MessageHelper} from "@core/helpers/message.helper";
import {IAuthService} from "@core/services/auth.service";
import {filter, takeUntil} from "rxjs/operators";
import {SYSTEMS} from "../tempData.conts";
import {BrowseBusinessImpactAnalysisState, BrowseBusinessImpactAnalysisStateModel} from "../states/browse-business-impact-analysis.state";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-browse-business-impact-analysis',
  templateUrl: './browse-business-impact-analysis.component.html',
  styleUrls: ['./browse-business-impact-analysis.component.scss']
})
export class BrowseBusinessImpactAnalysisComponent implements OnInit, OnDestroy {
  // public page$: Observable<UserAndRoleProjection[]>;
  public demo = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];
  public page = SYSTEMS;

  @Select(BrowseBusinessImpactAnalysisState.state)
  public state$: Observable<BrowseBusinessImpactAnalysisStateModel>;

  @Select(BrowseBusinessImpactAnalysisState.hasFilters)
  public hasFilters$: Observable<boolean>

  /*@Select(UserState.loading)
  public loading$: Observable<boolean>;
  @Select(UserState.totalRecords)
  public totalRecords$: Observable<number>;


;*/

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
      code: 'firstNameAr,middleNameAr,lastNameAr',
    },
    {
      name: 'ACTIVITY_FEQ',
      code: 'firstNameEn,middleNameEn,lastNameEn',
    },
    { name: 'ANALYSIS_CRCLE', code: 'orgStructure.nameEn' },
    { name: 'RTO', code: 'emiratesId' },
    { name: 'PRIORITY_LEVEL', code: 'userName' },
    { name: 'STATUS', code: 'title' },
  ];

  public columns = [
    { name: 'ACTIVITY_NAME', code: 'userName', disabled: true },
    {
      name: 'ACTIVITY_FEQ',
      code: 'nameAr',
    },
    { name: 'ANALYSIS_CRCLE', code: 'org' },
    { name: 'RTO', code: 'emiratesId' },
    { name: 'PRIORITY_LEVEL', code: 'title' },
    { name: 'STATUS', code: 'role' },
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
    private treeHelper: TreeHelper,
    private lang: ILangFacade,
  ) { }

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
    /*this.page$ = this.store.select(UserState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...userActions[0],
                command: () => {
                  // this.openDialog(u.id);
                },
                // disabled: !u.isActive,
              },
              {
                ...userActions[1],
                command: () => {
                  // this.activate(u.id);
                },
                // disabled: u.isActive,
              },
            ],
          };
        })
      )
    );*/
  }

  export(type: 'EXCEL' | 'PDF') {
    // this.store.dispatch(new BrowseUsersAction.Export({ type }));
  }

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
    /*  yesCommand: () => {
        this.store.dispatch(new UserAction.Activate({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },*/
    });
  }
  openDialog(id?: number) {
    // this.store.dispatch(new BrowseUsersAction.ToggleDialog({ userId: id }));
  }
  search() {
    // this.store.dispatch(new BrowseUsersAction.LoadUsers());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    // const keys = Object.keys(filter);
   /* if (keys.length > 0) {
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
    }*/

    // this.store.dispatch(new BrowseUsersAction.UpdateFilter(filter));
  }
  clear() {
    /*this.store.dispatch([
      new BrowseUsersAction.UpdateFilter({ clear: true }),
      new BrowseUsersAction.LoadUsers(),
    ]);*/
  }

  changeColumns(event) {
    /*this.store.dispatch(
      new BrowseUsersAction.ChangeColumns({ columns: event.value })
    );*/
  }
  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new BrowseUsersAction.ChangeView({ view }));
  }

  sort(event) {
  /*  this.store.dispatch(
      new BrowseUsersAction.SortUsers({ field: event.value })
    );*/
  }

  order(event) {
    /*this.store.dispatch(
      new BrowseUsersAction.SortUsers({ order: event.checked ? 'desc' : 'asc' })
    );*/
  }

  public loadPage(event: LazyLoadEvent) {
    /*this.store.dispatch(
      new BrowseUsersAction.LoadUsers({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );*/
  }

}
