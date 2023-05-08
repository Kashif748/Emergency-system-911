import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DATA} from "../../../tabs.const";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {BcRecoveryPriorities} from "../../../../../api/models/bc-recovery-priorities";
import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-content-activity-priority',
  templateUrl: './content-activity-priority.component.html',
  styleUrls: ['./content-activity-priority.component.scss']
})
export class ContentActivityPriorityComponent implements OnInit {

  @Input()
  loading: boolean;
  @Input()
  page: BcRecoveryPriorities[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

/*  public loading = false;
  public columns: string[] = ['criticality', 'rto', 'desc'];
  public page = [];*/
  constructor(
    private translate: TranslateService,
    private store: Store) {}

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
    /*this.page = DATA.activityPrioritySeq.map((item) => {
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

  openView(id?: number) {
    this.store.dispatch(new BrowseRtoAction.OpenView({ rtoId: id }));
  }

  openDialog(id?: number) {
    //this.display = true;
  }
}
