import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {Store} from "@ngxs/store";
import {PageUserGroupProjection} from "../../../../api/models/page-user-group-projection";
import {BrowseGroupsAction} from "../../states/browse-groups.action";
import {PageGroupProjection} from "../../../../api/models/page-group-projection";
import {userType} from "../../../groups-management/group.model";
import {TranslationService} from "../../../i18n/translation.service";

@Component({
  selector: 'app-content-groups',
  templateUrl: './content-groups.component.html',
  styleUrls: ['./content-groups.component.scss']
})
export class ContentGroupsComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: PageGroupProjection[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  lang = 'en';
  constructor(private store: Store,
              private translationService: TranslationService,) { }

  ngOnInit(): void {
    // console.log(this.page);
    this.lang = this.translationService.getSelectedLanguage();
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

  openView(groupId?: number) {
     this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

}
