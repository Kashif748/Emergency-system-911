import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentsService } from '../../../../../_metronic/core/services/incidents.service';
import { GenericValidators } from '@shared/validators/generic-validators';
import { RegxConst } from '@core/constant/RegxConst';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import {debounceTime, filter, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { BrowseVenderAction } from '../../states/browse-vender.action';
import { FormUtils } from '@core/utils/form.utils';
import { VenderState } from '@core/states/bc-setup/venders/vender.state';
import { VenderAction } from '@core/states';

@Component({
  selector: 'app-vender-dialog',
  templateUrl: './vender-dialog.component.html',
  styleUrls: ['./vender-dialog.component.scss'],
})
export class VenderDialogComponent implements OnInit, OnDestroy {
  @ViewChild(Dialog) dialog: Dialog;

  @Select(VenderState.blocking)
  blocking$: Observable<boolean>;

  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  destroy$ = new Subject();
  private defaultFormValue: { [key: string]: any } = {};

  public get asDialog() {
    return this.route.component !== VenderDialogComponent;
  }
  public criticalityType = [
    { id: 1, nameEn: 'Critical', nameAr: 'مهم' },
    { id: 2, nameEn: 'Non-Critical', nameAr: 'غير مهم' },
  ];

  // variable
  form: FormGroup;
  _venderId: number;

  get editMode() {
    return this._venderId !== undefined && this._venderId !== null;
  }

  @Input()
  set venderId(v: number) {
    this._venderId = v;
    this.form?.reset();
    if (v === undefined || v === null) {
      this.defaultFormValue = null;
      return;
    }
    this.store
      .dispatch(new VenderAction.GetVender({ id: v }))
      .pipe(
        switchMap(() => this.store.select(VenderState.vender)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((vender) => {
          this.form.patchValue({
            ...vender,
          });
          this.patchValues(vender);
          this.defaultFormValue = vender;
        })
      )
      .subscribe((v) => {
        setTimeout(() => {
          this.form.updateValueAndValidity();
          this.cdr.detectChanges();
        }, 1000);
      });
  }

  constructor(
    private formBuilder: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected incidentService: IncidentsService,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.viewOnly$ = this.route.queryParams.pipe(
      tap(({ _id }) => {
        this.venderId = _id;
      }),
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

  patchValues(vender) {
    if (vender.isCritical) {
      this.form.patchValue({
        isCritical: this.criticalityType[0],
      });
    } else {
      this.form.patchValue({
        isCritical: this.criticalityType[1],
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      isCritical: [null, [Validators.required]],
      address: [null, [Validators.required]],
      services: [null, [Validators.required]],
      sla: [null, [Validators.required]],
      pcontactNameEn: [null, [Validators.required, GenericValidators.english]],
      pcontactNameAr: [null, [Validators.required, GenericValidators.arabic]],
      pcontactEmail: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)],
      ],
      pcontactPhoneNum: [null],
      pcontactMobileNum: [null, [Validators.required]],
      pcontactSecNum: [null],
      scontactNameEn: [null, [Validators.required, GenericValidators.english]],
      scontactNameAr: [null, [Validators.required, GenericValidators.arabic]],
      scontactPhoneNum: [null],
      scontactMobileNum: [null, [Validators.required]],
      scontactSecNum: [null],
      scontactEmail: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)],
      ],
    });
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseVenderAction.ToggleDialog({ venderId: id }));
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseVenderAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

  clear() {
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.patchValues(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }

  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const vender = {
      ...this.form.getRawValue(),
    };

    vender.isCritical = vender.isCritical.id === 1 ? true : false;
    vender.pcontactMobileNum = vender.pcontactMobileNum?.internationalNumber;
    vender.scontactMobileNum = vender.scontactMobileNum?.internationalNumber;
    vender.id = this._venderId;
    if (this.editMode) {
      this.store.dispatch(new BrowseVenderAction.UpdateVender(vender));
    } else {
      this.store.dispatch(new BrowseVenderAction.CreateVender(vender));
    }
  }
}
