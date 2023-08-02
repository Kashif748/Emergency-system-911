import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LazyLoadEvent} from "primeng/api";
 import {Store} from "@ngxs/store";
 import {BrowseImpactMatrixAction} from "../../states/browse-impact-matrix.action";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {BCState} from "@core/states/bc/bc/bc.state";
import {filter, map, tap} from "rxjs/operators";
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { BcImpactMatrixDto, BcImpactLevel } from 'src/app/api/models';

@Component({
  selector: 'app-content-impact-matrix',
  templateUrl: './content-impact-matrix.component.html',
  styleUrls: ['./content-impact-matrix.component.scss']
})
export class ContentImpactMatrixComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcImpactMatrixDto[];
  @Input()
  impactTypePage: BcImpactLevel[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  @Output()
  onImpactTypePageChange = new EventEmitter<LazyLoadEvent>();

  public disableButton: boolean
  public version$: Observable<boolean>;
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
  ) {}

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
    this.store.dispatch(new BrowseImpactMatrixAction.OpenView({ id: Id }));
  }

  openDialog(Id?: number) {
    // this.display = true;
  }

  hasMatchingId(id: any, matrixDtoList: any[]): boolean {
    return matrixDtoList.some((levels) => levels.id === id);
  }
}
