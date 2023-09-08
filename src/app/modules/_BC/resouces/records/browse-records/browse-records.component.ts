import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {BcResourcesRecords} from "../../../../../api/models/bc-resources-records";
import {RecordsState} from "@core/states/bc-resources/records/records.state";
import {BrowseRecordsState, BrowseRecordStateModel} from "../states/browse-records.state";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {ILangFacade} from "@core/facades/lang.facade";
import {MessageHelper} from "@core/helpers/message.helper";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {filter, map} from "rxjs/operators";
import {BrowseRecordAction} from "../states/browse-records.action";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";

@Component({
  selector: 'app-browse-records',
  templateUrl: './browse-records.component.html',
  styleUrls: ['./browse-records.component.scss']
})
export class BrowseRecordsComponent implements OnInit, OnDestroy {
  public page$: Observable<BcResourcesRecords[]>;

  @Select(RecordsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(RecordsState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseRecordsState.state)
  public state$: Observable<BrowseRecordStateModel>;

  private destroy$ = new Subject();
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit(): void {
    const recordActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(RecordsState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...recordActions[0],
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
    this.store.dispatch(new BrowseRecordAction.ToggleDialog({ recordId: id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    this.store.dispatch(
      new BrowseRecordAction.LoadRecords({
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
