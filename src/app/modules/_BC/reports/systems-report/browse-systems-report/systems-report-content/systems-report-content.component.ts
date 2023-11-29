import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import { BcActivitySystemsSummaryResponse } from 'src/app/api/models/bc-activity-systems-summary-response';

@Component({
  selector: 'app-systems-report-content',
  templateUrl: './systems-report-content.component.html',
  styleUrls: ['./systems-report-content.component.scss']
})
export class SystemsReportContentComponent implements OnInit {

  @Input()
  loading: boolean;
  @Input()
  page: BcActivitySystemsSummaryResponse[];
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
