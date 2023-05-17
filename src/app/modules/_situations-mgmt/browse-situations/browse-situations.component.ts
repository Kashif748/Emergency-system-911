import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { MessageHelper } from '@core/helpers/message.helper';
import { PrivilegesService } from '@core/services/privileges.service';
import { CommonDataState } from '@core/states';
import { SituationsAction } from '@core/states/situations/situations.action';
import { SituationsState } from '@core/states/situations/situations.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { catchError, filter, map, takeUntil, tap } from 'rxjs/operators';
import { SituationProjection } from 'src/app/api/models/situation-projection';
import { BrowseSituationsAction } from '../states/browse-situations.action';
import {
  BrowseSituationsState,
  BrowseSituationsStateModel,
} from '../states/browse-situations.state';

@Component({
  selector: 'app-browse-situations',
  templateUrl: './browse-situations.component.html',
  styleUrls: ['./browse-situations.component.scss'],
})
export class BrowseSituationsComponent implements OnInit, OnDestroy {
  public page$: Observable<SituationProjection[]>;
  @Select(SituationsState.activeSituation)
  public activeSituation$: Observable<SituationProjection>;
  @Select(SituationsState.loading)
  public loading$: Observable<boolean>;
  @Select(SituationsState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowseSituationsState.state)
  public state$: Observable<BrowseSituationsStateModel>;
  @Select(BrowseSituationsState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(CommonDataState.newsTypes)
  public newsTypes$: Observable<any[]>;

  private destroy$ = new Subject();

  constructor(
    private store: Store,
    private translate: TranslateService,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private lang: ILangFacade,
    private privilegesService: PrivilegesService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.page$ = this.store.select(SituationsState.page).pipe(
      filter((p) => !!p),
      tap(console.log),
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
                disabled:
                  !u.isActive ||
                  !this.privilegesService.checkActionPrivileges(
                    'PRIV_ED_DEL_SITUATION'
                  ),
              },
              // view dashbaord
              {
                label: this.translate.instant('SITUATIONS.VIEW_DASHBOARD'),
                icon: 'pi pi-chart-bar',
                command: () => {
                  this.redirectToDashboard(u.id);
                },
                disabled: !u.isActive,
              },
              // print
              {
                label: this.translate.instant('SITUATIONS.PRINT'),
                icon: 'pi pi-print',
                command: () => {
                  this.exportPDF(u.id);
                },
                disabled: !u.isActive,
              },
              {
                label: this.translate.instant('SITUATIONS.DELETE'),
                icon: 'pi pi-trash',
                command: () => {
                  this.activate(u.id);
                },
                disabled:
                  !u.isActive ||
                  !this.privilegesService.checkActionPrivileges(
                    'PRIV_ED_DEL_SITUATION'
                  ),
              },
            ],
          };
        })
      )
    );
    this.store.dispatch(new BrowseSituationsAction.GetActiveSituation());
  }
  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new BrowseSituationsAction.DeleteSituations({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }
  redirectToDashboard(_id) {
    this.router.navigate(['/situations-management/dashboard'], {
      queryParams: { _id },
    });
  }
  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseSituationsAction.ToggleDialog({
        dialogName: '_form_dialog',
        situationId: id,
      })
    );
  }

  exportPDF(id) {
    this.store.dispatch(
      new BrowseSituationsAction.Export({ type: 'PDF', situationId: id })
    );
  }

  search() {
    this.store.dispatch(new BrowseSituationsAction.LoadSituations());
  }

  clear() {
    this.store.dispatch([
      new BrowseSituationsAction.UpdateFilter({ clear: true }),
      new BrowseSituationsAction.LoadSituations(),
    ]);
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        default:
          break;
      }
    }

    this.store
      .dispatch(new BrowseSituationsAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }

  loadByTheme(filter: { [key: string]: any }) {
    this.store
      .dispatch(new BrowseSituationsAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        this.search();
      });
  }
  // changeColumns(event) {
  //   this.store.dispatch(
  //     new BrowseSituationsAction.ChangeColumns({ columns: event.value })
  //   );
  // }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseSituationsAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseSituationsAction.SortSituations({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseSituationsAction.SortSituations({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseSituationsAction.LoadSituations({
        pageRequest: {
          first: event.first,
          rows: event.rows,
          filters: { active: true },
        },
      })
    );
  }
}
