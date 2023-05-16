import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {IAuthService} from "@core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {ILangFacade} from "@core/facades/lang.facade";
import {ActivityFrquencyAction} from "@core/states";
import {Observable, Subject} from "rxjs";
import {ActivityFrquencyState} from "@core/states/bc/activity-frquency/activity-frquency.state";
import {BrowseActivityFrquencyAction} from "../../states/browse-activity-frquency.action";
import {FormUtils} from "@core/utils/form.utils";

@Component({
  selector: 'app-activity-frquency-dialog',
  templateUrl: './activity-frquency-dialog.component.html',
  styleUrls: ['./activity-frquency-dialog.component.scss']
})
export class ActivityFrquencyDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  public display = false;
  form: FormGroup;

  _id: number;
  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }
  get editMode() {
    return this._id !== undefined && this._id !== null;
  }

  destroy$ = new Subject();


  @Input()
  set id(v: number) {
    this._id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new ActivityFrquencyAction.GetActivityFrq({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ActivityFrquencyState.activityFrq)),
        takeUntil(this.destroy$),
        take(1),
        tap((activityFrq) => {
          this.form.patchValue({
            ...activityFrq,
          });
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.id = id;
      });

    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly'),
      tap((v) => {
        if (this.form) {
          try {
            if (v) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          } catch {}
        }
      })
    );
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
  }
  openDialog(Id?: number) {
    this.store.dispatch(new BrowseActivityFrquencyAction.ToggleDialog({ id: Id }));
  }


  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      isActive: [true]
    });
  }

  close() {
    this.store.dispatch(new BrowseActivityFrquencyAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const activityFrquency = {
      ...this.form.getRawValue(),
    };

    activityFrquency.versionId = 1;
    // activityFrquency.isActive = true;


    if (this.editMode) {
      activityFrquency.id = this._id;
      this.store.dispatch(new BrowseActivityFrquencyAction.UpdateActivityFrquency(activityFrquency));
    } else {
      this.store.dispatch(new BrowseActivityFrquencyAction.CreateActivityFrquency(activityFrquency));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
