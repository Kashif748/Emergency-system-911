import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {Observable, Subject} from "rxjs";
import {IAuthService} from "@core/services/auth.service";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {RtoAction, RtoState} from "@core/states";
import {Store} from "@ngxs/store";
import {FormUtils} from "@core/utils/form.utils";
import {ActivityPrioritySeqAction} from "@core/states/bc/activity-priority-seq/activity-priority-seq.action";
import {ActivityPrioritySeqState} from "@core/states/bc/activity-priority-seq/activity-priority-seq.state";
import {BrowseActivityPrioritySeqAction} from "../../states/browse-activity-priority-seq.action";

@Component({
  selector: 'app-activity-priority-dialog',
  templateUrl: './activity-priority-dialog.component.html',
  styleUrls: ['./activity-priority-dialog.component.scss']
})
export class ActivityPriorityDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;

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
  set _Id(v: number) {
    this._id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new ActivityPrioritySeqAction.GetActivityPrioritySeq({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ActivityPrioritySeqState.singleActivity)),
        takeUntil(this.destroy$),
        take(1),
        tap((singleActivity) => {
          this.form.patchValue({
            ...singleActivity,
          });
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private auth: IAuthService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this._Id = id;
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseActivityPrioritySeqAction.ToggleDialog({ id: Id }));
  }


  buildForm() {
    this.form = this.formBuilder.group({
      priEn: [null, [Validators.required, GenericValidators.english]],
      priAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }

  close() {
    this.store.dispatch(new BrowseActivityPrioritySeqAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const activityPriority = {
      ...this.form.getRawValue(),
    };

    activityPriority.versionId = 1;
    activityPriority.isActive = true;
    this.store.dispatch(new BrowseActivityPrioritySeqAction.CreateActivityPrioritySeq(activityPriority));

    /*if (this.editMode) {
      this.store.dispatch(new BrowseUsersAction.UpdateUser(user));
    } else {
      this.store.dispatch(new BrowseUsersAction.CreateUser(user));
    }*/
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
