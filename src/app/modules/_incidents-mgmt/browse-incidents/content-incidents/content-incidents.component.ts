import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { IncidentProjection } from 'src/app/api/models';
import { BrowseIncidentsAction } from '../../states/browse-incidents.action';

@Component({
  selector: 'app-content-incidents',
  templateUrl: './content-incidents.component.html',
  styleUrls: ['./content-incidents.component.scss'],
})
export class ContentIncidentsComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: IncidentProjection[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  constructor(private store: Store) {}

  ngOnInit() {
    this.onPageChange.emit({
      first: this.pageRequest.first,
      rows: this.pageRequest.rows,
    });
  }

  openView(id?: number) {
    // this.store.dispatch(new BrowseIncidentsAction.OpenView({ taskId: id }));
  }
}
