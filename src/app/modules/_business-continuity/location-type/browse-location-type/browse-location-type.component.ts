import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {MessageHelper} from "@core/helpers/message.helper";
import {ILangFacade} from "@core/facades/lang.facade";
import {debounceTime, filter, map, takeUntil, tap} from "rxjs/operators";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {BcLocationTypes} from "../../../../api/models/bc-location-types";
import {LocationTypeState, LocationTypeStateModel} from "@core/states/bc/location-type/locationType.state";
import {BrowseLocationTypeState} from "../states/browse-locationType.state";
import {BrowseLocationTypeAction} from "../states/browse-locationType.action";
import {BrowseBusinessContinuityState} from "../../states/browse-business-continuity.state";

@Component({
  selector: 'app-browse-location-type',
  templateUrl: './browse-location-type.component.html',
  styleUrls: ['./browse-location-type.component.scss']
})
export class BrowseLocationTypeComponent implements OnInit, OnDestroy {
  public page$: Observable<BcLocationTypes[]>;

  @Select(LocationTypeState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(LocationTypeState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseLocationTypeState.state)
  public state$: Observable<LocationTypeStateModel>;
  private destroy$ = new Subject();
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private messageHelper: MessageHelper,
  ) { }

  ngOnInit(): void {
    this.store
      .select(BrowseBusinessContinuityState.versionId)
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(200),
        tap((v) => {
            this.loadPage();
          }
        )
      )
      .subscribe();
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

    this.page$ = this.store.select(LocationTypeState.page).pipe(
      filter((p) => !!p),
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
              {
                ...userActions[1],
                command: () => {
                  this.activate(u.id);
                },
                disabled: u.isActive,
              },
            ],
          };
        })
      )
    );
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseLocationTypeAction.ToggleDialog({ id: Id }));
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
      new BrowseLocationTypeAction.LoadLocationType({
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
