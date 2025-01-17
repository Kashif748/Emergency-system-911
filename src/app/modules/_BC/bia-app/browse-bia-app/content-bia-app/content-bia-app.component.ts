import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageRequestModel} from "@core/models/page-request.model";
import {BrowseOrganizationAction} from "../../../organization-activities/states/browse-organization.action";
import {BcActivities} from "../../../../../api/models/bc-activities";
import {LazyLoadEvent} from "primeng/api";
import {Store} from "@ngxs/store";
import {BcAnalysisByOrgHierarchyResponse} from "../../../../../api/models/bc-analysis-by-org-hierarchy-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content-bia-app',
  templateUrl: './content-bia-app.component.html',
  styleUrls: ['./content-bia-app.component.scss']
})
export class ContentBiaAppComponent implements OnInit {
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
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
/*    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
    console.log(this.columns);*/
  }
  openView(id?: number) {
    this.store.dispatch(new BrowseOrganizationAction.OpenView({ organizationId: id }));
  }

  goToResourceAndActivity(org: BcAnalysisByOrgHierarchyResponse) {
    this.router.navigate(['bc/impact-analysis'], {
      queryParams: {
        _division: org?.orgHierarchy.id,
        _cycle: org?.cycle.id
      },
    });
  }
}
