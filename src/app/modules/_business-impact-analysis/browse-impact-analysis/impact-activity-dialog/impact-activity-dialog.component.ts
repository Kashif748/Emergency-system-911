import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TranslateService } from '@ngx-translate/core';
import { ImpactAnalysisDialogComponent } from '../impact-analysis-dialog/impact-analysis-dialog.component';
import { Dialog } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { BrowseTasksAction } from '../../../_task-mgmt/states/browse-tasks.action';
import { ILangFacade } from '@core/facades/lang.facade';
import { Observable } from 'rxjs';
import {
  BcActivities,
  BcActivityAnalysisDto,
  BcLocations,
  PageBcActivities,
} from 'src/app/api/models';
import { Select } from '@ngxs/store';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { Store } from '@ngxs/store';
import { BrowseImpactAnalysisAction } from '../../states/browse-impact-analysis.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-impact-activity-dialog',
  templateUrl: './impact-activity-dialog.component.html',
  styleUrls: ['./impact-activity-dialog.component.scss'],
})
export class ImpactActivityDialogComponent implements OnInit {
  @Select(ImpactAnalysisState.activities)
  page$: Observable<BcActivities[]>;

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

  public selectedActivities: BcActivities[];

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'activities')
    );
    this.store.dispatch([
      new BrowseImpactAnalysisAction.LoadActivities({ page: 0, size: 100 }),
    ]);
  }
  submit() {
    if (!this.selectedActivities) {
      return;
    }
    console.log(this.selectedActivities);

    let activities: BcActivityAnalysisDto[];
    activities = this.selectedActivities.map((activity) => {
      return {
        activityId: activity.id,
        cycleId: 3,
      };
    });

    this.store.dispatch(
      new BrowseImpactAnalysisAction.SetCycleActivities(activities)
    );

    // if (this.editMode) {
    //   (this.currentLocation.id = this._locationId),
    //     this.store.dispatch(
    //       new BrowseActivityLocationsAction.Update(this.currentLocation)
    //     );
    // } else {
    //   this.store.dispatch(
    //     new BrowseActivityLocationsAction.Create(this.currentLocation)
    //   );
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
