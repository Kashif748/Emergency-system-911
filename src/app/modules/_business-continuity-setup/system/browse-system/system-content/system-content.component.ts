import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import { BrowseSystemsAction } from '../../states/browse-systems.action';
import { BcSystems } from 'src/app/api/models';

@Component({
  selector: 'app-system-content',
  templateUrl: './system-content.component.html',
  styleUrls: ['./system-content.component.scss'],
})
export class SystemContentComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: BcSystems[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest.first,
      rows: this.pageRequest.rows,
    });
  }

  openView(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.OpenView({ systemId }));
  }
}
