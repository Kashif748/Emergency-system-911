import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import { BcActivityAnalysisSummaryResponse } from 'src/app/api/models/bc-activity-analysis-summary-response';

@Component({
  selector: 'app-content-analysiss-summary',
  templateUrl: './content-analysiss-summary.component.html',
  styleUrls: ['./content-analysiss-summary.component.scss'],
})
export class ContentAnalysissSummaryComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcActivityAnalysisSummaryResponse[];
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
