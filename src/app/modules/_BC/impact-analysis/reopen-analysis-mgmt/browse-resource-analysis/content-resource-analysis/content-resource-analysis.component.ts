import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageRequestModel} from "@core/models/page-request.model";
import {Store} from "@ngxs/store";
import {LazyLoadEvent} from "primeng/api";
import {BcResources} from "../../../../../../api/models/bc-resources";
import {BrowseResourceAnalysisAction} from "../../../states/browse-resource-analysis.action";

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
    }
  openView(resourceId?: number) {
    this.store.dispatch(new BrowseResourceAnalysisAction.OpenView({ id: resourceId }));
  }
}
