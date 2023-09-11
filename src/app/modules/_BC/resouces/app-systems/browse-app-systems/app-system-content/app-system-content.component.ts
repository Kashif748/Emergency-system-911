import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesRecords} from "../../../../../../api/models/bc-resources-records";
import {BrowseRecordAction} from "../../../records/states/browse-records.action";
import {LazyLoadEvent} from "primeng/api";
import {BcResourcesAppAndSoftware} from "../../../../../../api/models/bc-resources-app-and-software";

@Component({
  selector: 'app-app-system-content',
  templateUrl: './app-system-content.component.html',
  styleUrls: ['./app-system-content.component.scss']
})
export class AppSystemContentComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcResourcesAppAndSoftware[];
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
