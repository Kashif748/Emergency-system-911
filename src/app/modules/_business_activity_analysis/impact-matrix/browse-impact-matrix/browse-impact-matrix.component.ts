import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { ImpactLevelState, ImpactMatrixState, RtoState } from '@core/states';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { BcImpactLevel, BcImpactMatrixDto, Bcrto } from 'src/app/api/models';
import { SYSTEMS } from '../../tempData.conts';
import { BrowseImpactMatrixAction } from '../states/browse-impact-matrix.action';
import {
  BrowseImpactMatrixState,
  BrowseImpactMatrixStateModel,
} from '../states/browse-impact-matrix.state';

@Component({
  selector: 'app-browse-impact-matrix',
  templateUrl: './browse-impact-matrix.component.html',
  styleUrls: ['./browse-impact-matrix.component.scss'],
})
export class BrowseImpactMatrixComponent implements OnInit {
  public page$: Observable<BcImpactMatrixDto[]>;
  public impactTypePage$: Observable<BcImpactLevel[]>;

  @Select(ImpactMatrixState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ImpactMatrixState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseImpactMatrixState.state)
  public state$: Observable<BrowseImpactMatrixStateModel>;
  loading: false;
  page = SYSTEMS;

  public columns$: Observable<Bcrto[]>;

  display: boolean = false;

  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.loadImpactTypePage();
    this.loadRTOPage();

    this.impactTypePage$ = this.store.select(ImpactLevelState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      tap(console.log)
    );
    this.page$ = this.store.select(ImpactMatrixState.page).pipe(
      filter((p) => !!p),
      tap(console.log)
    );

    this.columns$ = this.store.select(RtoState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      tap(console.log)
    );
  }

  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactMatrixAction.LoadImpactMatrix({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  public loadImpactTypePage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactMatrixAction.LoadImpactLevel({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  public loadRTOPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseImpactMatrixAction.LoadRto({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
