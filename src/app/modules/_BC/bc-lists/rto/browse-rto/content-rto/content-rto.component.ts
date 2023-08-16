import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import { Store } from '@ngxs/store';
import { BrowseRtoAction } from '../../states/browse-rto.action';
import { BCState, VERSION_STATUSES } from '@core/states/bc/bc/bc.state';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BcLocationTypes } from 'src/app/api/models';

@Component({
  selector: 'app-content-rto',
  templateUrl: './content-rto.component.html',
  styleUrls: ['./content-rto.component.scss'],
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
    this.store.dispatch(new BrowseRtoAction.OpenView({ rtoId: Id }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }
}
