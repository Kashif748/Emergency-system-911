import { Component, OnInit } from '@angular/core';
import {BrowseRtoAction} from "../../rto/states/browse-rto.action";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {RtoState} from "@core/states/bc/rto/rto.state";
import {filter, map} from "rxjs/operators";
import {MessageHelper} from "@core/helpers/message.helper";
import {TranslateService} from "@ngx-translate/core";
import {Select, Store} from "@ngxs/store";
import {ILangFacade} from "@core/facades/lang.facade";
import {Observable} from "rxjs";
import {BcWorkImportanceLevels} from "../../../../api/models/bc-work-importance-levels";
import {ImpLevelWorkingState} from "@core/states/bc/imp-level-working/imp-level-working.state";
import {BrowseImpLevelWorkingState, BrowseImpLevelWorkingStateModel} from "./states/browse-imp-level-working.state";
import {BrowseImpLevelWorkingAction} from "./states/browse-imp-level-working.action";

@Component({
  selector: 'app-browse-imp-level-working',
  templateUrl: './browse-imp-level-working.component.html',
  styleUrls: ['./browse-imp-level-working.component.scss']
})
export class BrowseImpLevelWorkingComponent implements OnInit {

  public page$: Observable<BcWorkImportanceLevels[]>;

  @Select(ImpLevelWorkingState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpLevelWorkingState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpLevelWorkingState.state)
  public state$: Observable<BrowseImpLevelWorkingStateModel>;

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private messageHelper: MessageHelper,
  ) { }

  ngOnInit(): void {
    /*this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
        this.changeView('CARDS');
      });*/
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

  openDialog(id?: number) {
    // this.store.dispatch(new BrowseUsersAction.ToggleDialog({ userId: id }));
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
      new BrowseImpLevelWorkingAction.LoadImpLevelWorking({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
