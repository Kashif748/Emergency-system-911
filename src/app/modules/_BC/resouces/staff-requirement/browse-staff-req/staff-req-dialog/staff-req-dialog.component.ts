import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {FormUtils} from "@core/utils/form.utils";
import {Observable, Subject} from "rxjs";
import {auditTime, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {BrowseStaffAction} from "../../states/browse-staff.action";
import {Select, Store} from "@ngxs/store";
import {Dialog} from "primeng/dialog";
import {RemoteWorkState} from "@core/states/bc-resources/remote-work/remote-work.state";
import {IAuthService} from "@core/services/auth.service";
import {StaffAction} from "@core/states/bc-resources/staff/staff.action";
import {LazyLoadEvent} from "primeng/api";
import {BcResourcesMinPersonnelReq} from "../../../../../../api/models/bc-resources-min-personnel-req";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {StaffState} from "@core/states/bc-resources/staff/staff.state";
import {TranslateService} from "@ngx-translate/core";
import {BcResourcesStaffReq} from "../../../../../../api/models/bc-resources-staff-req";
import {Dropdown} from "primeng/dropdown";
import {BcResourcesDesignation} from "../../../../../../api/models/bc-resources-designation";
import {BcResources} from "../../../../../../api/models/bc-resources";

@Component({
  selector: 'app-staff-req-dialog',
  templateUrl: './staff-req-dialog.component.html',
  styleUrls: ['./staff-req-dialog.component.scss']
})
export class StaffReqDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  @ViewChild('resourceDesignation') resourceDesignationDropdown: Dropdown;

  @Select(StaffState.designationPage)
  resourceDesignation$: Observable<BcResourcesDesignation[]>;

  @Select(ResourceAnalysisState.resourceAnalysis)
  public resourceAnalysis$: Observable<BcResources>;

  @Select(StaffState.designationLoading)
  resourceDesignationLoading$: Observable<boolean>;

  private auditLoadPersonalDesignation$ = new Subject<string>();

  public fields;
  public page$: Observable<BcResourcesMinPersonnelReq[]>;

  @ViewChild(Dialog) dialog: Dialog;

  @Select(StaffState.blocking)
  blocking$: Observable<boolean>;

  public get asDialog() {
    return this.route.component !== StaffReqDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};
  form: FormGroup;
  destroy$ = new Subject();

  get editMode() {
    return this._staffId !== undefined && this._staffId !== null;
  }
  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }
  _staffId: number;

  @Input()
  set staffId(v: number) {
    this._staffId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new StaffAction.GetStaff({ id: v }))
      .pipe(
        switchMap(() => this.store.select(StaffState.staff)),
        takeUntil(this.destroy$),
        take(1),
        tap((staff) => {
          this.loadPersonalDesignation(
            '',
            true);
          this.form.patchValue({
            ...staff,
          });
          this.patchValue(staff);
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
        this.staffId = id;
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
    this.auditLoadPersonalDesignation$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new StaffAction.LoadDesignationPage({ page: 0,
            size: 50})
        );
      });
  }

  loadPersonalDesignation(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new StaffAction.LoadDesignationPage({ page: 0,
          size: 50})
      );
      return;
    }
    this.auditLoadPersonalDesignation$.next(searchText);
  }


  dynamicForm() {
    this.store.select(StaffState.minPersonalPage)
      .pipe(take(1),
        takeUntil(this.destroy$),
      ).subscribe(data => {
      if (data) {
        const hours = this.form.get(
          'hours'
        ) as FormArray;
        hours.clear();
        this.fields = data;
        data.forEach((v) => {
          hours.push(this.createForm(v));
        });
        this.defaultFormValue = {
          ...this.form,
        };
        this.cdr.detectChanges()
        console.log(hours);
        console.log(this.form);
      }
    });
  }

  async loadMinPersonal(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseStaffAction.LoadMinPersonal({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    ).toPromise().then(() => {
      this.dynamicForm();
    });
  }
  patchValue(staff) {
    const data = JSON.parse(staff.minPersonnelRequired);
    const hoursFormArray = this.form.get('hours') as FormArray;

    for (const item of data?.minPersonnelReq) {
      const matchingControl = hoursFormArray.controls.find(
        (control: FormGroup) => control.get('label')?.value === item.key
      );

      if (matchingControl) {
        matchingControl.get('hour')?.setValue(item.value);
      }
      this.cdr.detectChanges();
    }
  }
  createForm(formFields): FormGroup {
    return this.formBuilder.group({
      id: formFields.id,
      label: this.translate.currentLang === 'en' ? formFields.nameEn : formFields.nameAr,
      hour: [null, [Validators.required, Validators.min(0)]],
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      keyResponsibilities: [null, [Validators.required]],
      resourceDesignation: [null, [Validators.required]],
      primaryEmpName: [null, [Validators.required]],
      secondaryEmp1Name: [null, [Validators.required]],
      secondaryEmp2Name: [null, [Validators.required]],
      hours: this.formBuilder.array([]),
    });
    this.opened$?.pipe(
      take(1)
    ).subscribe((value) => {
      // 'value' contains the value emitted by the 'opened$' observable
      if (value) {
        this.loadMinPersonal();
      }
    });
  }

  getControls(): AbstractControl[] {
    return (this.form.get('hours') as FormArray).controls;
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseStaffAction.ToggleDialog({ staffId: id }));
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
    const staff = {
      ...this.form.getRawValue(),
    };
    const formattedString = this.convertToFormattedString(staff.hours);
    const staffWork: BcResourcesStaffReq = {
      id: this._staffId,
      isActive: true,
      keyResponsibilities: staff.keyResponsibilities,
      resource: {
        id: resource?.id
      },
      resourceDesignation: staff.resourceDesignation,
      minPersonnelRequired: formattedString,
      primaryEmpName: staff.primaryEmpName,
      secondaryEmp1Name: staff.secondaryEmp1Name,
      secondaryEmp2Name: staff.secondaryEmp2Name
    };



    // const result = { 'minPersonnelReq' : [{'key': item["id", 'value': staff.hours[0].hour]} for item in staff.hour]}

    if (this.editMode) {
      this.store.dispatch(
        new BrowseStaffAction.UpdateStaff(staffWork)
      );
    } else {
      this.store.dispatch(
        new BrowseStaffAction.CreateStaff(staffWork)
      );
    }
  }

  convertToFormattedString(data) {
    const formattedData = {
      minPersonnelReq: data.map(item => ({
        key: item.label,
        value: item.hour
      }))
    };
    const jsonString = JSON.stringify(formattedData);
    return jsonString;
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseStaffAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

  clear() {
    this.store.dispatch(new StaffAction.GetStaff({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    const hoursArray = this.defaultFormValue.value.hours;
    for (let i = 0; i < hoursArray.length; i++) {
      const hourControl = hoursArray.at(i) as FormGroup;
      (this.form.get('hours') as FormArray).controls[i].get('label').setValue(hourControl['label']);
    }
    this.cdr.detectChanges();
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
