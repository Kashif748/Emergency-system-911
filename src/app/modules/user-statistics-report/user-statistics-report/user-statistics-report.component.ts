import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncidentReportService } from '@core/api/services/incident-report.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { IStorageService } from '@core/services/storage.service';
import { TranslationService } from '../../i18n/translation.service';
import { UserStatisticsReportService } from '../user-statistics-report.service';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {INCIDENTS_TABS} from "../../incidents/incidents.model";
import {AdvancedSearchFieldsEnum} from "@shared/components/advanced-search/advancedSearch.model";
import AssetFormatter from "../../incidents/assets-info/assets-form/AssetFormatter";

@Component({
  selector: 'app-user-statistics-report',
  templateUrl: './user-statistics-report.component.html',
  styleUrls: ['./user-statistics-report.component.scss'],
})
export class UserStatisticsReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading = true;
  lang = 'en';
  selectedTab = 0;
  orgName;
  displayedColumns: string[] = [
    'username',
    'organization',
    'created',
    'closed',
    'nonAutomated',
  ];

  dataSourceCenter = new MatTableDataSource<any>([]);

  dataCenters = [];

  filterForm: FormGroup = this.fb.group({
    fromDate: [new Date()],
    toDate: [new Date()],
    orgId: [''],
    userId: [[]],
  });

  tableView: 'incidents' | 'tasks' = 'tasks';
  @ViewChild('orgText') org;
  constructor(
    private langFacade: ILangFacade,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private storageService: IStorageService,
    private reportService: UserStatisticsReportService,
    private cdr: ChangeDetectorRef,
    private userStaticReportService: UserStatisticsReportService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    // set  from date  to  last  month
    let date = new Date();
    date = this.startOfMonth(date);

    this.filterForm.get('fromDate').setValue(new Date(date));

    this.onSubmit();
   /* let orgID;
    this.filterForm.get('orgId').valueChanges.subscribe((orgId) => {
      const name = 'Contractor A';
      this.orgName = name;
         //this.filterForm.get('orgId').value;
      //const selectedOptionText = this.org._elementRef.nativeElement.innerText;
    });*/
  }

  selectedOrg(orgName: string) {
    this.orgName = orgName;
  }

  startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  ngAfterViewInit() {
    this.dataSourceCenter.paginator = this.paginator;
    this.dataSourceCenter.sort = this.sort;
  }
  changeTableType(event: 'incidents' | 'tasks') {
    if (this.tableView === event) return;
    this.tableView = event;
    this.loading = false;
    this.onSubmit();
  }
  onSubmit() {
    this.loading = true;
    const filterForm = this.proccessDate(this.filterForm);
    this.reportService.loadReport(this.tableView, filterForm).subscribe(
      (data: any) => {
        console.log(data);
        this.loading = false;
        this.dataCenters = data?.result;
        this.dataSourceCenter.data = this.dataCenters.map((item) => {
          if (this.tableView === 'incidents') {
            return {
              closed: item.closedIncidents,
              created: item.createdIncidents,
              nonAutomated: item.nonAutomatedIncidentLogs,
              user: item?.user,
            };
          } else {
            return {
              closed: item.closedTasks,
              created: item.createdTasks,
              nonAutomated: item.nonAutomatedTaskWorkLogs,
              user: item?.user,
            };
          }
        });
        this.cdr.detectChanges();
      },
      (err) => (this.loading = false)
    );
  }

  public downloadXlsx() {
    const Form = this.proccessDate(this.filterForm);
    this.userStaticReportService.downloadReport('EXCEL', this.tableView, Form).subscribe();
  }

  public downloadPDF() {
    const Form = this.proccessDate(this.filterForm);
    this.userStaticReportService.downloadReport('PDF', this.tableView, Form).subscribe();
  }


  reset(form: FormGroup) {
    form.get('toDate').setValue('');
    form.get('fromDate').setValue('');
    form.get('userId').setValue([]);
    form.get('orgId').setValue('');
    this.onSubmit();
  }

  proccessDate(form: FormGroup) {
    let filtersForm = { ...form.value };

    if (form.get('fromDate').value != '') {
      filtersForm['fromDate'] = new Date(
        form.get('fromDate').value
      ).toLocaleDateString('en-CA');
    }
    if (form.get('toDate').value != '') {
      filtersForm['toDate'] = new Date(
        form.get('toDate').value
      ).toLocaleDateString('en-CA');
    }
    if (filtersForm['toDate'] == '1970-01-01') filtersForm['toDate'] = '';
    if (filtersForm['fromDate'] == '1970-01-01') filtersForm['fromDate'] = '';

    if (filtersForm['userId']?.length > 0) {
      filtersForm['userId'] = filtersForm['userId']
        .map((user) => user?.id)
        .join(',');
    }
    if (!filtersForm['orgId'] || filtersForm['orgId'] == '') {
      const commonData = this.storageService.getItem('commonData');
      const currentOrgId = commonData?.currentOrgDetails?.id;
      filtersForm['orgId'] = currentOrgId;
    }

    return filtersForm;
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.tableView = 'tasks';
      this.loading = false;
      this.onSubmit();
    } else {
      this.tableView = 'incidents';
      this.loading = false;
      this.onSubmit();
    }
    this.selectedTab = event.index;
  }
}
