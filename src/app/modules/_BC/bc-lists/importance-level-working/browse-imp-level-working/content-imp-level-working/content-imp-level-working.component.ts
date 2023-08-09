import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
 import {Store} from "@ngxs/store";
import {ILangFacade} from "@core/facades/lang.facade";
import {BrowseImpLevelWorkingAction} from "../states/browse-imp-level-working.action";
import {BCState, VERSION_STATUSES} from "@core/states/bc/bc/bc.state";
import {filter, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { BcWorkImportanceLevels } from 'src/app/api/models';

@Component({
  selector: 'app-content-imp-level-working',
  templateUrl: './content-imp-level-working.component.html',
  styleUrls: ['./content-imp-level-working.component.scss']
})
export class ContentImpLevelWorkingComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcWorkImportanceLevels[];
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
    private lang: ILangFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

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
    this.store.dispatch(new BrowseImpLevelWorkingAction.OpenView({ id: Id }));
  }
}
