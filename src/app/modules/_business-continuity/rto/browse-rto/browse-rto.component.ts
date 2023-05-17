import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {Bcrto} from "../../../../api/models/bcrto";
import {RtoState} from "@core/states/bc/rto/rto.state";
import {BrowseRtoState, BrowseRtoStateModel} from "../states/browse-rto.state";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {filter, map, takeUntil} from "rxjs/operators";
import {MessageHelper} from "@core/helpers/message.helper";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {BrowseRtoAction} from "../states/browse-rto.action";

@Component({
  selector: 'app-browse-rto',
  templateUrl: './browse-rto.component.html',
  styleUrls: ['./browse-rto.component.scss']
})
export class BrowseRtoComponent implements OnInit {
  public page$: Observable<Bcrto[]>;

  @Select(RtoState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(RtoState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseRtoState.state)
  public state$: Observable<BrowseRtoStateModel>;

/*  public exportActions = [
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_XLSX'),
      icon: 'pi pi-file-excel',
      command: () => this.export('EXCEL'),
    },
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_PDF'),
      icon: 'pi pi-file-pdf',
      command: () => this.export('PDF'),
    },
  ] as MenuItem[];*/

  public columns = [
    /*{ name: 'SHARED.USERNAME', code: 'userName', disabled: true },
    {
      name: 'USER_MANAGEMENT.USERS.NAME_AR',
      code: 'nameAr',
    },
    {
      name: 'USER_MANAGEMENT.USERS.NAME_EN',
      code: 'nameEn',
    },
    { name: 'SHARED.ORG', code: 'org' },
    { name: 'USER_MANAGEMENT.EMIRATES_ID', code: 'emiratesId' },
    { name: 'SHARED.JOB_TITLE', code: 'title' },
    { name: 'USER_MANAGEMENT.ROLE', code: 'role' },*/
  ];


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

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseRtoAction.LoadRto({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }

}
