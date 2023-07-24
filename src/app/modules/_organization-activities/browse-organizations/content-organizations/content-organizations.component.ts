import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageRequestModel} from "@core/models/page-request.model";
import {Store} from "@ngxs/store";
import {LazyLoadEvent} from "primeng/api";
import {BcActivities} from "../../../../api/models/bc-activities";
import {BrowseOrganizationAction} from "../../states/browse-organization.action";

@Component({
  selector: 'app-content-organizations',
  templateUrl: './content-organizations.component.html',
  styleUrls: ['./content-organizations.component.scss']
})
export class ContentOrganizationsComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: BcActivities[];
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
    this.store.dispatch(new BrowseOrganizationAction.OpenView({ organizationId: id }));
  }
}
