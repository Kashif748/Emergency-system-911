import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SurveysManagementService } from '@core/api/services/surveys-management.service';
import { catchError, skip } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { FEELS, REASONS } from '../../survey/keys-data';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss'],
})
export class SurveysListComponent implements OnInit {
  // UI
  filtersForm: FormGroup = this.fb.group({
    fromDate: [''],
    toDate: [''],
    happiness: [''],
    reason: [''],
    incident: [''],
  });
  // Variables
  feels = FEELS;
  reasons = REASONS;
  displayedColumns: string[] = [
    'createdDate',
    'incidentId',
    'incidentSubject',
    'happiness',
    'reason',
    'other',
  ];
  loading = true;
  downloading = false;
  lang = 'en';
  paginationState: PageEvent;
  data: any[];
  dataSource: any;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private surveyService: SurveysManagementService,
    private fb: FormBuilder,
    private langFacade: ILangFacade,
  ) {
    this.paginationState = {
      pageIndex: 0,
      pageSize: 20,
      length: 0,
      previousPageIndex: 0,
    };
  }

  ngOnInit(): void {
    this.surveyService.getAllSurveys(this.paginationState);
    this.lang = this.translationService.getSelectedLanguage();

    this.surveyService.onSurveysList
      .pipe(
        skip(1),
        catchError((e: any) => {
          this.loading = false;
          console.log(e);
          return e;
        })
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.data = data;
          this.dataSource = new MatTableDataSource(this.data);
          this.data.map((item) => {
            item.happiness = this.feels[item.happiness];
            item.reason = this.reasons[item.reason];
            return item;
          });
          this.cdr.detectChanges();
        },
        (err) => {
          this.loading = false;
        }
      );
  }

  onPagination(event: PageEvent) {
    this.loading = true;
    this.surveyService.getAllSurveys(event);
  }

  sortData(event: Sort) {
    this.loading = true;
    this.paginationState.pageIndex = 0;
    this.surveyService.getAllSurveys(this.paginationState, '', event);
  }

  onSubmit() {
    const filterForm = this.proccesDate();

    this.loading = true;
    this.surveyService.getStatistics(filterForm);
    this.surveyService.getAllSurveys(this.paginationState, filterForm);
  }

  reset() {
    this.filtersForm.reset();
    this.filtersForm.get('toDate').setValue('');
    this.filtersForm.get('fromDate').setValue('');
    this.onSubmit();
  }

  getLabelColor(happiness) {
    if (!happiness) {
      return '';
    } else if (happiness?.index == 0) {
      return 'label-success';
    } else if (happiness?.index == 1) {
      return 'label-warning';
    } else {
      return 'label-danger';
    }
  }

  proccesDate() {
    const filterForm = this.filtersForm.value;

    if (this.filtersForm.get('fromDate').value != '') {
      filterForm['fromDate'] = new Date(
        this.filtersForm.get('fromDate').value
      ).toLocaleDateString('en-CA');
    }
    if (this.filtersForm.get('toDate').value != '') {
      filterForm['toDate'] = new Date(
        this.filtersForm.get('toDate').value
      ).toLocaleDateString('en-CA');
    }
    if (filterForm['toDate'] == '1970-01-01') {
      filterForm['toDate'] = '';
    }
    if (filterForm['fromDate'] == '1970-01-01') {
      filterForm['fromDate'] = '';
    }

    return filterForm;
  }

  public async downloadPDF() {
    this.downloading = true;
    const filterForm = this.proccesDate();
    await this.surveyService
      .downloadReport('PDF', filterForm, this.paginationState)
      .toPromise();
    this.downloading = false;
    this.cdr.detectChanges();
  }

  public async downloadXlsx() {
    this.downloading = true;
    const filterForm = this.proccesDate();
    await this.surveyService
      .downloadReport('EXCEL', filterForm, this.paginationState)
      .toPromise();
    this.downloading = false;
    this.cdr.detectChanges();
  }
}
