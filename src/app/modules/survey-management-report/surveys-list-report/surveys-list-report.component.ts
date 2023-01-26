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
  selector: 'app-surveys-list-report',
  templateUrl: './surveys-list-report.component.html',
  styleUrls: ['./surveys-list-report.component.scss'],
})
export class SurveysListReportComponent implements OnInit {
  // UI
  filtersForm: FormGroup = this.fb.group({
    fromDate: [''],
    toDate: [''],
    incident: [''],
    orgId: ['']
  });
  // Variables
  feels = FEELS;
  reasons = REASONS;
  displayedColumns: string[] = [
    'createdDate',
    'incidentId',
    'incidentSubject',
    'reportingVia',
    'reporterSurveyAnswers',
    'notes',
  ];
  loading = true;
  downloading = false;
  lang = 'en';
  paginationState: PageEvent;
  data: any;
  dataSource: any;
  dataLength = 0;

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
    this.surveyService.getAllSurveysReport(this.paginationState);
    this.lang = this.translationService.getSelectedLanguage();
    let commonData = JSON.parse(localStorage.getItem('commonData'));
    commonData = commonData.currentOrgDetails.id;
    this.filtersForm.setValue({
      fromDate: [''],
      toDate: [''],
      incident: [''],
      orgId: commonData
    });
    this.surveyService.onSurveysListReport
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
          this.dataLength = this.data.length;
          if (this.data.length > 0) {
            let CommunicationOfficerEfficiencyBool, SpeedResponseIncidentBool, EaseReportingProceduresBool;
            for (let i = 0; i < this.data.length; i++) {
              CommunicationOfficerEfficiencyBool = false;
              SpeedResponseIncidentBool = false;
              EaseReportingProceduresBool = false;
              for (let j = 0; j < this.data[i].incidentSurveyValues.length; j++) {
                if (this.data[i].incidentSurveyValues[j].surveyConfig.id == 1) {
                  CommunicationOfficerEfficiencyBool = true;
                  if(this.lang == 'en'){ this.data[i].CommunicationOfficerEfficiency = this.data[i].incidentSurveyValues[j].surveyType.nameEn; }
                  else{ this.data[i].CommunicationOfficerEfficiency = this.data[i].incidentSurveyValues[j].surveyType.nameAr; }
                  this.data[i].CommunicationOfficerEfficiencyIcon = this.data[i].incidentSurveyValues[j].surveyType.icon;
                } else { if (CommunicationOfficerEfficiencyBool == false) { this.data[i].CommunicationOfficerEfficiency = ''; } }
                if (this.data[i].incidentSurveyValues[j].surveyConfig.id == 2) {
                  SpeedResponseIncidentBool = true;
                  if(this.lang == 'en'){ this.data[i].SpeedResponseIncident = this.data[i].incidentSurveyValues[j].surveyType.nameEn; }
                  else{ this.data[i].SpeedResponseIncident = this.data[i].incidentSurveyValues[j].surveyType.nameAr; }
                  this.data[i].SpeedResponseIncidentIcon = this.data[i].incidentSurveyValues[j].surveyType.icon; 
                } else { if (SpeedResponseIncidentBool == false) { this.data[i].SpeedResponseIncident = ''; } }
                if (this.data[i].incidentSurveyValues[j].surveyConfig.id == 3) {
                  EaseReportingProceduresBool = true;
                  if(this.lang == 'en'){ this.data[i].EaseReportingProcedures = this.data[i].incidentSurveyValues[j].surveyType.nameEn; }
                  else{ this.data[i].EaseReportingProcedures = this.data[i].incidentSurveyValues[j].surveyType.nameAr; }
                  this.data[i].EaseReportingProceduresIcon = this.data[i].incidentSurveyValues[j].surveyType.icon;
                } else { if (EaseReportingProceduresBool == false) { this.data[i].EaseReportingProcedures = ''; } }
              }
            }
            this.dataSource = new MatTableDataSource(this.data);
          }
          this.cdr.detectChanges();
        },
        (err) => {
          this.loading = false;
        }
      );
  }

  onPagination(event: PageEvent) {
    this.loading = true;
    this.surveyService.getAllSurveysReport(event);
  }

  sortData(event: Sort) {
    this.loading = true;
    this.paginationState.pageIndex = 0;
    this.surveyService.getAllSurveysReport(this.paginationState, '', event);
  }

  onSubmit() {
    const filterForm = this.proccesDate();
    this.loading = true;
    this.surveyService.getStatisticsReport(filterForm);
    this.surveyService.getAllSurveysReport(this.paginationState, filterForm);
    this.filtersForm.setValue({
      fromDate: [''],
      toDate: [''],
      incident: [''],
    });
  }

  reset() {
    this.filtersForm.reset();
    this.filtersForm.get('toDate').setValue('');
    this.filtersForm.get('fromDate').setValue('');
    this.onSubmit();
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
      .downloadSurveyReport('PDF', filterForm, this.paginationState)
      .toPromise();
    this.downloading = false;
    this.cdr.detectChanges();
  }

  public async downloadXlsx() {
    this.downloading = true;
    const filterForm = this.proccesDate();
    await this.surveyService
      .downloadSurveyReport('EXCEL', filterForm, this.paginationState)
      .toPromise();
    this.downloading = false;
    this.cdr.detectChanges();
  }

}
