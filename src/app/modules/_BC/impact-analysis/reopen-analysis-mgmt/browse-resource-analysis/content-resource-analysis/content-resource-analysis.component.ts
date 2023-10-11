import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageRequestModel} from "@core/models/page-request.model";
import {BrowseUsersAction} from "../../../../../_user-mgmt/states/browse-users.action";
import {Store} from "@ngxs/store";
import {LazyLoadEvent} from "primeng/api";
import {BcResources} from "../../../../../../api/models/bc-resources";

@Component({
  selector: 'app-content-resource-analysis',
  templateUrl: './content-resource-analysis.component.html',
  styleUrls: ['./content-resource-analysis.component.scss']
})
export class ContentResourceAnalysisComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: BcResources[];
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
    /*this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });*/
  }
  openView(id?: number) {
    this.store.dispatch(new BrowseUsersAction.OpenView({ userId: id }));
  }
}
