import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentFilter } from '@core/api/models/filters.model';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { Store } from '@ngrx/store';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { UpdateFilter } from 'src/app/modules/incidents/new-incidents-view/store/incidents-dashboard.actions';
import { IncidentDashboardStateModel } from 'src/app/modules/incidents/new-incidents-view/store/incidents-dashboard.reducer';

import {
  AdvancedSearchFieldsEnum,
  isExpiredFilterOption,
} from './advancedSearch.model';
import {environment} from "../../../../environments/environment";
import {IncidentsService} from "../../../_metronic/core/services/incidents.service";
import {map, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";

export interface DataOptions {
  formControlName: string;
  children: any[];
}

export interface FormFieldName {
  formControlName: string;
  initialValue?: any;
}
@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchComponent implements OnInit, OnChanges {
  @Output() filterChanged$: EventEmitter<IncidentFilter> =
    new EventEmitter<IncidentFilter>();
  @Input() dataLists: DataOptions[] = [];
  @Input() formFields: FormFieldName[] = [];
  @Input() incidentReport: boolean;
  mainCategories: any[];
  incSubCategories: any[];
  commonData: any;
  lang: any;
  minDate: any;
  maxDate: any;
  endDate: any;
  fromDate: any;
  toDate: any;
  createdDate: any;
  advncedFilterForm: FormGroup;
  advancedSearchFields = AdvancedSearchFieldsEnum;
  isExpiredFilterOptions = isExpiredFilterOption;
  destroy$ = new Subject();
  constructor(
    public directionality: Directionality,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AdvancedSearchComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { formFields: FormFieldName[]; dataLists: DataOptions[] },
    private store: Store,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    protected incidentService: IncidentsService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.pipe(
      map((params) => params['startDate']),
      takeUntil(this.destroy$)
    )
      .subscribe((mode) => {
        this.fromDate = mode;
      });
    this.route.queryParams.pipe(
      map((params) => params['endDate']),
      takeUntil(this.destroy$)
    )
      .subscribe((mode) => {
        this.toDate = mode;
      });
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    if (Object.keys(this.data).length) {
      this.dataLists = this.data?.dataLists;
      this.formFields = this.data?.formFields;
    }
    this.store
      .select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state.incidentDashboard.filter
      )
      .subscribe((data) => {
        this.createForm(data);
        // this.advncedFilterForm.reset();
      });
    const date = new Date().setDate(1);
    if (this.incidentReport) {
      if (this.fromDate && this.toDate) {
        this.advncedFilterForm.get('fromDate').setValue(new Date(this.fromDate));
        this.advncedFilterForm.get('toDate').setValue(new Date(this.toDate));
      } else {
        this.advncedFilterForm.get('fromDate').setValue(new Date(date));
        this.advncedFilterForm.get('toDate').setValue(new Date());
      }
      this.flattenValues();
      this.filterChanged$.emit(this.advncedFilterForm.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.dataLists) {
      console.log(changes);
    }
  }

  createForm(filterValue?: any) {
    this.advncedFilterForm = this._fb.group({});
    this.formFields.forEach((v) => {
      this.advncedFilterForm.addControl(
        v.formControlName,
        new FormControl(filterValue ? filterValue[v.formControlName] : '')
        // new FormControl('')
      );
    });
    filterValue && this.advncedFilterForm.patchValue(filterValue);
  }
  clear() {
    this.advncedFilterForm.reset();
    this.filterChanged$.emit(this.advncedFilterForm.value);
    if (this.data) {
      this.store.dispatch(
        UpdateFilter({ filter: this.advncedFilterForm.value })
      );
      this.dialogRef.close(this.advncedFilterForm.value);
    }
  }

  search() {
    this.flattenValues();
    this.filterChanged$.emit(this.advncedFilterForm.value);
    if (this.data) {
      this.store.dispatch(
        UpdateFilter({ filter: this.advncedFilterForm.value })
      );
    }
  }

  flattenValues() {
    if (this.advncedFilterForm.contains(AdvancedSearchFieldsEnum.CREATED_BY)) {
      const createdByValue = this.advncedFilterForm.get(
        AdvancedSearchFieldsEnum.CREATED_BY
      ).value;
      this.advncedFilterForm
        .get(AdvancedSearchFieldsEnum.CREATED_BY)
        .patchValue(createdByValue?.id || null);
    }

    const fromDate = this.advncedFilterForm.get(
      AdvancedSearchFieldsEnum.CREATED_DATE
    ).value;
    this.advncedFilterForm
      .get(AdvancedSearchFieldsEnum.CREATED_DATE)
      .patchValue(
        fromDate ? DateTimeUtil.format(new Date(fromDate), DateTimeUtil.DATE_FORMAT) : null
      );

    const toDate = this.advncedFilterForm.get(
      AdvancedSearchFieldsEnum.END_DATE
    ).value;
    this.advncedFilterForm
      .get(AdvancedSearchFieldsEnum.END_DATE)
      .patchValue(toDate ? DateTimeUtil.format(new Date(toDate), DateTimeUtil.DATE_FORMAT) : null);
  }

  public onCategoryChange(event): void {
    let found = false;

    for (const obj of this.formFields) {
      if (obj.formControlName === this.advancedSearchFields.SUB_CATEGORY) {
        found = true;
        break;
      }
    }
    if (found) {
      const categoryId = event.source.value;
      this.incSubCategories = [];
      this.incidentService
        .getIncidentSubCategories(categoryId)
        .pipe(
          tap((data) => {
            this.incSubCategories = data.result;
          })).subscribe();
    }
  }


  // fillAdvancedSearchFormFieldsData() {
  //   const newAdvancedSearchFormFields = this.data.formFields;
  //   if (Object.keys(this.advancedSearchFilter).length) {
  //     Object.keys(this.advancedSearchFilter).forEach((key) => {
  //       const foundFormField = newAdvancedSearchFormFields.find(
  //         (formField) => formField.formControlName === key
  //       );
  //       if (foundFormField) {
  //         foundFormField.initialValue = this.advancedSearchFilter[key];
  //       }
  //     });
  //   }
  //   console.log(newAdvancedSearchFormFields);
  //   this.advancedSearchFormFields = newAdvancedSearchFormFields;
  // }
}
