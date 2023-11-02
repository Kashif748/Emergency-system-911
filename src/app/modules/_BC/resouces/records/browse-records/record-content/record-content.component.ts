import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Select, Store} from "@ngxs/store";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {BcResourcesRecords} from "../../../../../../api/models/bc-resources-records";
import {BrowseRecordAction} from "../../states/browse-records.action";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BcResources} from "../../../../../../api/models/bc-resources";
import {Observable} from "rxjs";

@Component({
  selector: 'app-record-content',
  templateUrl: './record-content.component.html',
  styleUrls: ['./record-content.component.scss']
})
export class RecordContentComponent implements OnInit {

  @Select(ResourceAnalysisState.resourceAnalysis)
  public resourceAnalysis$: Observable<BcResources>;

  @Input()
  loading: boolean;
  @Input()
  page: BcResourcesRecords[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

  openView(id?: number) {
    this.store.dispatch(new BrowseRecordAction.OpenView({ recordId: id }));
  }

  openDialog(id?: number) {
  }

}
