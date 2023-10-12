import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Select, Store} from "@ngxs/store";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {ILangFacade} from "@core/facades/lang.facade";
import {Observable, Subject} from "rxjs";
import {BcPartners} from "../../../../api/models/bc-partners";
import {VenderState} from "@core/states/bc-setup/venders/vender.state";
import {BrowseVenderState, BrowseVenderStateModel} from "../states/browse-vender.state";
import {filter, map, takeUntil} from "rxjs/operators";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BrowseVenderAction} from "../states/browse-vender.action";
import {PrivilegesService} from "@core/services/privileges.service";
import {MessageHelper} from "@core/helpers/message.helper";

@Component({
  selector: 'app-browse-vender',
  templateUrl: './browse-vender.component.html',
  styleUrls: ['./browse-vender.component.scss']
})
export class BrowseVenderComponent implements OnInit, OnDestroy {
  public page$: Observable<BcPartners[]>;

  @Select(VenderState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(VenderState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseVenderState.state)
  public state$: Observable<BrowseVenderStateModel>;

  private destroy$ = new Subject();

  public criticalityType = [
    {id: 1, nameEn: "Critical", nameAr: "مهم"},
    {id: 2, nameEn: "Non-Critical", nameAr: "غير مهم"},
  ];
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
    { name: 'VENDERS.COMPANY_NAME', code: 'name' },
    { name: 'VENDERS.DIALOG.CRITICALITY', code: 'isCritical' },
    { name: 'VENDERS.DIALOG.ADDRESS', code: 'address' }
  ];
  public selectedColumns = [
    { name: 'VENDERS.NO', code: 'id', disabled: true},
    { name: 'VENDERS.COMPANY_NAME', code: 'companyName', disabled: true},
    { name: 'VENDERS.DIALOG.CRITICALITY', code: 'critical'},
    { name: 'VENDERS.DIALOG.ADDRESS', code: 'address'}
  ];
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
    private breakpointObserver: BreakpointObserver,
    private langFacade: ILangFacade,
    private privilegesService: PrivilegesService,
    private messageHelper: MessageHelper,

  ) {
    this.langFacade.vm$.pipe(
    ).subscribe((res) => {
      if (res['key'] == 'ar') {
        this.sortableColumns[0].code = 'nameAr';
      } else {
        this.sortableColumns[0].code = 'nameEn';
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

    const venderAction = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(VenderState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...venderAction[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !this.privilegesService.checkActionPrivileges('PRIV_ED_BC_RESOURCE'),
              },
              {
                label: this.translate.instant('ACTIONS.DELETE'),
                icon: 'pi pi-trash',
                command: () => {
                  this.activate(u.id);
                },
                disabled: !this.privilegesService.checkActionPrivileges(
                  'PRIV_ED_BC_RESOURCE'
                ),
              },
            ],
          };
        }).sort((a, b) => b.id - a.id)
      )
    );
  }
  activate(id: number) {
    this.messageHelper.delete({
      summary: 'SHARED.DIALOG.DELETE.TITLE',
      detail: 'SHARED.DIALOG.DELETE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new BrowseVenderAction.DeleteVender({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openView(id?: number) {
    this.store.dispatch(new BrowseVenderAction.OpenView({ venderId: id }));
  }

  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseVenderAction.ToggleDialog({ venderId: id })
    );
  }
  search() {
    this.store.dispatch(new BrowseVenderAction.LoadVender());
  }

  clear() {
    this.store.dispatch([
      new BrowseVenderAction.UpdateFilter({ clear: true }),
      new BrowseVenderAction.LoadVender(),
    ]);
  }
  export(type: 'EXCEL' | 'PDF') {
    // this.store.dispatch(new BrowseGroupsAction.Export({ type }));
  }

  order(event) {
    this.store.dispatch(
      new BrowseVenderAction.SortVender({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseVenderAction.ChangeView({ view }));
  }

  changeColumns(event) {
    this.store.dispatch(
       new BrowseVenderAction.ChangeColumns({ columns: event.value })
     );
  }

  sort(event) {
    this.store.dispatch(
       new BrowseVenderAction.SortVender({ field: event.value })
     );
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgId':
          filter['orgId'] = {
            key: filter['orgId']?.key,
            labelEn: filter['orgId'].labelEn,
            labelAr: filter['orgId'].labelAr,
          };
          break;
        default:
          break;
      }
    }
    this.store.dispatch(new BrowseVenderAction.UpdateFilter(filter));
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseVenderAction.LoadVender({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
