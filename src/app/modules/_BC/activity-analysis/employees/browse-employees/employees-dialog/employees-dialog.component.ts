import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GenericValidators } from '@shared/validators/generic-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ActivityEmployeesAction } from '@core/states/activity-analysis/employees/employees.action';
import { ActivityEmployeesState } from '@core/states/activity-analysis/employees/employees.state';
import { BrowseActivityEmployeesAction } from '../../states/browse-employees.action';
import { FormUtils } from '@core/utils';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { BcActivityEmployees } from 'src/app/api/models';
import { RegxConst } from '@core/constant/RegxConst';

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.scss'],
})
export class EmployeesDialogComponent implements OnInit, OnDestroy {
  employeesTypes = [];
  opened$: Observable<boolean>;

  @Select(ActivityEmployeesState.blocking)
  blocking$: Observable<boolean>;

  public loading = false;
  @ViewChild(Dialog) dialog: Dialog;

  _employeeId: number;

  get editMode() {
    return this._employeeId !== undefined && this._employeeId !== null;
  }
  set employeeId(v: number) {
    this._employeeId = v;
    this.buildForm();
    if (v === undefined || v === null) {
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
        })
      )
      .subscribe();
  }

  destroy$ = new Subject();
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.employeeId = id;
      });
  }

  ngOnInit(): void {
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened'),
      tap(()=> {
        // this.buildForm()
        this.form.reset()
        this.form.updateValueAndValidity()
      } )
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
  buildForm() {
    this.form = this.formBuilder.group({
      employeeNameAr: [null, [Validators.required, GenericValidators.arabic]],
      employeeNameEn: [null, [Validators.required, GenericValidators.english]],
      email: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)],
      ],

      isActive: true,
      mobileNumber: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
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
