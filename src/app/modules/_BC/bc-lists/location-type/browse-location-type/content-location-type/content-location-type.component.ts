import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DATA} from "../../../tabs.const";
import {LazyLoadEvent} from "primeng/api";
 import {PageRequestModel} from "@core/models/page-request.model";
import {Store} from "@ngxs/store";
import {ILangFacade} from "@core/facades/lang.facade";
import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {BrowseLocationTypeAction} from "../../states/browse-locationType.action";
import { Bcrto } from 'src/app/api/models';

@Component({
  selector: 'app-content-location-type',
  templateUrl: './content-location-type.component.html',
  styleUrls: ['./content-location-type.component.scss']
})
export class ContentLocationTypeComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: Bcrto[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseLocationTypeAction.OpenView({ id: Id }));
  }
}
