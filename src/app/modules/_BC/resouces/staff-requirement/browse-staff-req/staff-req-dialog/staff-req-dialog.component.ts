import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {FormUtils} from "@core/utils/form.utils";
import {Observable, Subject} from "rxjs";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {BrowseStaffAction} from "../../states/browse-staff.action";
import {Select, Store} from "@ngxs/store";
import {Dialog} from "primeng/dialog";
import {RemoteWorkState} from "@core/states/bc-resources/remote-work/remote-work.state";
import {UserAction, UserState} from "@core/states";
import {IAuthService} from "@core/services/auth.service";
import {StaffAction} from "@core/states/bc-resources/staff/staff.action";
import {LazyLoadEvent} from "primeng/api";
import {BcResourcesMinPersonnelReq} from "../../../../../../api/models/bc-resources-min-personnel-req";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {StaffState} from "@core/states/bc-resources/staff/staff.state";
import {TranslateService} from "@ngx-translate/core";
import {BcResourcesStaffReq} from "../../../../../../api/models/bc-resources-staff-req";

@Component({
  selector: 'app-staff-req-dialog',
  templateUrl: './staff-req-dialog.component.html',
  styleUrls: ['./staff-req-dialog.component.scss']
})
export class StaffReqDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  public fields;
  public page$: Observable<BcResourcesMinPersonnelReq[]>;

  @ViewChild(Dialog) dialog: Dialog;

  @Select(RemoteWorkState.blocking)
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
      .dispatch(new UserAction.GetUser({ id: v }))
      .pipe(
        switchMap(() => this.store.select(UserState.user)),
        takeUntil(this.destroy$),
        take(1),
        tap((user) => {
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
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );

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

  createForm(formFields): FormGroup {
    return this.formBuilder.group({
      id: formFields.id,
      label: this.translate.currentLang === 'en' ? formFields.nameEn : formFields.nameAr,
      hour: [null, [Validators.required]], // Add validation as needed
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required]],
      p_emp: [null, [Validators.required]],
      s_emp: [null, [Validators.required]],
      s_emp1: [null, [Validators.required]],
      hours: this.formBuilder.array([]),
    });
    this.loadMinPersonal();
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
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

    const staffWork: BcResourcesStaffReq = {
      id: this._staffId,
      isActive: true,
      keyResponsibilities: staff.description,
      resource: {
        id: resource?.id
      },
      minPersonnelRequired: '1',
      primaryEmpName: staff.p_emp,
      secondaryEmp1Name: staff.s_emp,
      secondaryEmp2Name: staff.s_emp1
    };

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
