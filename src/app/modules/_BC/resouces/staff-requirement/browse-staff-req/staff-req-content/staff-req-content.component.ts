import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {BrowseStaffAction} from "../../states/browse-staff.action";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {BcResourcesStaffReq} from "../../../../../../api/models/bc-resources-staff-req";

@Component({
  selector: 'app-staff-req-content',
  templateUrl: './staff-req-content.component.html',
  styleUrls: ['./staff-req-content.component.scss']
})
export class StaffReqContentComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcResourcesStaffReq[];
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
    this.store.dispatch(new BrowseStaffAction.OpenView({ staffId: id }));
  }

  openDialog(id?: number) {
  }


}
