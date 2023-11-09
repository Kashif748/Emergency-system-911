import {Component, OnDestroy, OnInit} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {MessageHelper} from "@core/helpers/message.helper";
import {StaffState} from "@core/states/bc-resources/staff/staff.state";
import {BrowseStaffState, BrowseStaffStateModel} from "../states/browse-staff.state";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {filter, map} from "rxjs/operators";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseStaffAction} from "../states/browse-staff.action";
import {BcResourcesStaffReq} from "../../../../../api/models/bc-resources-staff-req";
import {BrowseActivitySystemsAction} from "../../../activity-analysis/systems/states/browse-systems.action";

@Component({
  selector: 'app-browse-staff-req',
  templateUrl: './browse-staff-req.component.html',
  styleUrls: ['./browse-staff-req.component.scss']
})
export class BrowseStaffReqComponent implements OnInit, OnDestroy {
  public page$: Observable<BcResourcesStaffReq[]>;

  @Select(StaffState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(StaffState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseStaffState.state)
  public state$: Observable<BrowseStaffStateModel>;

  private destroy$ = new Subject();

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit(): void {
    const staffActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.DELETE'),
        icon: 'pi pi pi-trash',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(StaffState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...staffActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !u.isActive,
              },
              {
                ...staffActions[1],
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
      .dispatch(new BrowseStaffAction.Delete({ id }))
      .toPromise()
      .then(() => {
        this.loadPage();
      });
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseStaffAction.ToggleDialog({ staffId: id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    this.store.dispatch(
      new BrowseStaffAction.LoadStaff({
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
