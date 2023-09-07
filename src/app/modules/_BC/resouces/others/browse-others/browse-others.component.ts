import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {filter, map} from "rxjs/operators";
import {ILangFacade} from "@core/facades/lang.facade";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {MessageHelper} from "@core/helpers/message.helper";
import {BcResourcesNonItInfrastructure} from "../../../../../api/models/bc-resources-non-it-infrastructure";
import {OtherState} from "@core/states/bc-resources/other/other.state";
import {BrowseOtherState, BrowseOtherStateModel} from "../states/browse-other.state";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseOtherAction} from "../states/browse-other.action";

@Component({
  selector: 'app-browse-others',
  templateUrl: './browse-others.component.html',
  styleUrls: ['./browse-others.component.scss']
})
export class BrowseOthersComponent implements OnInit, OnDestroy {
  public page$: Observable<BcResourcesNonItInfrastructure[]>;

  @Select(OtherState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(OtherState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseOtherState.state)
  public state$: Observable<BrowseOtherStateModel>;

  private destroy$ = new Subject();
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit(): void {
    const otherActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(OtherState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...otherActions[0],
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
    this.store.dispatch(new BrowseOtherAction.ToggleDialog({ otherId: id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    this.store.dispatch(
      new BrowseOtherAction.LoadOther({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        resourceId: resource.id,
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
