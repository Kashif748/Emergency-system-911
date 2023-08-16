import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { SYSTEMS } from '../../tempData.conts';
import { ILangFacade } from '@core/facades/lang.facade';
import { BrowseSystemsAction } from '../states/browse-systems.action';
import { Observable, Subject } from 'rxjs';
import {
  BrowseSystemsState,
  BrowseSystemsStateModel,
} from '../states/browse-systems.state';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { MessageHelper } from '@core/helpers/message.helper';
import { BcSystems } from 'src/app/api/models';
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {PrivilegesService} from "@core/services/privileges.service";

@Component({
  selector: 'app-browse-system',
  templateUrl: './browse-system.component.html',
  styleUrls: ['./browse-system.component.scss'],
})
export class BrowseSystemComponent implements OnInit, OnDestroy {
  public page$: Observable<BcSystems[]>;

  @Select(SystemsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(SystemsState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseSystemsState.state)
  public state$: Observable<BrowseSystemsStateModel>;

  private destroy$ = new Subject();

  public sortableColumns = [
    {
      name: 'SYSTEMS.DEPARTMENT_NAME',
      code: 'dept',
    },
    {
      name: 'SYSTEMS.SYSTEM_NAME',
      code: 'name',
    },
  ];

  public selectedColumns = [
    { name: 'SYSTEMS.DEPARTMENT_NAME', code: 'dept' },
    { name: 'SYSTEMS.SYSTEM_NAME', code: 'name' },
  ];
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private privilegesService: PrivilegesService

  ) {}

  ngOnInit(): void {
    this.page$ = this.store.select(SystemsState.page).pipe(
      filter((p) => !!p),
      tap(console.log),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                label: this.translate.instant('ACTIONS.EDIT'),
                icon: 'pi pi-pencil',

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
                disabled: !this.privilegesService.checkActionPrivileges('PRIV_ED_BC_RESOURCE'),
              },
            ],
          };
        })
      )
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openView(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.OpenView({ systemId }));
  }

  openDialog(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.ToggleDialog({ systemId }));
  }

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new BrowseSystemsAction.DeleteSystem({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }
  search() {
    this.store.dispatch(new BrowseSystemsAction.LoadSystems());
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseSystemsAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseSystemsAction.ChangeView({ view }));
  }

  clear() {
    this.store.dispatch([
      new BrowseSystemsAction.UpdateFilter({ clear: true }),
      new BrowseSystemsAction.LoadSystems(),
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
    this.store.dispatch(new BrowseSystemsAction.UpdateFilter(filter));
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseSystemsAction.LoadSystems({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
