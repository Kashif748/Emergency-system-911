import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {filter, map} from "rxjs/operators";
import {RecordsState} from "@core/states/bc-resources/records/records.state";
import {ILangFacade} from "@core/facades/lang.facade";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {BcResourcesRecords} from "../../../../../api/models/bc-resources-records";
import {BrowseRecordsState, BrowseRecordStateModel} from "../../records/states/browse-records.state";
import {BrowseRecordAction} from "../../records/states/browse-records.action";
import {Observable, Subject} from "rxjs";
import {MessageHelper} from "@core/helpers/message.helper";

@Component({
  selector: 'app-browse-others',
  templateUrl: './browse-others.component.html',
  styleUrls: ['./browse-others.component.scss']
})
export class BrowseOthersComponent implements OnInit {
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
    this.store.dispatch(
      new BrowseRecordAction.LoadRecords({
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
