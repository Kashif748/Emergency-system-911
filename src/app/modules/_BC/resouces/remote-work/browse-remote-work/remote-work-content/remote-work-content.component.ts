import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {BcResourcesRemoteWork} from "../../../../../../api/models/bc-resources-remote-work";
import {BrowseRemoteWorkAction} from "../../states/browse-remote-work.action";

@Component({
  selector: 'app-remote-work-content',
  templateUrl: './remote-work-content.component.html',
  styleUrls: ['./remote-work-content.component.scss']
})
export class RemoteWorkContentComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcResourcesRemoteWork[];
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
    this.store.dispatch(new BrowseRemoteWorkAction.OpenView({ remoteWorkId: id }));
  }

  openDialog(id?: number) {
  }

}
