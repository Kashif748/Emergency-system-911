import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ImpactMatrixAction, RtoAction, RtoState} from "@core/states";
import {Store} from "@ngxs/store";
import {IAuthService} from "@core/services/auth.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {ActivatedRoute} from "@angular/router";
import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {FormUtils} from "@core/utils/form.utils";
import {BrowseImpactMatrixAction} from "../../states/browse-impact-matrix.action";
import {ImpactMatrixState} from "@core/states/bc/impact-matrix/impact-matrix.state";

@Component({
  selector: 'app-impact-matrix-dialog',
  templateUrl: './impact-matrix-dialog.component.html',
  styleUrls: ['./impact-matrix-dialog.component.scss']
})
export class ImpactMatrixDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

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
  set Id(v: number) {
    this._Id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new ImpactMatrixAction.GetImpactMatrix({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ImpactMatrixState.impactMatrix)),
        takeUntil(this.destroy$),
        take(1),
        tap((impactMatrix) => {
          this.form.patchValue({
            ...impactMatrix,
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
        this.Id = id;
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
    this.store.dispatch(new BrowseImpactMatrixAction.ToggleDialog({ id: Id }));
  }

  buildForm() {
    this.form = this.formBuilder.group({
      typeEn: [null, [Validators.required, GenericValidators.english]],
      typeAr: [null, [Validators.required, GenericValidators.arabic]],

      lowDescEn: [null, [Validators.required, GenericValidators.english]],
      lowDescAr: [null, [Validators.required, GenericValidators.arabic]],

      mediumDescEn: [null, [Validators.required, GenericValidators.english]],
      mediumDescAr: [null, [Validators.required, GenericValidators.arabic]],

      highDescEn: [null, [Validators.required, GenericValidators.english]],
      highDescAr: [null, [Validators.required, GenericValidators.arabic]],
      isActive: [true]
    });
  }

  close() {
    this.store.dispatch(new BrowseImpactMatrixAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const impactMartix = {
      ...this.form.getRawValue(),
    };

    impactMartix.versionId = 1;
    // rto.isActive = true;
    // this.store.dispatch(new BrowseRtoAction.CreateRto(rto));

    if (this.editMode) {
      impactMartix.id = this._Id;
      this.store.dispatch(new BrowseImpactMatrixAction.UpdateImpactMatrix(impactMartix));
    } else {
      this.store.dispatch(new BrowseImpactMatrixAction.CreateImpactMatrix(impactMartix));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
