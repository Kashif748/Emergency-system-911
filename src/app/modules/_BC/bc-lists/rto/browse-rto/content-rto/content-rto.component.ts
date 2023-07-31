import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {Store} from "@ngxs/store";
import {BrowseRtoAction} from "../../states/browse-rto.action";
import {BCState} from "@core/states/bc/bc/bc.state";
import {filter, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { BcLocationTypes } from 'src/app/api/models';

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

  public disableButton: boolean
  public version$: Observable<boolean>;

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private route: ActivatedRoute,
    private store: Store) {}

  ngOnInit(): void {
    this.version$ = this.route.queryParams.pipe(
      map((params) => params['_version']),
      tap((v) => {
        this.store
          .select(BCState.versions)
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
    this.store.dispatch(new BrowseRtoAction.OpenView({ rtoId: Id }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }
}
