import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDataState } from '@core/states';
import { SituationsAction } from '@core/states/situations/situations.action';
import { SituationsState } from '@core/states/situations/situations.state';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SituationProjection } from 'src/app/api/models';
import { BrowseSituationsAction } from '../../states/browse-situations.action';

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation-dialog.component.html',
  styleUrls: ['./situation-dialog.component.scss'],
})
export class SituationDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;

  @Select(CommonDataState.newsTypes)
  public newsTypes$: Observable<any[]>;

  @Select(SituationsState.blocking)
  blocking$: Observable<boolean>;

  form: FormGroup;

  get editMode() {
    return this._situationId !== undefined && this._situationId !== null;
  }

  _situationId: number;
  @Input()
  set situationId(v: number) {
    this._situationId = v;
    this.buildForm();

    this.store
      .dispatch(new SituationsAction.GetSituation({ id: v }))
      .pipe(
        switchMap(() => this.store.select(SituationsState.situation)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((t: SituationProjection) => {
          this.form.patchValue({
            ...t,
            startDate: new Date(t.startDate),
            endDate: new Date(t.endDate),
            theme: t?.themeType,
            type: t?.newsType,
          });
        })
      )
      .subscribe();
  }

  destroy$ = new Subject();

  themeTypes = [
    { id: 0, nameAr: 'المستوى الاستراتيجي', nameEn: 'Strategic Level' },
    { id: 1, nameAr: 'المستوى العملياتي', nameEn: 'Operational Level' },
    { id: 2, nameAr: 'المستوى التكتيكي', nameEn: 'Tactical Level' },
  ];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.situationId = id;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      type: [null, [Validators.required]],
      theme: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
  }
  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    let situation = {
      ...this.form.getRawValue(),
      id: this._situationId,
    };

    situation = {
      ...situation,
      type: situation.type?.id,
      theme: situation.theme?.id,
    };

    if (this.editMode) {
      this.store
        .dispatch(new BrowseSituationsAction.UpdateSituations(situation))
        .pipe(
          catchError(() => {
            return EMPTY;
          }),
          takeUntil(this.destroy$),
          take(1)
        )
        .subscribe();
    } else {
      this.store
        .dispatch(new BrowseSituationsAction.CreateSituations(situation))
        .pipe(takeUntil(this.destroy$))
        .subscribe(async (t) => {});
    }
  }
  close() {
    this.store.dispatch(new BrowseSituationsAction.ToggleDialog({}));
  }
}
