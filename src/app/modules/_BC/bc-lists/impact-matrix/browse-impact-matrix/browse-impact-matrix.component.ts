import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';

import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import {
  BrowseImpactMatrixState,
  BrowseImpactMatrixStateModel,
} from '../states/browse-impact-matrix.state';
import { ImpactMatrixState } from '@core/states/bc/impact-matrix/impact-matrix.state';
import { BcImpactLevel, BcImpactMatrixDto, BcVersions } from 'src/app/api/models';
import { ImpactLevelState } from '@core/states/bc/impact-level/impact-level.state';
import { BrowseImpactLevelMatrixAction } from '../states/browse-impact-level-matrix.action';
import { ILangFacade } from '@core/facades/lang.facade';
import { MessageHelper } from '@core/helpers/message.helper';
import { BrowseBCState } from '../../../states/browse-bc.state';
import { BrowseImpactMatrixAction } from '../states/browse-impact-matrix.action';
import { BCState } from '@core/states';

@Component({
  selector: 'app-browse-impact-matrix',
  templateUrl: './browse-impact-matrix.component.html',
  styleUrls: ['./browse-impact-matrix.component.scss'],
})
export class BrowseImpactMatrixComponent implements OnInit, OnDestroy {
  public page$: Observable<BcImpactMatrixDto[]>;
  public impactTypePage$: Observable<BcImpactLevel[]>;

  @Select(ImpactMatrixState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpactMatrixState.loading)
  public loading$: Observable<boolean>;

  public selectedVersion$: Observable<BcVersions>;

  private destroy$ = new Subject();

  @Select(BrowseImpactMatrixState.state)
  public state$: Observable<BrowseImpactMatrixStateModel>;
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
        this.loadImpactTypePage();
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
    this.impactTypePage$ = this.store.select(ImpactLevelState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id))
    );
    this.page$ = this.store.select(ImpactMatrixState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          const sortedBcImpactLevelMatrixDtoList = u.bcImpactLevelMatrixDtoList
            ?.slice()
            .sort((a, b) => a.id - b.id);
          return {
            ...u,
            bcImpactLevelMatrixDtoList: sortedBcImpactLevelMatrixDtoList,
            actions: [
              {
                ...userActions[0],
                command: () => {
                  this.openDialog(u.bcImpactTypes.id);
                },
                disabled: !u.bcImpactTypes.isActive,
              },
            ],
          };
        })
      )
    );
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseImpactMatrixAction.ToggleDialog({ id: Id }));
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
      new BrowseImpactMatrixAction.LoadImpactMatrix({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  public loadImpactTypePage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactLevelMatrixAction.LoadImpactLevel({
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
