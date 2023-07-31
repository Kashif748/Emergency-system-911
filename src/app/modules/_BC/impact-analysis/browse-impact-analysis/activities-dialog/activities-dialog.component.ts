import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { Observable } from 'rxjs';
import {
  BcActivities,
  BcActivityAnalysisDto,
  BcCycles,
} from 'src/app/api/models';
import { Select } from '@ngxs/store';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { Store } from '@ngxs/store';
import { BrowseImpactAnalysisAction } from '../../states/browse-impact-analysis.action';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-activities-dialog',
  templateUrl: './activities-dialog.component.html',
  styleUrls: ['./activities-dialog.component.scss'],
})
export class ActivitiesDialogComponent implements OnInit {
  @Select(ImpactAnalysisState.activities)
  page$: Observable<BcActivities[]>;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  public opened$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  // @Select(LocationsState.totalRecords)
  // public totalRecords$: Observable<number>;

  // @Select(LocationsState.loading)
  // public loading$: Observable<boolean>;

  // @Select(ActivityLocationsState.blocking)
  // blocking$: Observable<boolean>;

  // @Select(BrowseLocationsState.state)
  // public state$: Observable<BrowseLocationsStateModel>;
  public selectedCycle: BcCycles;
  public selectedActivities: BcActivities[];

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
    this.store.dispatch([
      new BrowseImpactAnalysisAction.LoadActivities({ page: 0, size: 100 }),
    ]);
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
  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'activities' })
    );
  }
  close() {
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
  }
}
