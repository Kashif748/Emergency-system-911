import {Component, OnDestroy, OnInit} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {MessageHelper} from "@core/helpers/message.helper";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {filter, map} from "rxjs/operators";
import {BcResourcesRemoteWork} from "../../../../../api/models/bc-resources-remote-work";
import {RemoteWorkState} from "@core/states/bc-resources/remote-work/remote-work.state";
import {BrowseRemoteWorkState, BrowseRemoteWorkStateModel} from "../states/browse-remote-work.state";
import {BrowseRemoteWorkAction} from "../states/browse-remote-work.action";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";

@Component({
  selector: 'app-browse-remote-work',
  templateUrl: './browse-remote-work.component.html',
  styleUrls: ['./browse-remote-work.component.scss']
})
export class BrowseRemoteWorkComponent implements OnInit, OnDestroy {
  public page$: Observable<BcResourcesRemoteWork[]>;

  @Select(RemoteWorkState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(RemoteWorkState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseRemoteWorkState.state)
  public state$: Observable<BrowseRemoteWorkStateModel>;

  private destroy$ = new Subject();

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit(): void {
    const remoteWorkActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(RemoteWorkState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...remoteWorkActions[0],
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
    this.store.dispatch(new BrowseRemoteWorkAction.ToggleDialog({ remoteWorkId: id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    this.store.dispatch(
      new BrowseRemoteWorkAction.LoadRemoteWork({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        resourceId: resource?.id,
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
