import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {auditTime, filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseAppSystemAction} from "../../states/browse-app-system.action";
import {Dialog} from "primeng/dialog";
import {FormUtils} from "@core/utils/form.utils";
import {AppSystemAction} from "@core/states/bc-resources/app-system/app-system.action";
import {AppSystemState} from "@core/states/bc-resources/app-system/app-system.state";
import {Dropdown} from "primeng/dropdown";
import {SystemsState} from "@core/states/bc-setup/systems/systems.state";
import {BcSystems} from "../../../../../../api/models";
import {SystemsAction} from "@core/states/bc-setup/systems/systems.action";
import {LazyLoadEvent} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BcResources} from "../../../../../../api/models/bc-resources";

@Component({
  selector: 'app-app-system-dialog',
  templateUrl: './app-system-dialog.component.html',
  styleUrls: ['./app-system-dialog.component.scss']
})
export class AppSystemDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  @Select(ResourceAnalysisState.resourceAnalysis)
  public resourceAnalysis$: Observable<BcResources>;

  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild('system') systemDropdown: Dropdown;

  @Select(AppSystemState.blocking)
  blocking$: Observable<boolean>;

  @Select(SystemsState.page)
  systems$: Observable<BcSystems[]>;

  @Select(SystemsState.loading)
  systemsLoading$: Observable<boolean>;

  form: FormGroup;
  _appSystemId: number;
  private auditLoadSystemLevel$ = new Subject<string>();
  get editMode() {
    return this._appSystemId !== undefined && this._appSystemId !== null;
  }
  public get asDialog() {
    return this.route.component !== AppSystemDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};


  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }
  destroy$ = new Subject();

  @Input()
  set appSystemId(v: number) {
    this._appSystemId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      this.defaultFormValue = null;
      return;
    }
    this.store
      .dispatch(new AppSystemAction.GetAppSystem({ id: v }))
      .pipe(
        switchMap(() => this.store.select(AppSystemState.appSystem)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((app) => {
          this.loadSystems(
            '',
            true);
          this.form.patchValue({
            ...app,
          });
          this.defaultFormValue = app;
          this.patchValue(app);
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
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.appSystemId = id;
      })
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
          } catch {
          }
        }
      })
    );
  }
  patchValue(app) {
    const data = JSON.parse(app.minLicenseRequired);
    const hoursFormArray = this.form.get('hours') as FormArray;

    for (const item of data?.minLicenseRequired) {
      const matchingControl = hoursFormArray.controls.find(
        (control: FormGroup) => control.get('label')?.value === item.key
      );

      if (matchingControl) {
        matchingControl.get('hour')?.setValue(item.value);
      }
      this.cdr.detectChanges();
    }
  }
  ngOnInit(): void {
    this.buildForm()
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );

    this.auditLoadSystemLevel$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new SystemsAction.LoadPage({ page: 0,
            size: 50})
        );
      });
  }
  async loadMinPersonal(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseAppSystemAction.LoadMinLicense({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    ).toPromise().then(() => {
      this.dynamicForm();
    });
  }
  dynamicForm() {
    this.store.select(AppSystemState.minLicensePage)
      .pipe(take(1),
        takeUntil(this.destroy$),
      ).subscribe(data => {
      if (data) {
        const hours = this.form.get(
          'hours'
        ) as FormArray;
        hours.clear();
        // this.fields = data;
        data.forEach((v) => {
          hours.push(this.createForm(v));
        });
        this.cdr.detectChanges();
      }
    });
    this.defaultFormValue = {
      ...this.form,
    };
  }
  createForm(formFields): FormGroup {
    return this.formBuilder.group({
      id: formFields.id,
      label: this.translate.currentLang === 'en' ? formFields.nameEn : formFields.nameAr,
      hour: [null, [Validators.pattern('^[0-9]*$')]],
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      applicationAndSoftware: [null, [Validators.required]],
      purpose: [null, [Validators.required]],
      numberOfUsers: [null, [Validators.required, Validators.min(0)]],
      numberOfLicense: [null, [Validators.required, Validators.min(0)]],
      licenseType: [null, [Validators.required]],
      hours: this.formBuilder.array([]),
      isActive: [true]
    });
    this.opened$?.pipe(
      take(1)
    ).subscribe((value) => {
      // 'value' contains the value emitted by the 'opened$' observable
      if (value) {
        this.loadMinPersonal();
      }
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
  }

  getControls(): AbstractControl[] {
    return (this.form.get('hours') as FormArray).controls;
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }
  openDialog(id?: number) {
    this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({ appSystemId: id }));
  }
  submit() {
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const app = {
      ...this.form.getRawValue(),
    };
    const formattedString = this.convertToFormattedString(app.hours);
    app.resource = {
      id: resource?.id
    };
    app.id = this._appSystemId;
    app.minLicenseRequired = formattedString;

    if (this.editMode) {
      this.store
        .dispatch(new BrowseAppSystemAction.UpdateAppSys(app));

    } else {
      this.store
        .dispatch(new BrowseAppSystemAction.CreateAppSys(app));
    }
  }

  convertToFormattedString(data) {
    const formattedData = {
      minLicenseRequired: data.map(item => ({
        key: item.label,
        value: item.hour
      }))
    };
    const jsonString = JSON.stringify(formattedData);
    return jsonString;
  }

  clear() {
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    const hoursArray = JSON.parse(this.defaultFormValue.minLicenseRequired).minLicenseRequired;
    for (let i = 0; i < hoursArray.length; i++) {
      const hourControl = hoursArray.at(i) as FormGroup;
      (this.form.get('hours') as FormArray).controls[i].get('label').setValue(hourControl['key']);
      (this.form.get('hours') as FormArray).controls[i].get('hour').setValue(hourControl['value']);
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadSystems(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new SystemsAction.LoadPage({ page: 0,
          size: 50})
      );
      return;
    }
    this.auditLoadSystemLevel$.next(searchText);
  }

}
