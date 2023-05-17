import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {RtoAction, RtoState} from "@core/states";
import {Observable, Subject} from "rxjs";
import {Store} from "@ngxs/store";
import {IAuthService} from "@core/services/auth.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {ActivatedRoute} from "@angular/router";
import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {FormUtils} from "@core/utils/form.utils";
import {ImpactLevelState} from "@core/states/bc/impact-level/impact-level.state";
import {BrowseImpactLevelAction} from "../../states/browse-impact-level.action";

@Component({
  selector: 'app-impact-level-dialog',
  templateUrl: './impact-level-dialog.component.html',
  styleUrls: ['./impact-level-dialog.component.scss']
})
export class ImpactLevelDialogComponent implements OnInit, OnDestroy {

  opened$: Observable<boolean>;

  public display = false;
  form: FormGroup;

  _Id: number;
  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }
  get editMode() {
    return this._Id !== undefined && this._Id !== null;
  }

  destroy$ = new Subject();

  @Input()
  set id(v: number) {
    this._Id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new RtoAction.GetRto({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ImpactLevelState.impactLevel)),
        takeUntil(this.destroy$),
        take(1),
        tap((impactLevel) => {
          this.form.patchValue({
            ...impactLevel,
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
    this.store.dispatch(new BrowseImpactLevelAction.ToggleDialog({ id: Id }));
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

  close() {
    this.store.dispatch(new BrowseImpactLevelAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const impactLevel = {
      ...this.form.getRawValue(),
    };

    impactLevel.versionId = 1;
    impactLevel.isActive = true;
    this.store.dispatch(new BrowseImpactLevelAction.CreateImpactLevel(impactLevel));

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
