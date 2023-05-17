import { Component, OnInit } from '@angular/core';
import {BrowseRtoState, BrowseRtoStateModel} from "../../rto/states/browse-rto.state";
import {RtoState} from "@core/states/bc/rto/rto.state";
import {Bcrto} from "../../../../api/models/bcrto";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {MessageHelper} from "@core/helpers/message.helper";
import {ILangFacade} from "@core/facades/lang.facade";
import {filter, map} from "rxjs/operators";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {BrowseRtoAction} from "../../rto/states/browse-rto.action";

@Component({
  selector: 'app-browse-org-detail',
  templateUrl: './browse-org-detail.component.html',
  styleUrls: ['./browse-org-detail.component.scss']
})
export class BrowseOrgDetailComponent implements OnInit {
/*  public page$: Observable<Bcrto[]>;

  @Select(RtoState.totalRecords)
  public totalRecords$: Observable<number>;*/

/*  @Select(RtoState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseRtoState.state)
  public state$: Observable<BrowseRtoStateModel>;*/
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private messageHelper: MessageHelper,
  ) { }

  ngOnInit(): void {
    /*const userActions = [
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

/*  openDialog(id?: number) {
    this.store.dispatch(new BrowseRtoAction.ToggleDialog({ rtoId: id }));
  }*/

/*  activate(id: number) {
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
  }*/

/*  public loadPage(event: any) {
    this.store.dispatch(
      new BrowseRtoAction.LoadRto({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }*/

}
