import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {MessageHelper} from "@core/helpers/message.helper";
import {ILangFacade} from "@core/facades/lang.facade";
import {filter, isEmpty, map} from "rxjs/operators";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {BrowseImpactLevelAction,} from "../states/browse-impact-level.action";
import {ImpactLevelState} from "@core/states/bc/impact-level/impact-level.state";
import {BcImpactLevel} from "../../../../api/models/bc-impact-level";
import {BrowseImpactLevelState, BrowseImpactLevelStateModel} from "../states/browse-impact-level.state";
import {DATA} from "../../tabs.const";

@Component({
  selector: 'app-browse-impact-level',
  templateUrl: './browse-impact-level.component.html',
  styleUrls: ['./browse-impact-level.component.scss']
})
export class BrowseImpactLevelComponent implements OnInit {
  public page$: Observable<BcImpactLevel[]>;

  @Select(ImpactLevelState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpactLevelState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpactLevelState.state)
  public state$: Observable<BrowseImpactLevelStateModel>;
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

    const impactLevels: BcImpactLevel[] = DATA.impactLevels;

    this.page$ = this.store.select(ImpactLevelState.page)
      .pipe(
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

    this.page$.pipe(
      map(items => items.length)
    ).subscribe(length => {
      if (length === 0) {
        this.page$ = of(impactLevels);
      }
    });
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseImpactLevelAction.ToggleDialog({ id: Id }));
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
      new BrowseImpactLevelAction.LoadImpactLevel({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }

}
