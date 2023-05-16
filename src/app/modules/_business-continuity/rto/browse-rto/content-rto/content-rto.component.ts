import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {Store} from "@ngxs/store";
import {BcLocationTypes} from "../../../../../api/models/bc-location-types";
import {BrowseRtoAction} from "../../states/browse-rto.action";

@Component({
  selector: 'app-content-rto',
  templateUrl: './content-rto.component.html',
  styleUrls: ['./content-rto.component.scss']
})
export class ContentRtoComponent implements OnInit {

  @Input()
  loading: boolean;
  @Input()
  page: BcLocationTypes[];
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
    private store: Store) {}

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
    console.log(this.page);
/*    this.page = DATA.rtoList.map((item) => {
      return {
        ...item,
        actions: [
          {
            label: this.translate.instant('ACTIONS.EDIT'),
            icon: 'pi pi-pencil',
            command: () => {
              // this.openDialog(item.id);
            },
          },
        ],
      };
    });*/
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseRtoAction.OpenView({ rtoId: Id }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }
}
