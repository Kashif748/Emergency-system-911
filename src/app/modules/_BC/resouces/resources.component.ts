import {Component, OnInit} from '@angular/core';
import {TABS} from "../resouces/tempData.conts";
import {filter, map, takeUntil, tap} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {BrowseResourceAction} from "./states/browse-resource.action";
import {BrowseResourceState} from "./states/browse-resource.state";
import {ILangFacade} from "@core/facades/lang.facade";
import {BrowseActivityAnalysisAction} from "../activity-analysis/states/browse-activity-analysis.action";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.components.scss'],
})
export class ResourcesComponent implements OnInit {
  tabs = TABS;


  @Select(BrowseResourceState.tabIndex)
  public tabIndex$: Observable<any>;

  public dir$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );
  private destroy$ = new Subject();
  constructor(
    private lang: ILangFacade,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store) {
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
        this.router.navigate(
          ['bc/resources/' + this.tabs[index].router],
          {
            queryParamsHandling: 'merge',
          }
        );
      });
  }
}
