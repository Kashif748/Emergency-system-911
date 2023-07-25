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
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
  }
  toggleDialog(id?: number) {
    this.store.dispatch(new BrowseActivityEmployeesAction.ToggleDialog({ id }));
  }
  buildForm() {
    this.form = this.formBuilder.group({
      employeeNameAr: [null, [Validators.required, GenericValidators.arabic]],
      employeeNameEn: [null, [Validators.required, GenericValidators.english]],
      isActive: true,
      mobileNumber: [null],
      phoneNumber: [null],
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

    const employee = {
      ...this.form.getRawValue(),
      mobileNumber: this.form.get('mobileNumber')?.value?.number,
      phoneNumber: this.form.get('phoneNumber')?.value?.number,
    };

    if (this.editMode) {
      employee.id = this._employeeId;
      this.store.dispatch(new BrowseActivityEmployeesAction.Update(employee));
    } else {
      this.store.dispatch(new BrowseActivityEmployeesAction.Create(employee));
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
