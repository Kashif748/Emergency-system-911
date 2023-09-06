import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {filter, map} from "rxjs/operators";
import {ILangFacade} from "@core/facades/lang.facade";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {MessageHelper} from "@core/helpers/message.helper";
import {BcResourcesItInfrastructure} from "../../../../../api/models/bc-resources-it-infrastructure";
import {BrowseInfraState, BrowseInfraStateModel} from "../states/browse-infra.state";
import {InfraState} from "@core/states/bc-resources/infra-req/infra.state";
import {BrowseInfraAction} from "../states/browse-infra.action";

@Component({
  selector: 'app-browse-infra-req',
  templateUrl: './browse-infra-req.component.html',
  styleUrls: ['./browse-infra-req.component.scss']
})
export class BrowseInfraReqComponent implements OnInit, OnDestroy {
  public page$: Observable<BcResourcesItInfrastructure[]>;

  @Select(InfraState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(InfraState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseInfraState.state)
  public state$: Observable<BrowseInfraStateModel>;

  private destroy$ = new Subject();
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit(): void {
    const infraActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(InfraState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...infraActions[0],
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
  openDialog(id?: number) {
    this.store.dispatch(new BrowseInfraAction.ToggleDialog({ infraId: id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseInfraAction.LoadInfra({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        resourceId: 1,
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
