import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAndRoleProjection} from "../../../../../../api/models";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {Store} from "@ngxs/store";
import {BrowseUsersAction} from "../../../../../_user-mgmt/states/browse-users.action";

@Component({
  selector: 'app-content-impact-analysis',
  templateUrl: './content-impact-analysis.component.html',
  styleUrls: ['./content-impact-analysis.component.scss']
})
export class ContentImpactAnalysisComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: UserAndRoleProjection[];
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
    this.store.dispatch(new BrowseUsersAction.OpenView({ userId: id }));
  }
}
