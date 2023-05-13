import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {BcImpactLevel} from "../../../../../api/models/bc-impact-level";
import {BrowseImpactLevelAction} from "../../states/browse-impact-level.action";

@Component({
  selector: 'app-content-impact-level',
  templateUrl: './content-impact-level.component.html',
  styleUrls: ['./content-impact-level.component.scss']
})
export class ContentImpactLevelComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcImpactLevel[];
/*  @Input()
  columns: string[];*/
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;
  public columns: string[] = ['levelAr', 'levelEn', 'color', 'active'];

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseImpactLevelAction.OpenView({ id: Id }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }

}
