import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { RoleProjection } from 'src/app/api/models';
import { BrowseRolesAction } from '../../states/browse-roles.action';

@Component({
  selector: 'app-content-roles',
  templateUrl: './content-roles.component.html',
  styleUrls: ['./content-roles.component.scss'],
})
export class ContentRolesComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: RoleProjection[];
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
    this.store.dispatch(new BrowseRolesAction.OpenView({ roleId: id }));
  }
}
