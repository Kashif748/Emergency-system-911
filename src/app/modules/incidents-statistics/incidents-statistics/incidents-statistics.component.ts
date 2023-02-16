import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncidentReportService } from '@core/api/services/incident-report.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { forkJoin, iif } from 'rxjs';
import { catchError, skip, startWith, switchMap, tap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';

interface StatisticsData {
  org?: string;
  log: number;
  closed: number;
  inProgress: number;
  delayed: number;
  average: number;
  deleted: number;
  rejected: number;
}

enum FormType {
  MAIN_ORG = 'mainOrg',
  CENTER = 'center',
}

@Component({
  selector: 'app-incidents-statistics',
  templateUrl: './incidents-statistics.component.html',
  styleUrls: ['./incidents-statistics.component.scss'],
})
export class IncidentsStatisticsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  activeTable = new FormControl(FormType.CENTER);
  formType = FormType;
  loading = true;
  lang = 'en';
  displayedColumns: string[] = [
    'org',
    'log',
    'inProgress',
    'delayed',
    'deleted',
    'rejected',
    'closed',
    'average',
  ];

  dataSource = new MatTableDataSource<StatisticsData>([]);
  dataCharts = [];

  filterForm: FormGroup = this.fb.group({
    fromDate: [new Date()],
    toDate: [new Date()],
    centerId: '',
  });

  constructor(
    private langFacade: ILangFacade,
    private service: IncidentReportService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    // set  from date  to  last  month
    const date = new Date().setDate(1);
    this.filterForm.get('fromDate').setValue(new Date(date));

    this.activeTable.valueChanges
      .pipe(
        startWith(this.formType.CENTER),
        tap(() => (this.loading = true)),
        switchMap((activeTable: FormType) => {
          if (activeTable === this.formType.CENTER) {
            return this.service.getStatisticsForCenters(
              this.proccessDate(this.filterForm)
            );
          } else {
            return this.service.getStatisticsForMainOrg(
              this.proccessDate(this.filterForm)
            );
          }
        })
      )
      .subscribe((data) => {
        this.dataCharts = data;
        this.dataSource.data = this.loadStatistics(data);
        this.dataSource.sort = this.sort;
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  loadStatistics(data: any) {
    return data.map((element) => {
      const obj: StatisticsData = {
        org: '',
        average: 0,
        closed: 0,
        delayed: 0,
        deleted: 0,
        inProgress: 0,
        log: 0,
        rejected: 0,
      };
      obj.org = this.lang == 'en' ? element.nameEn : element.nameAr;
      element.statistics.forEach((state: StatisticsData) => {
        obj.closed += state.closed;
        obj.delayed += state.delayed;
        obj.inProgress += state.inProgress;
        obj.log += state.log;
        obj.rejected += state.rejected;
        obj.deleted += state.deleted;
      });
      obj.average = (100 * (obj.closed + obj.deleted + obj.rejected)) / obj.log;
      return obj;
    });
  }

  onSubmit() {
    this.loading = true;
    const filtersForm = this.proccessDate(this.filterForm);

    iif(
      () => this.activeTable.value == this.formType.CENTER,
      this.service.getStatisticsForCenters(filtersForm),
      this.service.getStatisticsForMainOrg(filtersForm)
    ).subscribe((data) => {
      this.loading = false;
      this.dataCharts = data;
      this.dataSource.data = this.loadStatistics(data);
      this.cd.detectChanges();
    });
  }

  reset() {
    this.filterForm.get('toDate').setValue('');
    this.filterForm.get('fromDate').setValue('');
    this.onSubmit();
  }

  /** Gets the total cost of all transactions. */
  getTotalCost(dataSource: MatTableDataSource<StatisticsData>, column: string) {
    if (!dataSource.data) {
      return 0;
    }
    return dataSource.data
      .map((t) => t[column])
      .reduce((acc, value) => acc + value, 0);
  }

  /** Gets the total cost of all transactions. */
  getTotalCostOrg() {
    if (!this.dataSource?.data) {
      return 0;
    }
    const totalLog = this.dataSource.data
      .map((t) => t['log'])
      .reduce((acc, value) => acc + value, 0);

    const totalClosed = this.dataSource.data
      .map((t) => t['closed'] + t['deleted'] + t['rejected'])
      .reduce((acc, value) => acc + value, 0);
    return (100 * totalClosed) / totalLog;
  }

  public downloadPDF() {
    const filtersForm = this.proccessDate(this.filterForm);
    iif(
      () => this.activeTable.value == this.formType.CENTER,
      this.service.downloadReport('PDF', filtersForm),
      this.service.downloadReportForMainOrg('PDF', filtersForm)
    ).subscribe();
  }

  public downloadXlsx() {
    const filtersForm = this.proccessDate(this.filterForm);
    iif(
      () => this.activeTable.value == this.formType.CENTER,
      this.service.downloadReport('EXCEL', filtersForm),
      this.service.downloadReportForMainOrg('EXCEL', filtersForm)
    ).subscribe();
  }

  proccessDate(form: FormGroup) {
    return {
      ...form.value,
      fromDate: DateTimeUtil.format(
        form.value?.fromDate,
        DateTimeUtil.DATE_FORMAT
      ),
      toDate: DateTimeUtil.format(form.value?.toDate, DateTimeUtil.DATE_FORMAT),
    };
  }
}
