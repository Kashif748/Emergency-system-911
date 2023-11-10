import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GenericValidators} from '@shared/validators/generic-validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Dialog} from 'primeng/dialog';
import {map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {ActivityEmployeesAction} from '@core/states/activity-analysis/employees/employees.action';
import {ActivityEmployeesState} from '@core/states/activity-analysis/employees/employees.state';
import {BrowseActivityEmployeesAction} from '../../states/browse-employees.action';
import {FormUtils} from '@core/utils';
import {ActivityAnalysisState} from '@core/states/activity-analysis/activity-analysis.state';
import {BcActivityEmployees} from 'src/app/api/models';
import {RegxConst} from '@core/constant/RegxConst';
import {ActivityAnalysisStatusAction} from "../../../../../../api/models/activity-analysis-status-action";

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.scss'],
})
export class EmployeesDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  employeesTypes = [];
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @Select(ActivityEmployeesState.blocking)
  blocking$: Observable<boolean>;

  public loading = false;
  @ViewChild(Dialog) dialog: Dialog;

  _employeeId: number;

  private defaultFormValue: { [key: string]: any } = {};

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  get editMode() {
    return this._employeeId !== undefined && this._employeeId !== null;
  }
  public get asDialog() {
    return this.route.component !== EmployeesDialogComponent;
  }
  set employeeId(v: number) {
    this._employeeId = v;
    this.form.reset();
    if (v === undefined || v === null) {
      this.defaultFormValue = null;
      return;
    }
    this.store
      .dispatch(new ActivityEmployeesAction.GetEmployee({ id: v }))
      .pipe(
        switchMap(() =>
          this.store.select(ActivityEmployeesState.activityEmployee)
        ),
        takeUntil(this.destroy$),
        take(1),
        tap((employee) => {
          this.form.patchValue({
            ...employee,
          });
          this.defaultFormValue = employee;
        })
      )
      .subscribe();
  }

  destroy$ = new Subject();
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    protected cdr: ChangeDetectorRef,
  ) {
    this.viewOnly$ = this.route.queryParams.pipe(
      tap(({ _id }) => {
        this.employeeId = _id;
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
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened'),
    );
  }
  ngAfterViewInit(): void {
    this.employeesTypes = [
      {
        icon: 'pi pi-bars',
        name: 'EMPLOYEES.PRIMARY',
        value: true,
      },
      {
        icon: 'pi pi-th-large',
        name: 'EMPLOYEES.SECONDARY',
        value: false,
      },
    ];
  }
  toggleDialog(id?: number) {
    this.store.dispatch(new BrowseActivityEmployeesAction.ToggleDialog({ id }));
  }
  close() {
    this.store.dispatch(new BrowseActivityEmployeesAction.ToggleDialog({}));
  }
  clear() {
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      employeeNameAr: [null, [Validators.required, GenericValidators.arabic]],
      employeeNameEn: [null, [Validators.required, GenericValidators.english]],
      email: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)],
      ],
      mobileNumber: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      secondNumber: [],
      isPrimary: false,
    });
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    const payload: BcActivityEmployees = {
      ...this.form.getRawValue(),
      mobileNumber: this.form.get('mobileNumber')?.value?.number,
      phoneNumber: this.form.get('phoneNumber')?.value?.number,
      secondNumber: this.form.get('secondNumber')?.value?.number,
      id: this._employeeId,
      activity: {
        id: activityAnalysis?.activity?.id,
        internal: activityAnalysis?.activity?.internal,
      },
      cycle: {
        id: cycle.id,
      },
      isActive: true,
    };

    if (this.editMode) {
      this.store.dispatch(new BrowseActivityEmployeesAction.Update(payload));
    } else {
      this.store.dispatch(new BrowseActivityEmployeesAction.Create(payload));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
