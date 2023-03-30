import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import {
  DataOptions,
  FormFieldName,
} from '@shared/components/advanced-search/advanced-search.component';
import { AdvancedSearchFieldsEnum } from '@shared/components/advanced-search/advancedSearch.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { finalize, subscribeOn } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { InquiryModel } from '../inquiries.model';
import { InquiriesService } from '../inquiries.service';

@Component({
  selector: 'app-inquiries-report',
  templateUrl: './inquiries-report.component.html',
  styleUrls: ['./inquiries-report.component.scss'],
})
export class InquiriesReportComponent implements OnInit {
  public loading = true;
  isLoading$ = new BehaviorSubject<boolean>(false);
  // UI
  form: FormGroup = this.fb.group({
    fromDate: [''],
    toDate: [''],
    subject: [''],
    userId: [''],
  });
  public lang = 'en';
  public inquiries: any[];
  public paginationConfig: any;
  @ViewChild('panel') panel: MatExpansionPanel;

  panelOpenState = false;

  constructor(
    private translationService: TranslationService,
    private inquiryServices: InquiriesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 0,
      totalItems: 0,
      id: 'pagination',
    };
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.getInquiriesList(0);
  }

  getInquiriesList(
    page: number,
    sort?: { active: string; direction: 'asc' | 'desc' }
  ): void {
    this.isLoading$.next(true);
    this.inquiryServices
      .getInquiries(
        this.form.value,
        page,
        this.paginationConfig.itemsPerPage
      )
      .subscribe((data) => {
        this.inquiries = data?.result?.content;
        this.paginationConfig.currentPage = page + 1;

        this.isLoading$.next(false);
        this.paginationConfig.totalItems = data.result.totalElements;
      });
  }

  onSubmit() {
    this.isLoading$.next(true);
    this.paginationConfig.currentPage = 0;
    if (this.form.value.fromDate != '') {
      this.form.value.fromDate = DateTimeUtil.format(
        new Date(this.form.value.fromDate),
        DateTimeUtil.DATE_FORMAT
      );
    }

    if (this.form.value.toDate != '') {
      this.form.value.toDate = DateTimeUtil.format(
        new Date(this.form.value.toDate),
        DateTimeUtil.DATE_FORMAT
      );
    }
    this.inquiryServices.getStatistics(this.form.value);
    this.inquiryServices
      .getInquiries(
        this.form.value,
        this.paginationConfig.currentPage,
        this.paginationConfig.itemsPerPage
      )
      .subscribe((res) => {
        this.isLoading$.next(false);
        this.inquiries = res?.result?.content;
        this.paginationConfig.totalItems = res.result.totalElements;
      });
  }

  downloadPDF() {
    this.inquiryServices.downloadReport('PDF', this.form.value).subscribe();
  }
  downloadXlsx() {
    this.inquiryServices.downloadReport('EXCEL', this.form.value).subscribe();
  }

  onFilterChanged(e) {
    this.pageChanged(1);
    this.panel.close();
  }

  pageChanged(event) {
    this.loading = true;
    this.paginationConfig.currentPage = event;
    this.getInquiriesList(event - 1);
    this.loading = false;
  }

  customSort(event) {
    this.loading = true;
    this.getInquiriesList(0, event);
  }

  clearSearch() {
    this.form.reset({
      fromDate: '',
      toDate: '',
      subject: [''],
      userId: null,
    });
    this.paginationConfig.currentPage = 0;
    this.loading = true;

    this.inquiryServices.getStatistics(this.form.value);
    this.getInquiriesList(0);
    this.loading = false;
    this.cdr.detectChanges();
  }
}
