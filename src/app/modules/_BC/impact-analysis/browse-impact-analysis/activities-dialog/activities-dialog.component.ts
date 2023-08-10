import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { Observable, Subject } from 'rxjs';
import {
  BcActivities,
  BcActivityAnalysisDto,
  BcCycles,
} from 'src/app/api/models';
import { Select } from '@ngxs/store';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { Store } from '@ngxs/store';
import { BrowseImpactAnalysisAction } from '../../states/browse-impact-analysis.action';
import { auditTime, map, takeUntil, tap } from 'rxjs/operators';
import { OrgActivityAction, OrgActivityState } from '@core/states';

@Component({
  selector: 'app-activities-dialog',
  templateUrl: './activities-dialog.component.html',
  styleUrls: ['./activities-dialog.component.scss'],
})
export class ActivitiesDialogComponent implements OnInit, OnDestroy {
  @Select(OrgActivityState.page)
  page$: Observable<BcActivities[]>;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  public opened$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  @Select(OrgActivityState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(OrgActivityState.loading)
  public loading$: Observable<boolean>;

  public name = '';
  private auditLoadPage$ = new Subject<string>();

  // @Select(ActivityLocationsState.blocking)
  // blocking$: Observable<boolean>;

  // @Select(BrowseLocationsState.state)
  // public state$: Observable<BrowseLocationsStateModel>;
  public selectedCycle: BcCycles;
  public selectedActivities: BcActivities[];

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'activities'),
      tap(() => {
        this.selectedActivities = null;
        this.selectedCycle = null;
      })
    );
    this.loadPage('', true);
    this.auditLoadPage$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new OrgActivityAction.LoadPage({
            page: 0,
            size: 100,
            filters: { name: search },
          })
        );
      });
  }
  submit() {
    if (!this.selectedActivities || !this.selectedCycle) {
      return;
    }
    let activities: BcActivityAnalysisDto[];
    activities = this.selectedActivities.map((activity) => {
      return {
        activityId: activity.id,
        cycleId: this.selectedCycle?.id,
      };
    });

    this.store.dispatch(
      new BrowseImpactAnalysisAction.SetCycleActivities(activities)
    );
  }
  loadPage(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new OrgActivityAction.LoadPage({
          page: 0,
          size: 100,
          filters: { name: this.name },
        })
      );
      return;
    }
    this.auditLoadPage$.next(search);
  }
  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'activities' })
    );
  }
  close() {
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
  }

  changeSelect(event){
    console.log(event);

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
