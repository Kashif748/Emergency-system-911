import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { IncidentTaskProjection } from 'src/app/api/models';
import { BrowseTasksAction } from '../../states/browse-tasks.action';

@Component({
  selector: 'app-content-tasks',
  templateUrl: './content-tasks.component.html',
  styleUrls: ['./content-tasks.component.scss'],
})
export class ContentTasksComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: IncidentTaskProjection[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;
  @Input()
  type: 'BY_MY_ORG' | 'TO_MY_ORG';

  assigneeMap = {
    org: { text: 'ORGANIZATION', bg: 'success' },
    user: { text: 'USER', bg: 'info' },
    group: { text: 'GROUP', bg: 'warning' },
  };
  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  constructor(private store: Store) {}

  ngOnInit() {
    this.onPageChange.emit({
      first: this.pageRequest.first,
      rows: this.pageRequest.rows,
    });
  }
}
