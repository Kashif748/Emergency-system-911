import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {Observable, Subject} from "rxjs";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {LocationTypeAction, RtoState} from "@core/states";
import {Store} from "@ngxs/store";
import {IAuthService} from "@core/services/auth.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {ActivatedRoute} from "@angular/router";
import {FormUtils} from "@core/utils/form.utils";
import {BrowseLocationTypeAction} from "../../states/browse-locationType.action";
import {LocationTypeState} from "@core/states/bc/location-type/locationType.state";

@Component({
  selector: 'app-location-type-dialog',
  templateUrl: './location-type-dialog.component.html',
  styleUrls: ['./location-type-dialog.component.scss']
})
export class LocationTypeDialogComponent implements OnInit, OnDestroy {

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
  set Id(v: number) {
    this._id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new LocationTypeAction.GetLocationType({ id: v }))
      .pipe(
        switchMap(() => this.store.select(LocationTypeState.locationType)),
        takeUntil(this.destroy$),
        take(1),
        tap((locationType) => {
          this.form.patchValue({
            ...locationType,
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
    this.store.dispatch(new BrowseLocationTypeAction.ToggleDialog({ id: Id }));
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      isActive: [true]
    });
  }

  close() {
    this.store.dispatch(new BrowseLocationTypeAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const locationType = {
      ...this.form.getRawValue(),
    };

    locationType.versionId = 1;
    // locationType.isActive = true;
    // this.store.dispatch(new BrowseLocationTypeAction.CreateLocationType(locationType));

    if (this.editMode) {
      locationType.id = this._id;
      this.store.dispatch(new BrowseLocationTypeAction.UpdateLocationType(locationType));
    } else {
      this.store.dispatch(new BrowseLocationTypeAction.CreateLocationType(locationType));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
