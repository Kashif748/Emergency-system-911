import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { SituationProjection } from 'src/app/api/models';
import { BrowseSituationsAction } from '../../states/browse-situations.action';

@Component({
  selector: 'app-content-situations',
  templateUrl: './content-situations.component.html',
  styleUrls: ['./content-situations.component.scss'],
})
export class ContentSituationsComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: SituationProjection[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest.first,
      rows: this.pageRequest.rows,
    });
  }
  openView(id?: number) {
    this.store.dispatch(new BrowseSituationsAction.OpenView({ situationId: id }));
  }
}
