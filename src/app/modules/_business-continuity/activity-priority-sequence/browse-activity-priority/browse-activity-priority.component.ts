import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageHelper} from "@core/helpers/message.helper";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {Select, Store} from "@ngxs/store";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {debounceTime, filter, map, takeUntil, tap} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {BcRecoveryPriorities} from "../../../../api/models/bc-recovery-priorities";
import {ActivityPrioritySeqState} from "@core/states/bc/activity-priority-seq/activity-priority-seq.state";
import {BrowseActivityPrioritySeqState, BrowseActivityPrioritySeqStateModel} from "../states/browse-activity-priority-seq.state";
import {BrowseActivityPrioritySeqAction} from "../states/browse-activity-priority-seq.action";
import {ActivityFrquencyState} from "@core/states/bc/activity-frquency/activity-frquency.state";
import {BrowseBusinessContinuityState} from "../../states/browse-business-continuity.state";

@Component({
  selector: 'app-browse-activity-priority',
  templateUrl: './browse-activity-priority.component.html',
  styleUrls: ['./browse-activity-priority.component.scss']
})
export class BrowseActivityPriorityComponent implements OnInit, OnDestroy {

  public page$: Observable<BcRecoveryPriorities[]>;

  @Select(ActivityPrioritySeqState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ActivityPrioritySeqState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseActivityPrioritySeqState.state)
  public state$: Observable<BrowseActivityPrioritySeqStateModel>;

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

    this.page$ = this.store.select(ActivityPrioritySeqState.page).pipe(
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
    this.store.dispatch(new BrowseActivityPrioritySeqAction.ToggleDialog({ id: Id }));
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
      new BrowseActivityPrioritySeqAction.LoadActivityPrioritySeq({
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
