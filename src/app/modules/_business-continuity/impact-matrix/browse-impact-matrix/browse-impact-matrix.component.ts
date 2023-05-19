import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {MessageHelper} from "../../../../core/helpers/message.helper";
import {ILangFacade} from "../../../../core/facades/lang.facade";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {filter, map} from "rxjs/operators";
import {BcImpactTypesMatrix} from "../../../../api/models/bc-impact-types-matrix";
import {BrowseImpactMatrixState, BrowseImpactMatrixStateModel} from "../states/browse-impact-matrix.state";
import {ImpactMatrixState} from "@core/states/bc/impact-matrix/impact-matrix.state";
import {BrowseImpactMatrixAction} from "../states/browse-impact-matrix.action";
import {BcImpactLevel} from "../../../../api/models/bc-impact-level";
import {ImpactLevelState} from "@core/states/bc/impact-level/impact-level.state";
import {BrowseImpactLevelAction} from "../../impact-level/states/browse-impact-level.action";

@Component({
  selector: 'app-browse-impact-matrix',
  templateUrl: './browse-impact-matrix.component.html',
  styleUrls: ['./browse-impact-matrix.component.scss']
})
export class BrowseImpactMatrixComponent implements OnInit {
  public page$: Observable<BcImpactTypesMatrix[]>;
  public impactTypePage$: Observable<BcImpactLevel[]>;

  @Select(ImpactMatrixState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpactMatrixState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpactMatrixState.state)
  public state$: Observable<BrowseImpactMatrixStateModel>;
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
    this.impactTypePage$ = this.store.select(ImpactLevelState.page);
    /*this.page$ = this.store.select(ImpactMatrixState.page)
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
    );*/
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
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactMatrixAction.LoadImpactMatrix({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }

  public loadImpactTypePage(event: LazyLoadEvent) {
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
