import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DATA} from "../../../tabs.const";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {BcRecoveryPriorities} from "../../../../../api/models/bc-recovery-priorities";
import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {Store} from "@ngxs/store";
import {BrowseActivityPrioritySeqAction} from "../../states/browse-activity-priority-seq.action";
import {ActivatedRoute} from "@angular/router";
import {BusinessContinuityState} from "@core/states/bc/business-continuity/business-continuity.state";
import {filter, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

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

  public disableButton: boolean
  public version$: Observable<boolean>;

  constructor(
    private translate: TranslateService,
    private store: Store,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.version$ = this.route.queryParams.pipe(
      map((params) => params['_version']),
      tap((v) => {
        this.store
          .select(BusinessContinuityState.versions)
          .pipe(filter((p) => !!p))
          .subscribe((res) => {
            const shouldDisable = res.some((item) => {
              if (item.id == v) {
                return item.status.id !== 1;
              }
              return false;
            });

            this.disableButton = shouldDisable;
          });
      })
    );
    this.version$.subscribe();
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseActivityPrioritySeqAction.OpenView({ id: Id }));
  }

  openDialog(id?: number) {
    //this.display = true;
  }
}
