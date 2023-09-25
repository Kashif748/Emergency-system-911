import {Component, OnInit} from '@angular/core';
import {TABS} from '../resouces/tempData.conts';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {BrowseResourceAction} from './states/browse-resource.action';
import {BrowseResourceState} from './states/browse-resource.state';
import {ILangFacade} from '@core/facades/lang.facade';
import {BcCycles} from '../../../api/models';
import {RESOURCE_STATUSES, ResourceAnalysisState} from '@core/states/impact-analysis/resource-analysis.state';
import {BcResources} from '../../../api/models/bc-resources';
import {BcResourcesChangeStatusDto} from '../../../api/models/bc-resources-change-status-dto';
import {ActivityAnalysisState} from "@core/states/activity-analysis/activity-analysis.state";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.components.scss'],
})
export class ResourcesComponent implements OnInit {
  tabs = TABS;
  RESOURCE_STATUSES = RESOURCE_STATUSES;
  @Select(ResourceAnalysisState.cycle)
  public cycle$: Observable<BcCycles>;

  @Select(ResourceAnalysisState.resourceAnalysis)
  public resourceAnalysis$: Observable<BcResources>;

  @Select(ResourceAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  @Select(BrowseResourceState.tabIndex)
  public tabIndex$: Observable<any>;

  public dir$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );
  public icon$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) =>
      key === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'
    )
  );
  newStatus: BcResourcesChangeStatusDto;
  displayNote = false;
  notes = '';

  private destroy$ = new Subject();
  constructor(
    private lang: ILangFacade,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store
  ) {
    activeRoute.url
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!activeRoute.snapshot?.firstChild),
        tap(() => {
          const params = activeRoute.snapshot.firstChild?.queryParams;
          const path = activeRoute.snapshot.firstChild.routeConfig?.path;
          const index = this.tabs.findIndex((item) => item.router == path);
          this.store.dispatch([
            new BrowseResourceAction.GetResourceAnalysis({
              id: params['_resource'],
            }),
            new BrowseResourceAction.GetCycle({
              id: params['_cycle'],
            }),
            new BrowseResourceAction.ChangeTab({
              index,
            }),
          ]);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    console.log(this.tabs);
  }
  changeTab(index: number) {
    this.store
      .dispatch([
        new BrowseResourceAction.ChangeTab({
          index,
        }),
      ])
      .toPromise()
      .then(() => {
        this.router.navigate(['bc/resources/' + this.tabs[index].router], {
          queryParamsHandling: 'merge',
        });
      });
  }

/*  changeStatus(id, status: RESOURCE_STATUSES) {
    const newStatus: BcResourcesChangeStatusDto = {
      resourceId: id,
      statusId: status,
      notes: '',
    };
    this.store.dispatch([new BrowseResourceAction.ChangeStatus(newStatus)]);
  }*/

  changeStatus(id, action) {
    this.newStatus = {
      resourceId: id,
      actionId: action?.id,
      notes: '',
    };
    if (action.requiresNote == 'true') {
      this.displayNote = true;
      return;
    } else {
      this.applyStatus();
    }
  }

  applyStatus() {
    this.newStatus = {
      ...this.newStatus,
      notes: this.notes,
    };
    this.store
      .dispatch([new BrowseResourceAction.ChangeStatus(this.newStatus)])
      .toPromise()
      .then(() => {
        this.displayNote = false;
      });
  }
}
