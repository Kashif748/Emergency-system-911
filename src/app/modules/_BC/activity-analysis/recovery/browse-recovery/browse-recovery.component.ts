import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import {
  ActivityPrioritySeqAction,
  ActivityPrioritySeqState,
} from '@core/states';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Bcrto } from 'src/app/api/models';
import { BrowseActivityAnalysisAction } from '../../states/browse-activity-analysis.action';
import { ActivityAnalysisStatusAction } from '../../../../../api/models/activity-analysis-status-action';

@Component({
  selector: 'app-browse-recovery',
  templateUrl: './browse-recovery.component.html',
  styleUrls: ['./browse-recovery.component.scss'],
})
export class BrowseRecoveryComponent implements OnInit, OnDestroy {
  @Select(ActivityPrioritySeqState.page)
  public prioritySeq$: Observable<boolean>;

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  @Select(ActivityAnalysisState.loading)
  public loading$: Observable<boolean>;

  @Select(ActivityAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  public impactAnalysisRes$: Observable<Bcrto>;
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    if (cycle) {
      this.store.dispatch(
        new ActivityPrioritySeqAction.LoadPage({
          page: 0,
          size: 100,
          versionId: cycle.versionId,
        })
      );
    }

    this.store
      .select(ActivityAnalysisState.activityAnalysis)
      .pipe(
        filter((p) => !!p),
        takeUntil(this.destroy$),
        tap((activity) => {
          this.form.patchValue(activity);
        })
      )
      .subscribe();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      recoveryPriority: [null, [Validators.required]],
      capacity: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      spof: [null, [Validators.required]],
      skills: [null, [Validators.required]],
      rto: [''],
      remote: [true],
    });
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const activity = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );

    const activityAnalysis = {
      ...activity,
      ...this.form.getRawValue(),
    };

    this.store.dispatch(
      new BrowseActivityAnalysisAction.Update(activityAnalysis)
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
