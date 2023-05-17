import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {ILangFacade} from "@core/facades/lang.facade";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {BcActivityFrequencies} from "../../../../../api/models/bc-activity-frequencies";
import {BrowseActivityFrquencyAction} from "../../states/browse-activity-frquency.action";

@Component({
  selector: 'app-content-activity-frquency',
  templateUrl: './content-activity-frquency.component.html',
  styleUrls: ['./content-activity-frquency.component.scss']
})
export class ContentActivityFrquencyComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcActivityFrequencies[];
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
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    })
    /*this.page = DATA.activityFrquency.map((item) => {
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
    this.store.dispatch(new BrowseActivityFrquencyAction.OpenView({ id: Id }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }
}
