import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageRequestModel} from "@core/models/page-request.model";
import {BcActivities} from "../../../../../api/models/bc-activities";
import {LazyLoadEvent} from "primeng/api";
import {Store} from "@ngxs/store";
import {BrowseVenderAction} from "../../states/browse-vender.action";

@Component({
  selector: 'app-vender-content',
  templateUrl: './vender-content.component.html',
  styleUrls: ['./vender-content.component.scss']
})
export class VenderContentComponent implements OnInit {
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

  constructor(private store: Store) { }

  ngOnInit() {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
    console.log(this.columns);
  }
  openView(id?: number) {
    this.store.dispatch(new BrowseVenderAction.OpenView({ venderId: id }));
  }
}
