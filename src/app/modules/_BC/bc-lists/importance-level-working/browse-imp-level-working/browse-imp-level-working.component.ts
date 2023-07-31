import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { MessageHelper } from '@core/helpers/message.helper';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { ILangFacade } from '@core/facades/lang.facade';
import { Observable, Subject } from 'rxjs';
import { ImpLevelWorkingState } from '@core/states/bc/imp-level-working/imp-level-working.state';
import {
  BrowseImpLevelWorkingState,
  BrowseImpLevelWorkingStateModel,
} from './states/browse-imp-level-working.state';
import { BrowseImpLevelWorkingAction } from './states/browse-imp-level-working.action';
import { BcVersions, BcWorkImportanceLevels } from 'src/app/api/models';
import { BrowseBCState } from '../../../states/browse-bc.state';
import { BCState } from '@core/states';

@Component({
  selector: 'app-browse-imp-level-working',
  templateUrl: './browse-imp-level-working.component.html',
  styleUrls: ['./browse-imp-level-working.component.scss'],
})
export class BrowseImpLevelWorkingComponent implements OnInit, OnDestroy {
  public page$: Observable<BcWorkImportanceLevels[]>;

  @Select(ImpLevelWorkingState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpLevelWorkingState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpLevelWorkingState.state)
  public state$: Observable<BrowseImpLevelWorkingStateModel>;

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

    this.page$ = this.store.select(ImpLevelWorkingState.page).pipe(
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

  openDialog(Id?: number) {
    this.store.dispatch(
      new BrowseImpLevelWorkingAction.ToggleDialog({ id: Id })
    );
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
      new BrowseImpLevelWorkingAction.LoadImpLevelWorking({
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
