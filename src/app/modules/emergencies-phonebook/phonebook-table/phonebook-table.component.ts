import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { ExternalPhonebook } from 'src/app/api/models';
import { BrowsePhonebookAction } from '../states/browse-phonebook.action';

@Component({
  selector: 'app-phonebook-table',
  templateUrl: './phonebook-table.component.html',
  styleUrls: ['./phonebook-table.component.scss'],
})
export class PhonebookTableComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: ExternalPhonebook[];
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
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

  openView(id?: number) {
    this.store.dispatch(new BrowsePhonebookAction.OpenView({ userId: id }));
  }

  deleteItem(id?: number) {
    this.store.dispatch(new BrowsePhonebookAction.OpenView({ userId: id }));
  }
}
