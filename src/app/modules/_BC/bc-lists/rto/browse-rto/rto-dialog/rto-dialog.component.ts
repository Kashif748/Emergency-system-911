import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { FormUtils } from '@core/utils/form.utils';
import { Select, Store } from '@ngxs/store';
import { BrowseRtoAction } from '../../states/browse-rto.action';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IAuthService } from '@core/services/auth.service';
import { RtoAction, RtoState } from '@core/states';
import { GenericValidators } from '@shared/validators/generic-validators';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {BrowseUsersAction} from "../../../../../_user-mgmt/states/browse-users.action";

@Component({
  selector: 'app-rto-dialog',
  templateUrl: './rto-dialog.component.html',
  styleUrls: ['./rto-dialog.component.scss'],
})
export class RtoDialogComponent implements OnInit, OnDestroy {
  public color = '#ffffff';
  public colorOptions = ['#FF0017', '#FFBB3A', '#FFFC4C', '#89CF60', '#FFFFFF'];

  public exportActions = [
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_XLSX'),
      icon: 'pi pi-file-excel',
      command: () => this.export('EXCEL'),
    },
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_PDF'),
      icon: 'pi pi-file-pdf',
      command: () => this.export('PDF'),
    },
  ] as MenuItem[];

  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @Select(RtoState.blocking)
  blocking$: Observable<boolean>;

  public display = false;
  form: FormGroup;

  @Input()
  shouldDisable: boolean;
  public version: number;

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
          this.setColor(rto.color);
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService,
    private translate: TranslateService,
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.version = params['_version'];
        this.rtoId = params['_id'];
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
      color: [null, [Validators.required]],
      isActive: [true],
      isCritical: [false],
      versionId: this.version,
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

    if (this.editMode) {
      rto.id = this._rtoId;
      this.store.dispatch(new BrowseRtoAction.UpdateRto(rto));
    } else {
      this.store.dispatch(new BrowseRtoAction.CreateRto(rto));
    }
  }

  setColor(color: string) {
    this.color = color;
    this.form.patchValue({
      color: color,
    });
  }
  onValueChange(value: string): void {
    this.form.patchValue({
      color: value,
    });
  }
  isValidColorCode(value: string): boolean {
    return this.colorOptions.includes(value);
  }
  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseRtoAction.Export({ type }));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
