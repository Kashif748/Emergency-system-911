import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormUtils} from "@core/utils/form.utils";
import {Observable, Subject} from "rxjs";
import {IAuthService} from "@core/services/auth.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ImpLevelWorkingAction} from "@core/states";
import {ImpLevelWorkingState} from "@core/states/bc/imp-level-working/imp-level-working.state";
import {BrowseImpLevelWorkingAction} from "../states/browse-imp-level-working.action";

@Component({
  selector: 'app-imp-level-working-dialog',
  templateUrl: './imp-level-working-dialog.component.html',
  styleUrls: ['./imp-level-working-dialog.component.scss']
})
export class ImpLevelWorkingDialogComponent implements OnInit, OnDestroy {

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
  set workingId(v: number) {
    this._id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new ImpLevelWorkingAction.GetImpLevelWorking({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ImpLevelWorkingState.ImpLevelWorking)),
        takeUntil(this.destroy$),
        take(1),
        tap((ImpLevelWorking) => {
          this.form.patchValue({
            ...ImpLevelWorking,
          });
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
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
        this._id = id;
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      criticalityEn: [null, [Validators.required, GenericValidators.english]],
      criticalityAr: [null, [Validators.required, GenericValidators.arabic]],
      levelEn: [null, [Validators.required, GenericValidators.english]],
      levelAr: [null, [Validators.required, GenericValidators.arabic]],
      descEn: [null, [Validators.required, GenericValidators.english]],
      descAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseImpLevelWorkingAction.ToggleDialog({ id: Id }));
  }


  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const impLevelWorking = {
      ...this.form.getRawValue(),
    };

    impLevelWorking.versionId = 1;
    impLevelWorking.isActive = true;
    this.store.dispatch(new BrowseImpLevelWorkingAction.CreateImpLevelWorking(impLevelWorking));

    /*if (this.editMode) {
      this.store.dispatch(new BrowseUsersAction.UpdateUser(user));
    } else {
      this.store.dispatch(new BrowseUsersAction.CreateUser(user));
    }*/
  }

  close() {
    this.store.dispatch(new BrowseImpLevelWorkingAction.ToggleDialog({}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
