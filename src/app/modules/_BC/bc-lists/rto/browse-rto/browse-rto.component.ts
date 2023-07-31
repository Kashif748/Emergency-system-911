import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { RtoState } from '@core/states/bc/rto/rto.state';
import {
  BrowseRtoState,
  BrowseRtoStateModel,
} from '../states/browse-rto.state';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { MessageHelper } from '@core/helpers/message.helper';
import { TranslateService } from '@ngx-translate/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { BrowseRtoAction } from '../states/browse-rto.action';
import { Bcrto, BcVersions } from 'src/app/api/models';
import { BrowseBCState } from '../../../states/browse-bc.state';
import { BCState } from '@core/states';

@Component({
  selector: 'app-browse-rto',
  templateUrl: './browse-rto.component.html',
  styleUrls: ['./browse-rto.component.scss'],
})
export class BrowseRtoComponent implements OnInit, OnDestroy {
  public page$: Observable<Bcrto[]>;

  @Select(RtoState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(RtoState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseRtoState.state)
  public state$: Observable<BrowseRtoStateModel>;

  public selectedVersion$: Observable<BcVersions>;

  private destroy$ = new Subject();

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private messageHelper: MessageHelper
  ) {}

  ngOnInit(): void {
    this.selectedVersion$ = this.store.select(BCState.selectedVersion).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      tap((v) => {
        console.log(v);

        this.loadPage();
      })
    );

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

    this.page$ = this.store.select(RtoState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
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
            ],
          };
        })
      )
    );
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseRtoAction.ToggleDialog({ rtoId: id }));
  }

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        // this.store.dispatch(new UserAction.Activate({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }

  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseRtoAction.LoadRto({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
