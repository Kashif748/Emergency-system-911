import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslationService} from "../../i18n/translation.service";
import {map, takeUntil} from "rxjs/operators";
import {OrgService} from "../../../core/api/services/org.service";
import {Observable, Subject} from "rxjs";
import {LoginAttemptsService} from "../login-attempts.service";
import {AdvancedSearchFieldsEnum} from "@shared/components/advanced-search/advancedSearch.model";

@Component({
  selector: 'app-login-attempts-list',
  templateUrl: './login-attempts-list.component.html',
  styleUrls: ['./login-attempts-list.component.scss']
})
export class LoginAttemptsListComponent implements OnInit {
  displayedColumns: string[] = [
    "orgName",
    "userName",
    "uiVersion",
    "ipAddress",
    "errorMessage",
  ];
  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: "paging",
  };
  public filteredOrgs = [];
  public orgs: any[] = [];
  public errorMsg;
  pageSize = 10;
  loading: boolean = false;
  dataSource = new MatTableDataSource<any>();
  destroy$: Subject<boolean> = new Subject();
  searchForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  lang = "en";

  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder,
    private orgService: OrgService,
    private loginService: LoginAttemptsService
  ) { }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();
    this.getOrg();
  }

  async getLoginAttemptsList(orgID?, userName?, fromDate?, toDate?, page?, size?) {
    this.loading = true;
    this.loginService.getLoginAttempts(orgID, userName, fromDate, toDate, page, size).subscribe((lAttempts => {
      const report = lAttempts.content.map((data) => {
        return data;
      });
      this.loading = false;
      this.dataSource.data = report;
      this.paginationConfig = {
        itemsPerPage: lAttempts.itemsPerPage,
        currentPage: lAttempts.currentPage + 1,
        totalItems: lAttempts.totalElements,
        id: "paging",
      };
    }));
  }

  async getOrg() {
    try {
      this.orgs = await this.orgService
        .getAll()
        .pipe(map((r) => r.result))
        .toPromise();
    } catch (error) {
      this.errorMsg =
        this.lang == 'en'
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar;
    }
    this.filteredOrgs = this.orgs;
  }

  onChangeTable(e) {
    const {pageSize, pageIndex} = e;
    this.getLoginAttemptsList('', '', '', '', pageIndex, pageSize);
  }

  save(org: any) {
   /* this.searchForm.patchValue({
      orgId: org.id
    });*/
  }

  createForm() {
    this.searchForm = this.fb.group({
      orgId: [""],
      userName: [""],
      fromDate: [""],
      toDate: [""],
    });
    this.getLoginAttemptsList();
  }

  onSubmit() {
    const fromDate = this.searchForm.get('fromDate').value;
    const toDate = this.searchForm.get('toDate').value;
    if (fromDate) {
      this.searchForm
        .get('fromDate')
        .patchValue(
          fromDate ? new Date(fromDate).toLocaleDateString('en-CA') : null
        );
    }
    if (toDate) {
      this.searchForm
        .get('toDate')
        .patchValue(
          toDate ? new Date(toDate).toLocaleDateString('en-CA') : null
        );
    }
    this.getLoginAttemptsList(this.searchForm.get('orgId').value, this.searchForm.get('userName').value,
      this.searchForm.get('fromDate').value, this.searchForm.get('toDate').value);
  }

  resetSearchForm() {
    this.getLoginAttemptsList();
    this.searchForm.reset();
    this.pageSize = 10;
  }
}
