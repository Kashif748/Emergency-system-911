import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {ILangFacade} from "@core/facades/lang.facade";
import {MessageHelper} from "@core/helpers/message.helper";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {filter, map} from "rxjs/operators";
import {BrowseAppSystemState, BrowseAppSystemStateModel} from "../states/browse-app-system.state";
import {AppSystemState} from "@core/states/bc-resources/app-system/app-system.state";
import {BcResourcesAppAndSoftware} from "../../../../../api/models/bc-resources-app-and-software";
import {BrowseAppSystemAction} from "../states/browse-app-system.action";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseStaffAction} from "../../staff-requirement/states/browse-staff.action";

@Component({
  selector: 'app-browse-app-systems',
  templateUrl: './browse-app-systems.component.html',
  styleUrls: ['./browse-app-systems.component.scss']
})
export class BrowseAppSystemsComponent implements OnInit, OnDestroy {
  public page$: Observable<BcResourcesAppAndSoftware[]>;

  @Select(AppSystemState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(AppSystemState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseAppSystemState.state)
  public state$: Observable<BrowseAppSystemStateModel>;

  private destroy$ = new Subject();
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit(): void {
    const appSysActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.DELETE'),
        icon: 'pi pi pi-trash',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(AppSystemState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...appSysActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !u.isActive,
              },
              {
                ...appSysActions[1],
                command: () => {
                  this.delete(u.id);
                },
                disabled: !u.isActive,
              },
            ],
          };
        })
      )
    );
  }
  delete(id) {
    this.store
      .dispatch(new BrowseAppSystemAction.Delete({ id }))
      .toPromise()
      .then(() => {
        this.loadPage();
      });
  }
  openDialog(id?: number) {
    this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({ appSystemId: id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    this.store.dispatch(
      new BrowseAppSystemAction.LoadAppSys({
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
