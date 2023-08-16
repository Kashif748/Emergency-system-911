import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
 import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {Store} from "@ngxs/store";
import {BrowseActivityPrioritySeqAction} from "../../states/browse-activity-priority-seq.action";
import {ActivatedRoute} from "@angular/router";
import {BCState, VERSION_STATUSES} from "@core/states/bc/bc/bc.state";
import {filter, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import { BcRecoveryPriorities } from 'src/app/api/models';

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

  public disableButton$: Observable<boolean>;
  public version$: Observable<boolean>;

  constructor(
    private translate: TranslateService,
    private store: Store,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.disableButton$ = this.store.select(BCState.versions).pipe(
      filter((p) => !!p),
      map((versions) => {
        const currentV = this.route.snapshot.queryParams['_version'];
        return versions.some((item) => {
          if (item.id == currentV) {
            return item.status.id !== VERSION_STATUSES.CREATED;
          }
          return false;
        });
      })
    );
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseActivityPrioritySeqAction.OpenView({ id: Id }));
  }

  openDialog(id?: number) {
    //this.display = true;
  }
}
