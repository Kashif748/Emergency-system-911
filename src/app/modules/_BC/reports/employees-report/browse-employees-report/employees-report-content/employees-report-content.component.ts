import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import { BcPartnersSummaryResponse } from 'src/app/api/models';

@Component({
  selector: 'app-employees-report-content',
  templateUrl: './employees-report-content.component.html',
  styleUrls: ['./employees-report-content.component.scss'],
})
export class EmployeesReportContentComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcPartnersSummaryResponse[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;

  constructor() {}

  ngOnInit(): void {}
}