import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {MessageHelper} from "@core/helpers/message.helper";
import {ILangFacade} from "@core/facades/lang.facade";
import {filter, map} from "rxjs/operators";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";
import {ActivityFrquencyState} from "@core/states/bc/activity-frquency/activity-frquency.state";
import {BrowseActivityFrquencyState, BrowseActivityFrquencyStateModel} from "../states/browse-activity-frquency.state";
import {BrowseActivityFrquencyAction} from "../states/browse-activity-frquency.action";
import {ImpLevelWorkingState} from "@core/states/bc/imp-level-working/imp-level-working.state";

@Component({
  selector: 'app-browse-activity-frquency',
  templateUrl: './browse-activity-frquency.component.html',
  styleUrls: ['./browse-activity-frquency.component.scss']
})
export class BrowseActivityFrquencyComponent implements OnInit {
  public page$: Observable<BcActivityFrequencies[]>;

  @Select(ActivityFrquencyState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ActivityFrquencyState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseActivityFrquencyState.state)
  public state$: Observable<BrowseActivityFrquencyStateModel>;
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private messageHelper: MessageHelper,
  ) { }

  ngOnInit(): void {
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

    this.page$ = this.store.select(ActivityFrquencyState.page).pipe(
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
                // disabled: !u.isActive,
              },
              {
                ...userActions[1],
                command: () => {
                  this.activate(u.id);
                },
                // disabled: u.isActive,
              },
            ],
          };
        })
      )
    );
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseActivityFrquencyAction.ToggleDialog({ id: Id }));
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

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityFrquencyAction.LoadActivityFrquency({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }

}