import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "../../../../../shared/validators/generic-validators";
import {ILangFacade} from "@core/facades/lang.facade";
import {FormUtils} from "@core/utils/form.utils";
import {Select, Store} from "@ngxs/store";
import {BrowseRtoAction} from "../../states/browse-rto.action";
import {Observable, Subject} from "rxjs";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {IAuthService} from "@core/services/auth.service";
import {RtoAction, RtoState} from "@core/states";
import {BrowseBusinessContinuityState} from "../../../states/browse-business-continuity.state";

@Component({
  selector: 'app-rto-dialog',
  templateUrl: './rto-dialog.component.html',
  styleUrls: ['./rto-dialog.component.scss']
})
export class RtoDialogComponent implements OnInit, OnDestroy {

  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @Select(BrowseBusinessContinuityState.versionId)
  versionID$: Observable<number>

  public display = false;
  form: FormGroup;

  _rtoId: number;
  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }
  get editMode() {
    return this._rtoId !== undefined && this._rtoId !== null;
  }

  destroy$ = new Subject();

  @Input()
  set rtoId(v: number) {
    this._rtoId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new RtoAction.GetRto({ id: v }))
      .pipe(
        switchMap(() => this.store.select(RtoState.rto)),
        takeUntil(this.destroy$),
        take(1),
        tap((rto) => {
          this.form.patchValue({
            ...rto,
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
        this.rtoId = id;
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

  openDialog(id?: number) {
    this.store.dispatch(new BrowseRtoAction.ToggleDialog({ rtoId: id }));
  }

  buildForm() {
    this.form = this.formBuilder.group({
      criticalityEn: [null, [Validators.required, GenericValidators.english]],
      criticalityAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      descriptionEn: [null, [Validators.required, GenericValidators.english]],
      descriptionAr: [null, [Validators.required, GenericValidators.arabic]],
      isActive: [true]
    });
  }

  close() {
    this.store.dispatch(new BrowseRtoAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const rto = {
      ...this.form.getRawValue(),
    };

    /*rto.versionId = this.versionID$.pipe(
      tap((v) => {
        return v;
      })
    ).subscribe();*/
    // rto.isActive = true;
    // this.store.dispatch(new BrowseRtoAction.CreateRto(rto));

    if (this.editMode) {
      rto.id = this._rtoId;
      this.store.dispatch(new BrowseRtoAction.UpdateRto(rto));
    } else {
      this.store.dispatch(new BrowseRtoAction.CreateRto(rto));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
